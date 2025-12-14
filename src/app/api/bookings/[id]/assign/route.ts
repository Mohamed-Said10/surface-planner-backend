/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/bookings/[id]/assign/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

export async function POST(
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
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Only admins can assign photographers
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only administrators can assign photographers" },
        { status: 403 }
      );
    }

    const bookingId = (await params).id;
    const { photographerId } = await req.json();

    if (!photographerId) {
      return NextResponse.json(
        { error: "Photographer ID is required" },
        { status: 400 }
      );
    }

    // Verify photographer exists and has the right role
    const { data: photographer, error: photoError } = await supabase
      .from("User")
      .select("*")
      .eq("id", photographerId)
      .single();

    if (photoError || !photographer) {
      return NextResponse.json(
        { error: "Photographer not found" },
        { status: 404 }
      );
    }

    if (photographer.role !== "PHOTOGRAPHER") {
      return NextResponse.json(
        { error: "Selected user is not a photographer" },
        { status: 400 }
      );
    }

    // Get the existing booking
    const { data: existingBooking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Ensure booking is in created status
    console.log("Booking status:", existingBooking.status, "Type:", typeof existingBooking.status);
    if (existingBooking.status?.toUpperCase() !== "BOOKING_CREATED") {
      return NextResponse.json(
        { error: `Can only assign photographers to bookings in BOOKING_CREATED status. Current status: ${existingBooking.status}` },
        { status: 400 }
      );
    }

    // 1. Update booking with photographer assignment
    const { data: updatedBooking, error: updateError } = await supabase
      .from("Booking")
      .update({
        photographerId,
        status: "PHOTOGRAPHER_ASSIGNED",
        updatedAt: new Date().toISOString(),
      })
      .eq("id", bookingId)
      .select();

    if (updateError) {
      throw new Error(`Failed to update booking: ${updateError.message}`);
    }

    // 2. Create a booking status history entry
    const { error: historyError } = await supabase
      .from("BookingStatusHistory")
      .insert({
        bookingId,
        userId: user.id,
        status: "PHOTOGRAPHER_ASSIGNED",
        notes: `Photographer ${photographer.firstname} ${photographer.lastname} assigned by admin`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

    if (historyError) {
      throw new Error(`Failed to create history entry: ${historyError.message}`);
    }

    return NextResponse.json(updatedBooking[0] || updatedBooking);
  } catch (error: any) {
    console.error("Error assigning photographer:", error);
    return NextResponse.json(
      { error: "Failed to assign photographer", details: error.message },
      { status: 500 }
    );
  }
}




/*
// eslint-disable @typescript-eslint/no-explicit-any 
// app/api/bookings/[id]/assign/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
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

    // Only admins can assign photographers
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only administrators can assign photographers" },
        { status: 403 }
      );
    }

    const bookingId = params.id;
    const { photographerId } = await req.json();

    if (!photographerId) {
      return NextResponse.json(
        { error: "Photographer ID is required" },
        { status: 400 }
      );
    }

    // Verify photographer exists and has the right role
    const photographer = await prisma.user.findUnique({
      where: { id: photographerId },
    });

    if (!photographer) {
      return NextResponse.json(
        { error: "Photographer not found" },
        { status: 404 }
      );
    }

    if (photographer.role !== "PHOTOGRAPHER") {
      return NextResponse.json(
        { error: "Selected user is not a photographer" },
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

    // Ensure booking is in created status
    if (existingBooking.status !== "BOOKING_CREATED") {
      return NextResponse.json(
        { error: "Can only assign photographers to bookings in BOOKING_CREATED status" },
        { status: 400 }
      );
    }

    // Use a transaction to ensure both operations complete together
    const [updatedBooking, _] = await prisma.$transaction([
      // 1. Update booking with photographer assignment
      prisma.booking.update({
        where: { id: bookingId },
        data: {
          photographerId,
          status: "PHOTOGRAPHER_ASSIGNED",
        },
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
      
      // 2. Create a booking status history entry
      prisma.bookingStatusHistory.create({
        data: {
          bookingId,
          userId: user.id, // Admin who made the change
          status: "PHOTOGRAPHER_ASSIGNED",
          notes: `Photographer ${photographer.firstname} ${photographer.lastname} assigned by admin`
        }
      })
    ]);

    return NextResponse.json(updatedBooking);
  } catch (error: any) {
    console.error("Error assigning photographer:", error);
    return NextResponse.json(
      { error: "Failed to assign photographer", details: error.message },
      { status: 500 }
    );
  }
}
  */