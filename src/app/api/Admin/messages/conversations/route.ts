/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/admin/messages/conversations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

// GET /api/admin/messages/conversations - Get all conversations (Admin only)
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

    // Only admins can access this endpoint
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only administrators can access all conversations" },
        { status: 403 }
      );
    }

    // Get all bookings with client and photographer information
    const { data: bookings, error: bookingsError } = await supabase
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
      `)
      .order("createdAt", { ascending: false });

    if (bookingsError) {
      throw new Error(`Failed to fetch bookings: ${bookingsError.message}`);
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ conversations: [] });
    }

    // Get all messages for all bookings
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

      // Count total unread messages for this booking
      const unreadCount = bookingMessages.filter((m) => !m.isRead).length;

      // Count messages per participant
      const clientUnreadCount = bookingMessages.filter(
        (m) => m.receiverId === booking.clientId && !m.isRead
      ).length;

      const photographerUnreadCount = booking.photographerId
        ? bookingMessages.filter(
            (m) => m.receiverId === booking.photographerId && !m.isRead
          ).length
        : 0;

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
        clientUnreadCount,
        photographerUnreadCount,
        totalMessages: bookingMessages.length,
      };
    });

    // Sort conversations by last message date (most recent first)
    conversations.sort((a, b) => {
      const dateA = a.lastMessage?.createdAt || a.booking.appointmentDate || "";
      const dateB = b.lastMessage?.createdAt || b.booking.appointmentDate || "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    // Optional: Filter to only show conversations with messages
    const { searchParams } = new URL(req.url);
    const withMessagesOnly = searchParams.get("withMessagesOnly") === "true";

    const filteredConversations = withMessagesOnly
      ? conversations.filter((c) => c.totalMessages > 0)
      : conversations;

    return NextResponse.json({
      conversations: filteredConversations,
      stats: {
        totalConversations: conversations.length,
        conversationsWithMessages: conversations.filter((c) => c.totalMessages > 0).length,
        totalUnreadMessages: conversations.reduce((sum, c) => sum + c.unreadCount, 0),
      },
    });
  } catch (error: any) {
    console.error("Error fetching admin conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations", details: error.message },
      { status: 500 }
    );
  }
}
