// src/app/api/bookings/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Helper function to get CORS headers based on request origin
function getCorsHeaders(request?: NextRequest) {
  const origin = request?.headers.get('origin') || '';
  const allowedOrigins = [
    'https://sp-dashboard-nine.vercel.app',
    'http://localhost:3001'
  ];

  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-csrf-token",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400"
  };
}

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // or anon key if only public access is needed

const supabase = createClient(supabaseUrl, supabaseKey);

export async function OPTIONS(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

    const { data: userData, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404, headers: corsHeaders });
    }

    const user = userData;
    const bookingId = params.id;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400, headers: corsHeaders });
    }

    const { data: existingBooking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404, headers: corsHeaders });
    }

    const isPhotographerAcceptingBooking =
      user.role === "PHOTOGRAPHER" &&
      existingBooking.status === "BOOKING_CREATED" &&
      status === "PHOTOGRAPHER_ASSIGNED" &&
      !existingBooking.photographerId;

    const canPhotographerChangeStatus =
      user.role === "PHOTOGRAPHER" &&
      (existingBooking.photographerId === user.id || isPhotographerAcceptingBooking);

    if (user.role === "CLIENT") {
      return NextResponse.json(
        { error: "Clients cannot update booking status" },
        { status: 403, headers: corsHeaders }
      );
    } else if (user.role === "PHOTOGRAPHER" && !canPhotographerChangeStatus) {
      return NextResponse.json(
        { error: "Photographers can only update their own bookings" },
        { status: 403, headers: corsHeaders }
      );
    }

    const validTransitions: Record<string, string[]> = {
      BOOKING_CREATED: ["PHOTOGRAPHER_ASSIGNED"],
      PHOTOGRAPHER_ASSIGNED: ["PHOTOGRAPHER_ACCEPTED", "SHOOTING"],
      PHOTOGRAPHER_ACCEPTED: ["SHOOTING"],
      SHOOTING: ["EDITING"],
      EDITING: ["COMPLETED"],
    };

    if (!validTransitions[existingBooking.status]?.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status transition from ${existingBooking.status} to ${status}`,
          validTransitions: validTransitions[existingBooking.status],
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const { error: historyError } = await supabase
      .from("BookingStatusHistory")
      .insert([
        {
          bookingId,
          userId: user.id,
          status,
        },
      ]);

    if (historyError) {
      throw new Error(`Failed to insert status history: ${historyError.message}`);
    }

    const updateData: { status: string; photographerId?: string } = { status };
    if (isPhotographerAcceptingBooking) {
      updateData.photographerId = user.id;
    }

    const { data: updatedBooking, error: updateError } = await supabase
      .from("Booking")
      .update(updateData)
      .eq("id", bookingId)
      .select(`
        *,
        AddOn (*),
        Package (*),
        client:User!Booking_clientId_fkey (id, firstname, lastname, email),
        photographer:User!Booking_photographerId_fkey (id, firstname, lastname, email)
      `)
      .single();

    if (updateError) {
      throw new Error(`Failed to update booking: ${updateError.message}`);
    }

    return NextResponse.json({
      ...updatedBooking,
      message: isPhotographerAcceptingBooking
        ? "Booking accepted and assigned to you successfully"
        : "Booking status updated successfully",
    }, { headers: corsHeaders });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to update booking status", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404, headers: corsHeaders });
    }

    const bookingId = params.id;

    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404, headers: corsHeaders });
    }

    if (
      (user.role === "CLIENT" && booking.clientId !== user.id) ||
      (user.role === "PHOTOGRAPHER" && booking.photographerId !== user.id)
    ) {
      return NextResponse.json(
        { error: "You don't have permission to view this booking's status history" },
        { status: 403, headers: corsHeaders }
      );
    }

    const { data: statusHistory, error: historyError } = await supabase
      .from("BookingStatusHistory")
      .select(
        `*,
         User!BookingStatusHistory_userId_fkey (
           id,
           firstname,
           lastname,
           email,
           role
         )`
      )
      .eq("bookingId", bookingId)
      .order("createdAt", { ascending: false });

    if (historyError) {
      throw new Error(`Failed to fetch status history: ${historyError.message}`);
    }

    return NextResponse.json(statusHistory, { headers: corsHeaders });
  } catch (error: unknown) {
    console.error("Error retrieving booking status history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve status history", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: corsHeaders }
    );
  }
}










/*
// eslint-disable @typescript-eslint/no-explicit-any 
// app/api/bookings/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    // Get the existing booking
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Special case: Photographer accepting a booking (BOOKING_CREATED to PHOTOGRAPHER_ASSIGNED)
    const isPhotographerAcceptingBooking = 
      user.role === "PHOTOGRAPHER" && 
      existingBooking.status === "BOOKING_CREATED" && 
      status === "PHOTOGRAPHER_ASSIGNED" &&
      !existingBooking.photographerId;

    // Determine if photographer is allowed to change status
    const canPhotographerChangeStatus = 
      user.role === "PHOTOGRAPHER" &&
      (existingBooking.photographerId === user.id || isPhotographerAcceptingBooking);

    // Verify permissions - clients are restricted, photographers can only update their own bookings
    if (user.role === "CLIENT") {
      return NextResponse.json(
        { error: "Clients cannot update booking status" },
        { status: 403 }
      );
    } else if (user.role === "PHOTOGRAPHER" && !canPhotographerChangeStatus) {
      return NextResponse.json(
        { error: "Photographers can only update their own bookings" },
        { status: 403 }
      );
    }
    
    // Both photographers and admins can proceed past this point if they have the right permissions

    // Validate status transitions
    const validTransitions: Record<string, string[]> = {
      "BOOKING_CREATED": ["PHOTOGRAPHER_ASSIGNED"],
      "PHOTOGRAPHER_ASSIGNED": ["SHOOTING"],
      "SHOOTING": ["EDITING"],
      "EDITING": ["COMPLETED"],
    };

    if (
      !validTransitions[existingBooking.status]?.includes(status)
    ) {
      return NextResponse.json(
        { 
          error: `Invalid status transition from ${existingBooking.status} to ${status}`,
          validTransitions: validTransitions[existingBooking.status]
        },
        { status: 400 }
      );
    }

    // Use transaction to ensure atomic updates
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create a status history record
      const statusHistory = await tx.bookingStatusHistory.create({
        data: {
          bookingId,
          userId: user.id,
          status: status,
        }
      });

      // 2. Update booking status
      const updateData: any = { status };
      
      // If a photographer is accepting the booking, assign them to it
      if (isPhotographerAcceptingBooking) {
        updateData.photographerId = user.id;
      }

      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: updateData,
        include: {
          addOns: true,
          statusHistories: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
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

      return { updatedBooking, statusHistory };
    });

    return NextResponse.json({
      ...result.updatedBooking,
      message: isPhotographerAcceptingBooking 
        ? "Booking accepted and assigned to you successfully"
        : "Booking status updated successfully"
    });
  } catch (error: any) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { error: "Failed to update booking status", details: error.message },
      { status: 500 }
    );
  }
}

// GET method to retrieve status history for a booking
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

    // Verify the booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check permissions - only allow access to relevant users
    if (
      user.role === "CLIENT" && booking.clientId !== user.id ||
      user.role === "PHOTOGRAPHER" && booking.photographerId !== user.id
    ) {
      return NextResponse.json(
        { error: "You don't have permission to view this booking's status history" },
        { status: 403 }
      );
    }

    // Get status history
    const statusHistory = await prisma.bookingStatusHistory.findMany({
      where: { bookingId },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(statusHistory);
  } catch (error: any) {
    console.error("Error retrieving booking status history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve status history", details: error.message },
      { status: 500 }
    );
  }
}
*/