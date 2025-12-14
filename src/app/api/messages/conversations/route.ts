/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/messages/conversations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

// GET /api/messages/conversations - Get all conversations for the current user
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

    // Get all bookings where user is either client or photographer
    let bookingsQuery = supabase
      .from("Booking")
      .select(`
        id,
        shortId,
        status,
        appointmentDate,
        clientId,
        photographerId,
        selectedPackage,
        client:User!Booking_clientId_fkey (
          id,
          firstname,
          lastname,
          email,
          profileImage
        ),
        photographer:User!Booking_photographerId_fkey (
          id,
          firstname,
          lastname,
          email,
          profileImage
        )
      `);

    if (user.role === "CLIENT") {
      bookingsQuery = bookingsQuery.eq("clientId", user.id);
    } else if (user.role === "PHOTOGRAPHER") {
      bookingsQuery = bookingsQuery.eq("photographerId", user.id);
    } else {
      // For other roles, return empty conversations
      return NextResponse.json({ conversations: [] });
    }

    const { data: bookings, error: bookingsError } = await bookingsQuery;

    if (bookingsError) {
      throw new Error(`Failed to fetch bookings: ${bookingsError.message}`);
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ conversations: [] });
    }

    // Get all messages for these bookings
    const bookingIds = bookings.map((b) => b.id);
    const { data: messages, error: messagesError } = await supabase
      .from("Message")
      .select("*")
      .in("bookingId", bookingIds)
      .order("createdAt", { ascending: false });

    if (messagesError) {
      throw new Error(`Failed to fetch messages: ${messagesError.message}`);
    }

    // Build conversations
    const conversations = bookings.map((booking) => {
      const bookingMessages = messages?.filter(
        (m) => m.bookingId === booking.id
      ) || [];

      const lastMessage = bookingMessages[0] || null;

      // Count unread messages where user is the receiver
      const unreadCount = bookingMessages.filter(
        (m) => m.receiverId === user.id && !m.isRead
      ).length;

      return {
        bookingId: booking.id,
        booking: {
          id: booking.id,
          shortId: booking.shortId,
          status: booking.status,
          package: booking.selectedPackage,
          appointmentDate: booking.appointmentDate,
        },
        client: booking.client || null,
        photographer: booking.photographer || null,
        lastMessage: lastMessage
          ? {
              id: lastMessage.id,
              text: lastMessage.content,
              senderId: lastMessage.senderId,
              receiverId: lastMessage.receiverId,
              isRead: lastMessage.isRead,
              createdAt: lastMessage.createdAt,
            }
          : null,
        unreadCount,
      };
    });

    // Sort conversations by last message date (most recent first)
    conversations.sort((a, b) => {
      const dateA = a.lastMessage?.createdAt || a.booking.appointmentDate || "";
      const dateB = b.lastMessage?.createdAt || b.booking.appointmentDate || "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    return NextResponse.json({ conversations });
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations", details: error.message },
      { status: 500 }
    );
  }
}
