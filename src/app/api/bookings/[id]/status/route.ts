/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/bookings/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = params.id;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    // Get the existing booking
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Special case: Photographer accepting a booking (BOOKING_CREATED to PHOTOGRAPHER_ASSIGNED)
    const isPhotographerAcceptingBooking = 
      user.role === "PHOTOGRAPHER" && 
      existingBooking.status === "BOOKING_CREATED" && 
      status === "PHOTOGRAPHER_ASSIGNED" &&
      !existingBooking.photographerId;

    // Determine if photographer is allowed to change status
    const canPhotographerChangeStatus = 
      user.role === "PHOTOGRAPHER" &&
      (existingBooking.photographerId === user.id || isPhotographerAcceptingBooking);

    // Verify permissions - clients are restricted, photographers can only update their own bookings
    if (user.role === "CLIENT") {
      return NextResponse.json(
        { error: "Clients cannot update booking status" },
        { status: 403 }
      );
    } else if (user.role === "PHOTOGRAPHER" && !canPhotographerChangeStatus) {
      return NextResponse.json(
        { error: "Photographers can only update their own bookings" },
        { status: 403 }
      );
    }
    
    // Both photographers and admins can proceed past this point if they have the right permissions

    // Validate status transitions
    const validTransitions: Record<string, string[]> = {
      "BOOKING_CREATED": ["PHOTOGRAPHER_ASSIGNED"],
      "PHOTOGRAPHER_ASSIGNED": ["SHOOTING"],
      "SHOOTING": ["EDITING"],
      "EDITING": ["COMPLETED"],
    };

    if (
      !validTransitions[existingBooking.status]?.includes(status)
    ) {
      return NextResponse.json(
        { 
          error: `Invalid status transition from ${existingBooking.status} to ${status}`,
          validTransitions: validTransitions[existingBooking.status]
        },
        { status: 400 }
      );
    }

    // Use transaction to ensure atomic updates
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create a status history record
      const statusHistory = await tx.bookingStatusHistory.create({
        data: {
          bookingId,
          userId: user.id,
          status: status,
        }
      });

      // 2. Update booking status
      const updateData: any = { status };
      
      // If a photographer is accepting the booking, assign them to it
      if (isPhotographerAcceptingBooking) {
        updateData.photographerId = user.id;
      }

      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: updateData,
        include: {
          addOns: true,
          statusHistories: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          client: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
            },
          },
          photographer: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
            },
          },
        },
      });

      return { updatedBooking, statusHistory };
    });

    return NextResponse.json({
      ...result.updatedBooking,
      message: isPhotographerAcceptingBooking 
        ? "Booking accepted and assigned to you successfully"
        : "Booking status updated successfully"
    });
  } catch (error: any) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { error: "Failed to update booking status", details: error.message },
      { status: 500 }
    );
  }
}

// GET method to retrieve status history for a booking
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookingId = params.id;

    // Verify the booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check permissions - only allow access to relevant users
    if (
      user.role === "CLIENT" && booking.clientId !== user.id ||
      user.role === "PHOTOGRAPHER" && booking.photographerId !== user.id
    ) {
      return NextResponse.json(
        { error: "You don't have permission to view this booking's status history" },
        { status: 403 }
      );
    }

    // Get status history
    const statusHistory = await prisma.bookingStatusHistory.findMany({
      where: { bookingId },
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

    return NextResponse.json(statusHistory);
  } catch (error: any) {
    console.error("Error retrieving booking status history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve status history", details: error.message },
      { status: 500 }
    );
  }
}