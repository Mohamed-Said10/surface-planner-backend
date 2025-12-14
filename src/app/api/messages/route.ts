/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

// GET /api/messages - Get all messages for a booking or conversation
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
    const bookingId = searchParams.get("bookingId");
    const conversationWith = searchParams.get("conversationWith"); // User ID

    let query = supabase
      .from("Message")
      .select(`
        *,
        sender:User!Message_senderId_fkey (id, firstname, lastname, email, role),
        receiver:User!Message_receiverId_fkey (id, firstname, lastname, email, role),
        booking:Booking (id, shortId, status)
      `)
      .order("createdAt", { ascending: true });

    if (bookingId) {
      // Get messages for a specific booking
      query = query.eq("bookingId", bookingId);
    } else if (conversationWith) {
      // Get conversation between current user and another user
      query = query.or(
        `and(senderId.eq.${user.id},receiverId.eq.${conversationWith}),and(senderId.eq.${conversationWith},receiverId.eq.${user.id})`
      );
    } else {
      // Get all messages where user is sender or receiver
      query = query.or(`senderId.eq.${user.id},receiverId.eq.${user.id}`);
    }

    const { data: messages, error: messagesError } = await query;

    if (messagesError) {
      throw new Error(`Failed to fetch messages: ${messagesError.message}`);
    }

    return NextResponse.json(messages || []);
  } catch (error: any) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/messages - Send a new message
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

    const { bookingId, receiverId, content } = await req.json();

    // Validate required fields
    if (!bookingId || !receiverId || !content) {
      return NextResponse.json(
        { error: "bookingId, receiverId, and content are required" },
        { status: 400 }
      );
    }

    // Verify the booking exists
    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Verify user has access to this booking
    const isClient = booking.clientId === user.id;
    const isPhotographer = booking.photographerId === user.id;
    const isAdmin = user.role === "ADMIN";

    if (!isClient && !isPhotographer && !isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to send messages for this booking" },
        { status: 403 }
      );
    }

    // Verify receiver is part of this booking
    const { data: receiver, error: receiverError } = await supabase
      .from("User")
      .select("*")
      .eq("id", receiverId)
      .single();

    if (receiverError || !receiver) {
      return NextResponse.json({ error: "Receiver not found" }, { status: 404 });
    }

    const receiverIsClient = booking.clientId === receiverId;
    const receiverIsPhotographer = booking.photographerId === receiverId;
    const receiverIsAdmin = receiver.role === "ADMIN";

    if (!receiverIsClient && !receiverIsPhotographer && !receiverIsAdmin) {
      return NextResponse.json(
        { error: "Receiver is not associated with this booking" },
        { status: 400 }
      );
    }

    // Create the message
    const { data: newMessage, error: messageError } = await supabase
      .from("Message")
      .insert({
        bookingId,
        senderId: user.id,
        receiverId,
        content,
        isRead: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select(`
        *,
        sender:User!Message_senderId_fkey (id, firstname, lastname, email, role),
        receiver:User!Message_receiverId_fkey (id, firstname, lastname, email, role),
        booking:Booking (id, shortId, status)
      `)
      .single();

    if (messageError) {
      throw new Error(`Failed to create message: ${messageError.message}`);
    }

    // Create a notification for the receiver
    const notificationTitle = `New message from ${user.firstname} ${user.lastname}`;
    const notificationMessage = content.length > 100
      ? `${content.substring(0, 100)}...`
      : content;

    await supabase
      .from("Notification")
      .insert({
        userId: receiverId,
        bookingId,
        type: "NEW_MESSAGE",
        title: notificationTitle,
        message: notificationMessage,
        actionUrl: `/messages?bookingId=${bookingId}`,
        isRead: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message", details: error.message },
      { status: 500 }
    );
  }
}
