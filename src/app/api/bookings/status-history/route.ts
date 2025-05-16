/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * API endpoint to get all bookings status history for a photographer
 * 
 * This endpoint will return all bookings and their status history
 * for the currently logged-in photographer
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

    // Get all bookings assigned to this photographer with their status histories
    const photographerBookings = await prisma.booking.findMany({
      where: {
        photographerId: user.id,
      },
      include: {
        statusHistories: {
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
          orderBy: {
            createdAt: 'desc',
          },
        },
        package: {
          select: {
            name: true,
            price: true,
            description: true,
          },
        },
        addOns: true,
        client: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Group the bookings by status for easy filtering on the front-end
    const bookingsByStatus = {
      BOOKING_CREATED: [],
      PHOTOGRAPHER_ASSIGNED: [],
      SHOOTING: [],
      EDITING: [],
      COMPLETED: [],
    };

    photographerBookings.forEach(booking => {
      // @ts-ignore - We know these statuses exist based on the enum
      bookingsByStatus[booking.status].push(booking);
    });

    return NextResponse.json({
      photographer: {
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
      allBookings: photographerBookings,
      bookingsByStatus: bookingsByStatus,
    });
    
  } catch (error: any) {
    console.error("Error retrieving photographer's bookings and status history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve bookings and status history", details: error.message },
      { status: 500 }
    );
  }
}