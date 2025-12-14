/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/messages/mark-all-read/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

// POST /api/messages/mark-all-read - Mark all messages as read for a specific booking
export async function POST(req: NextRequest) {
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

    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: "bookingId is required" },
        { status: 400 }
      );
    }

    // Mark all messages as read for this booking where user is the receiver
    const { data: updatedMessages, error: updateError } = await supabase
      .from("Message")
      .update({
        isRead: true,
        updatedAt: new Date().toISOString(),
      })
      .eq("bookingId", bookingId)
      .eq("receiverId", user.id)
      .eq("isRead", false)
      .select();

    if (updateError) {
      throw new Error(`Failed to mark messages as read: ${updateError.message}`);
    }

    return NextResponse.json({
      message: "All messages marked as read",
      count: updatedMessages?.length || 0,
    });
  } catch (error: any) {
    console.error("Error marking messages as read:", error);
    return NextResponse.json(
      { error: "Failed to mark messages as read", details: error.message },
      { status: 500 }
    );
  }
}
