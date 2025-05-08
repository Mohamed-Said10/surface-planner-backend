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

    // Validate permissions based on role
    if (user.role === "CLIENT") {
      return NextResponse.json(
        { error: "Clients cannot update booking status" },
        { status: 403 }
      );
    } else if (user.role === "PHOTOGRAPHER") {
      // Photographers can only update status for bookings assigned to them
      if (existingBooking.photographerId !== user.id) {
        return NextResponse.json(
          { error: "You don't have permission to update this booking status" },
          { status: 403 }
        );
      }
    }
    // Admins can update any booking status

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

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        addOns: true,
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

    return NextResponse.json(updatedBooking);
  } catch (error: any) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { error: "Failed to update booking status", details: error.message },
      { status: 500 }
    );
  }
}