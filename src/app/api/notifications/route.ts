/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

// GET /api/notifications - Get all notifications for the current user
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const isReadFilter = searchParams.get("isRead");
    const limit = searchParams.get("limit");

    let query = supabase
      .from("Notification")
      .select(`
        *,
        booking:Booking (id, shortId, status)
      `)
      .eq("userId", user.id)
      .order("createdAt", { ascending: false });

    // Filter by read status if provided
    if (isReadFilter !== null) {
      query = query.eq("isRead", isReadFilter === "true");
    }

    // Limit results if provided
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: notifications, error: notificationsError } = await query;

    if (notificationsError) {
      throw new Error(`Failed to fetch notifications: ${notificationsError.message}`);
    }

    // Get unread count
    const { count: unreadCount, error: unreadError } = await supabase
      .from("Notification")
      .select("id", { count: "exact", head: true })
      .eq("userId", user.id)
      .eq("isRead", false);

    if (unreadError) {
      console.error("Error fetching unread count:", unreadError);
    }

    // Get total count
    const { count: totalCount, error: totalError } = await supabase
      .from("Notification")
      .select("id", { count: "exact", head: true })
      .eq("userId", user.id);

    if (totalError) {
      console.error("Error fetching total count:", totalError);
    }

    // Return in format expected by frontend
    return NextResponse.json({
      notifications: notifications || [],
      unreadCount: unreadCount || 0,
      totalCount: totalCount || 0
    });
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/notifications - Create a new notification (typically used internally)
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
    const { data: currentUser, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Only admins can manually create notifications via this endpoint
    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can create notifications" },
        { status: 403 }
      );
    }

    const { userId, bookingId, type, title, message, actionUrl } = await req.json();

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: "userId, type, title, and message are required" },
        { status: 400 }
      );
    }

    // Create the notification
    const { data: notification, error: notificationError } = await supabase
      .from("Notification")
      .insert({
        userId,
        bookingId: bookingId || null,
        type,
        title,
        message,
        actionUrl: actionUrl || null,
        isRead: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select(`
        *,
        booking:Booking (id, shortId, status)
      `)
      .single();

    if (notificationError) {
      throw new Error(`Failed to create notification: ${notificationError.message}`);
    }

    return NextResponse.json(notification, { status: 201 });
  } catch (error: any) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification", details: error.message },
      { status: 500 }
    );
  }
}
