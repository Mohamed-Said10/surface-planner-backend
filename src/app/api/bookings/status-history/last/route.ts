/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";


/**
 * Get the status history of the last booking assigned to the logged-in photographer
 */
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    
    // Find the user and verify they exist
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let lastBooking;

    // Handle different user roles
    if (user.role === "PHOTOGRAPHER") {
      // For photographers: Find the last booking assigned to them
      lastBooking = await prisma.booking.findFirst({
        where: {
          photographerId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!lastBooking) {
        return NextResponse.json(
          { error: "No bookings assigned to you" },
          { status: 404 }
        );
      }
    } else if (user.role === "CLIENT") {
      // For clients: Find their last booking
      lastBooking = await prisma.booking.findFirst({
        where: {
          clientId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!lastBooking) {
        return NextResponse.json(
          { error: "You haven't made any bookings yet" },
          { status: 404 }
        );
      }
    } else if (user.role === "ADMIN") {
      // For admins: Find the latest booking in the system
      lastBooking = await prisma.booking.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!lastBooking) {
        return NextResponse.json(
          { error: "No bookings found in the system" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Unauthorized access: Invalid user role" },
        { status: 403 }
      );
    }

    // Get the status history for this booking
    const statusHistory = await prisma.bookingStatusHistory.findMany({
      where: { 
        bookingId: lastBooking.id,
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Return both the booking details and its status history
    return NextResponse.json({
      bookingId: lastBooking.id,
      statusHistory
    });
    
  } catch (error: any) {
    console.error("Error retrieving booking status history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve status history", details: error.message },
      { status: 500 }
    );
  }
}