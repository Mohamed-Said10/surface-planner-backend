/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/notifications/work-completed/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { notifyClientWorkCompleted } from "@/lib/notificationHelper";

// POST /api/notifications/work-completed - Notify client that work is completed
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const { bookingId, clientId, photographerName, bookingReference } = await req.json();

    // Validate inputs
    if (!bookingId || !clientId || !photographerName || !bookingReference) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId, clientId, photographerName, and bookingReference are required" },
        { status: 400 }
      );
    }

    // Create notification for the client
    await notifyClientWorkCompleted(
      bookingId,
      clientId,
      photographerName,
      bookingReference
    );

    return NextResponse.json({
      success: true,
      message: "Work completion notification sent to client",
    });
  } catch (error: any) {
    console.error("Error creating work completion notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification", details: error.message },
      { status: 500 }
    );
  }
}
