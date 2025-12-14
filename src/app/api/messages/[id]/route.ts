/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/messages/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

// PATCH /api/messages/[id] - Mark message as read
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const messageId = (await params).id;

    // Get the message
    const { data: message, error: messageError } = await supabase
      .from("Message")
      .select("*")
      .eq("id", messageId)
      .single();

    if (messageError || !message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // Only the receiver can mark a message as read
    if (message.receiverId !== user.id) {
      return NextResponse.json(
        { error: "You can only mark messages sent to you as read" },
        { status: 403 }
      );
    }

    // Update the message
    const { data: updatedMessage, error: updateError } = await supabase
      .from("Message")
      .update({
        isRead: true,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", messageId)
      .select(`
        *,
        sender:User!Message_senderId_fkey (id, firstname, lastname, email, role),
        receiver:User!Message_receiverId_fkey (id, firstname, lastname, email, role),
        booking:Booking (id, shortId, status)
      `)
      .single();

    if (updateError) {
      throw new Error(`Failed to update message: ${updateError.message}`);
    }

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/messages/[id] - Delete a message (sender only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const messageId = (await params).id;

    // Get the message
    const { data: message, error: messageError } = await supabase
      .from("Message")
      .select("*")
      .eq("id", messageId)
      .single();

    if (messageError || !message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // Only the sender or admin can delete a message
    if (message.senderId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only delete messages you sent" },
        { status: 403 }
      );
    }

    // Delete the message
    const { error: deleteError } = await supabase
      .from("Message")
      .delete()
      .eq("id", messageId);

    if (deleteError) {
      throw new Error(`Failed to delete message: ${deleteError.message}`);
    }

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message", details: error.message },
      { status: 500 }
    );
  }
}
