/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable @typescript-eslint/no-explicit-any 
// app/api/bookings/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Initialize Supabase client (adjust env var names if needed)
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = params.id;

    // Fetch booking with related addOns, client, photographer
    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select(`
        *,
        addOns: AddOn(*),
        client: User!clientId(id, firstname, lastname, email),
        photographer: User!photographerId(id, firstname, lastname, email)
      `)
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Permission checks
    if (
      user.role === "CLIENT" &&
      booking.clientId !== user.id
    ) {
      return NextResponse.json(
        { error: "You don't have permission to view this booking" },
        { status: 403 }
      );
    }

    if (
      user.role === "PHOTOGRAPHER" &&
      booking.photographerId !== user.id
    ) {
      return NextResponse.json(
        { error: "You don't have permission to view this booking" },
        { status: 403 }
      );
    }

    return NextResponse.json(booking);
  } catch (error: unknown) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = params.id;
    const body = await req.json();

    // Get existing booking
    const { data: existingBooking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Permission validation
    if (user.role === "CLIENT") {
      if (existingBooking.clientId !== user.id) {
        return NextResponse.json(
          { error: "You don't have permission to update this booking" },
          { status: 403 }
        );
      }
      if (existingBooking.status !== "BOOKING_CREATED") {
        return NextResponse.json(
          { error: "Cannot modify booking after photographer assignment" },
          { status: 403 }
        );
      }
    } else if (user.role === "PHOTOGRAPHER") {
      if (existingBooking.photographerId !== user.id) {
        return NextResponse.json(
          { error: "You don't have permission to update this booking" },
          { status: 403 }
        );
      }
      const allowedFields = ["status"];
      const requestedFields = Object.keys(body);
      if (!requestedFields.every(field => allowedFields.includes(field))) {
        return NextResponse.json(
          { error: "Photographers can only update the booking status" },
          { status: 403 }
        );
      }
    }

    // Validate status transitions
    if (body.status) {
      const validTransitions: Record<string, string[]> = {
        "BOOKING_CREATED": ["PHOTOGRAPHER_ASSIGNED"],
        "PHOTOGRAPHER_ASSIGNED": ["SHOOTING"],
        "SHOOTING": ["EDITING"],
        "EDITING": ["COMPLETED"],
      };
      if (!validTransitions[existingBooking.status]?.includes(body.status)) {
        return NextResponse.json(
          {
            error: `Invalid status transition from ${existingBooking.status} to ${body.status}`,
            validTransitions: validTransitions[existingBooking.status],
          },
          { status: 400 }
        );
      }
    }

    // Update booking (Supabase update requires `.update()` then `.eq()` then `.select()`)
    const { data: updatedBooking, error: updateError } = await supabase
      .from("Booking")
      .update(body)
      .eq("id", bookingId)
      .select(`
        *,
        addOns: AddOn(*),
        client: User!clientId(id, firstname, lastname, email),
        photographer: User!photographerId(id, firstname, lastname, email)
      `)
      .single();

    if (updateError || !updatedBooking) {
      return NextResponse.json(
        { error: "Failed to update booking", details: updateError?.message },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedBooking);
  } catch (error: unknown) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = params.id;

    // Get existing booking
    const { data: existingBooking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check delete permissions
    if (
      (user.role === "CLIENT" &&
        existingBooking.clientId === user.id &&
        existingBooking.status === "BOOKING_CREATED") ||
      user.role === "ADMIN"
    ) {
      // Delete booking and related add-ons (should cascade if FK ON DELETE CASCADE)
      const { error: deleteError } = await supabase
        .from("Booking")
        .delete()
        .eq("id", bookingId);

      if (deleteError) {
        return NextResponse.json(
          { error: "Failed to delete booking", details: deleteError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ message: "Booking deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "You don't have permission to delete this booking" },
        { status: 403 }
      );
    }
  } catch (error: unknown) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}






/*
// eslint-disable @typescript-eslint/no-explicit-any 
// app/api/bookings/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = params.id;

    // Get the booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        addOns: true,
        client: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        photographer: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check permissions based on role
    if (
      user.role === "CLIENT" &&
      booking.clientId !== user.id
    ) {
      return NextResponse.json(
        { error: "You don't have permission to view this booking" },
        { status: 403 }
      );
    }

    if (
      user.role === "PHOTOGRAPHER" &&
      booking.photographerId !== user.id
    ) {
      return NextResponse.json(
        { error: "You don't have permission to view this booking" },
        { status: 403 }
      );
    }

    return NextResponse.json(booking);
  } catch (error: any) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = params.id;
    const body = await req.json();

    // Get the existing booking
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Validate permissions based on role and update scope
    if (user.role === "CLIENT") {
      // Clients can only modify their own bookings
      if (existingBooking.clientId !== user.id) {
        return NextResponse.json(
          { error: "You don't have permission to update this booking" },
          { status: 403 }
        );
      }

      // Clients can only modify bookings that are not yet assigned
      if (existingBooking.status !== "BOOKING_CREATED") {
        return NextResponse.json(
          { error: "Cannot modify booking after photographer assignment" },
          { status: 403 }
        );
      }
    } else if (user.role === "PHOTOGRAPHER") {
      // Photographers can only update status for bookings assigned to them
      if (existingBooking.photographerId !== user.id) {
        return NextResponse.json(
          { error: "You don't have permission to update this booking" },
          { status: 403 }
        );
      }

      // Photographers can only update the status
      const allowedFields = ["status"];
      const requestedFields = Object.keys(body);

      if (!requestedFields.every(field => allowedFields.includes(field))) {
        return NextResponse.json(
          { error: "Photographers can only update the booking status" },
          { status: 403 }
        );
      }
    }

    // Track if status is being updated to create history entry
    const isStatusBeingUpdated = body.status && body.status !== existingBooking.status;
    let statusNotes = "";

    // Handle status updates
    if (isStatusBeingUpdated) {
      // Validate status transitions
      const validTransitions: Record<string, string[]> = {
        "BOOKING_CREATED": ["PHOTOGRAPHER_ASSIGNED"],
        "PHOTOGRAPHER_ASSIGNED": ["SHOOTING"],
        "SHOOTING": ["EDITING"],
        "EDITING": ["COMPLETED"],
      };

      if (
        !validTransitions[existingBooking.status]?.includes(body.status)
      ) {
        return NextResponse.json(
          { 
            error: `Invalid status transition from ${existingBooking.status} to ${body.status}`,
            validTransitions: validTransitions[existingBooking.status]
          },
          { status: 400 }
        );
      }
      
      // Create appropriate notes based on the status change
      switch(body.status) {
        case "SHOOTING":
          statusNotes = "Photographer has started the photoshoot";
          break;
        case "EDITING":
          statusNotes = "Photoshoot completed, now in editing phase";
          break;
        case "COMPLETED":
          statusNotes = "Editing completed, booking finalized";
          break;
        default:
          statusNotes = `Status changed from ${existingBooking.status} to ${body.status}`;
      }
    }

    // Use transaction if status is being updated to ensure both operations complete
    if (isStatusBeingUpdated) {
      const [updatedBooking, _] = await prisma.$transaction([
        // 1. Update the booking
        prisma.booking.update({
          where: { id: bookingId },
          data: body,
          include: {
            addOns: true,
            client: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
              },
            },
            photographer: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
              },
            },
          },
        }),
        
        // 2. Create booking status history entry
        prisma.bookingStatusHistory.create({
          data: {
            bookingId,
            userId: user.id, // Current user (admin or photographer) who made the change
            status: body.status,
            notes: statusNotes
          }
        })
      ]);
      
      return NextResponse.json(updatedBooking);
    } else {
      // If no status change, just update the booking without creating history
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: body,
        include: {
          addOns: true,
          client: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
            },
          },
          photographer: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
            },
          },
        },
      });
      
      return NextResponse.json(updatedBooking);
    }
  } catch (error: any) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = params.id;

    // Get the existing booking
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Only clients can delete their own bookings before assignment
    // or admins can delete any booking
    if (
      (user.role === "CLIENT" && existingBooking.clientId === user.id && existingBooking.status === "BOOKING_CREATED") ||
      user.role === "ADMIN"
    ) {
      // Delete booking and related add-ons
      await prisma.booking.delete({
        where: { id: bookingId },
      });

      return NextResponse.json({ message: "Booking deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "You don't have permission to delete this booking" },
        { status: 403 }
      );
    }
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking", details: error.message },
      { status: 500 }
    );
  }
}
*/