/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/bookings/[id]/accept/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";
import { notifyPhotographerAccepted } from "@/lib/notificationHelper";

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

    // Only photographers can accept bookings
    if (user.role !== "PHOTOGRAPHER") {
      return NextResponse.json(
        { error: "Only photographers can accept bookings" },
        { status: 403 }
      );
    }

    const bookingId = (await params).id;

    // Get the existing booking
    const { data: existingBooking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Verify the booking is assigned to this photographer
    if (existingBooking.photographerId !== user.id) {
      return NextResponse.json(
        { error: "This booking is not assigned to you" },
        { status: 403 }
      );
    }

    // Verify the booking is in the correct status
    if (existingBooking.status !== "PHOTOGRAPHER_ASSIGNED") {
      return NextResponse.json(
        {
          error: `Cannot accept booking in ${existingBooking.status} status. Booking must be in PHOTOGRAPHER_ASSIGNED status.`,
          currentStatus: existingBooking.status
        },
        { status: 400 }
      );
    }

    // Update booking status to PHOTOGRAPHER_ACCEPTED
    const { data: updatedBooking, error: updateError } = await supabase
      .from("Booking")
      .update({
        status: "PHOTOGRAPHER_ACCEPTED",
        updatedAt: new Date().toISOString(),
      })
      .eq("id", bookingId)
      .select()
      .single();

    if (updateError) {
      console.error("Booking update error details:", updateError);
      throw new Error(`Failed to update booking: ${updateError.message}`);
    }

    // Create a booking status history entry
    const { error: historyError } = await supabase
      .from("BookingStatusHistory")
      .insert({
        bookingId,
        userId: user.id,
        status: "PHOTOGRAPHER_ACCEPTED",
        notes: `Booking accepted by photographer ${user.firstname} ${user.lastname}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

    if (historyError) {
      console.error("Failed to create history entry:", historyError);
      // Don't throw error here, booking is already updated
    }

    // Send notification to client
    if (existingBooking.clientId) {
      await notifyPhotographerAccepted(
        existingBooking.clientId,
        bookingId,
        existingBooking.shortId || bookingId,
        `${user.firstname} ${user.lastname}`
      );
    }

    return NextResponse.json({
      ...updatedBooking,
      message: "Booking accepted successfully"
    });
  } catch (error: any) {
    console.error("Error accepting booking:", error);
    return NextResponse.json(
      { error: "Failed to accept booking", details: error.message },
      { status: 500 }
    );
  }
}
