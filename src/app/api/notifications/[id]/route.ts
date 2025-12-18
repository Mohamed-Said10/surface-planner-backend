/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/notifications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";
import { getCorsHeaders, handleCorsOptions } from "@/lib/cors";

// OPTIONS handler for CORS preflight
export async function OPTIONS(req: NextRequest) {
  return handleCorsOptions(req);
}

// PATCH /api/notifications/[id] - Mark notification as read/unread
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
    
    // Try to get isRead from body, default to true if not provided
    let isRead = true;
    try {
      const body = await req.json();
      if (body.isRead !== undefined && typeof body.isRead === "boolean") {
        isRead = body.isRead;
      }
    } catch (e) {
      // No body provided, use default isRead = true
    }

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

    // Update the notification
    const updateData: any = {
      isRead,
      updatedAt: new Date().toISOString(),
    };
    
    // Add readAt timestamp when marking as read
    if (isRead && !notification.readAt) {
      updateData.readAt = new Date().toISOString();
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
      throw new Error(`Failed to update notification: ${updateError.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Notification marked as read",
      notification: updatedNotification
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error updating notification:", error);
    const corsHeaders = getCorsHeaders(req);
    return NextResponse.json(
      { error: "Failed to update notification", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE /api/notifications/[id] - Delete a notification
export async function DELETE(
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
        { status: 404 }
      );
    }

    // Only the notification owner can delete it
    if (notification.userId !== user.id) {
      return NextResponse.json(
        { error: "You can only delete your own notifications" },
        { status: 403 }
      );
    }

    // Delete the notification
    const { error: deleteError } = await supabase
      .from("Notification")
      .delete()
      .eq("id", notificationId);

    if (deleteError) {
      throw new Error(`Failed to delete notification: ${deleteError.message}`);
    }

    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { error: "Failed to delete notification", details: error.message },
      { status: 500 }
    );
  }
}
