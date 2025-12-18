/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/notifications/[id]/read/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";
import { getCorsHeaders, handleCorsOptions } from "@/lib/cors";

// OPTIONS handler for CORS preflight
export async function OPTIONS(req: NextRequest) {
  return handleCorsOptions(req);
}

// PATCH /api/notifications/[id]/read - Mark notification as read
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const corsHeaders = getCorsHeaders(req);
  
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

    const userEmail = session.user.email;
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const notificationId = (await params).id;

    // Get the notification
    const { data: notification, error: notificationError } = await supabase
      .from("Notification")
      .select("*")
      .eq("id", notificationId)
      .single();

    if (notificationError || !notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Only the notification owner can update it
    if (notification.userId !== user.id) {
      return NextResponse.json(
        { error: "You can only update your own notifications" },
        { status: 403, headers: corsHeaders }
      );
    }

    // Update the notification to mark as read
    const now = new Date().toISOString();
    const updateData: any = {
      isRead: true,
      updatedAt: now,
    };

    // Add readAt timestamp if not already set
    if (!notification.readAt) {
      updateData.readAt = now;
    }

    const { data: updatedNotification, error: updateError } = await supabase
      .from("Notification")
      .update(updateData)
      .eq("id", notificationId)
      .select(`
        *,
        booking:Booking!Notification_bookingId_fkey (id, shortId, status)
      `)
      .single();

    if (updateError) {
      throw new Error(`Failed to mark notification as read: ${updateError.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Notification marked as read",
      notification: updatedNotification,
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error marking notification as read:", error);
    const corsHeaders = getCorsHeaders(req);
    return NextResponse.json(
      { error: "Failed to mark notification as read", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
