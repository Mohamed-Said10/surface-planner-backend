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

    // Only admins or clients can assign photographers
    if (user.role !== "ADMIN" && user.role !== "CLIENT") {
      return NextResponse.json(
        { error: "Only admins or clients can assign photographers" },
        { status: 403 }
      );
    }

    const bookingId = (await params).id;
    const body = await req.json();
    const { photographerId } = body;

    if (!photographerId) {
      return NextResponse.json(
        { error: "Photographer ID is required" },
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

    // Verify photographer exists
    const { data: photographer, error: photographerError } = await supabase
      .from("User")
      .select("*")
      .eq("id", photographerId)
      .eq("role", "PHOTOGRAPHER")
      .single();

    if (photographerError || !photographer) {
      return NextResponse.json(
        { error: "Photographer not found" },
        { status: 404 }
      );
    }

    // If user is a client, verify they own this booking
    if (user.role === "CLIENT" && existingBooking.clientId !== user.id) {
      return NextResponse.json(
        { error: "You can only assign photographers to your own bookings" },
        { status: 403 }
      );
    }

    // Update booking with photographer assignment
    const { data: updatedBooking, error: updateError } = await supabase
      .from("Booking")
      .update({
        photographerId: photographerId,
        status: "PHOTOGRAPHER_ASSIGNED",
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
        status: "PHOTOGRAPHER_ASSIGNED",
        notes: `Photographer ${photographer.firstname} ${photographer.lastname} assigned to booking`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

    if (historyError) {
      console.error("Failed to create history entry:", historyError);
      // Don't throw error here, booking is already updated
    }

    return NextResponse.json({
      ...updatedBooking,
      message: "Photographer assigned successfully",
      photographer: {
        id: photographer.id,
        firstname: photographer.firstname,
        lastname: photographer.lastname,
        email: photographer.email
      }
    });
  } catch (error: any) {
    console.error("Error assigning photographer:", error);
    return NextResponse.json(
      { error: "Failed to assign photographer", details: error.message },
      { status: 500 }
    );
  }
}
