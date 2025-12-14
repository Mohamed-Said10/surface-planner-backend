/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/notifications/mark-all-read/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

// POST /api/notifications/mark-all-read - Mark all notifications as read for current user
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

    // Mark all unread notifications as read for this user
    const { data: updatedNotifications, error: updateError } = await supabase
      .from("Notification")
      .update({
        isRead: true,
        updatedAt: new Date().toISOString(),
      })
      .eq("userId", user.id)
      .eq("isRead", false)
      .select();

    if (updateError) {
      throw new Error(`Failed to mark notifications as read: ${updateError.message}`);
    }

    return NextResponse.json({
      message: "All notifications marked as read",
      count: updatedNotifications?.length || 0,
    });
  } catch (error: any) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json(
      { error: "Failed to mark notifications as read", details: error.message },
      { status: 500 }
    );
  }
}
