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

    // Check if the user is a photographer
    if (user.role !== "PHOTOGRAPHER") {
      return NextResponse.json(
        { error: "Access denied. Only photographers can access this endpoint." },
        { status: 403 }
      );
    }

    // Find the last booking assigned to this photographer
    const lastBooking = await prisma.booking.findFirst({
      where: {
        photographerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!lastBooking) {
      return NextResponse.json(
        { error: "No bookings found for this photographer" },
        { status: 404 }
      );
    }

    // Get the status history for this booking
    const statusHistory = await prisma.bookingStatusHistory.findMany({
      where: { 
        bookingId: lastBooking.id ,
        
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
    console.error("Error retrieving photographer's last booking status history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve status history", details: error.message },
      { status: 500 }
    );
  }
}