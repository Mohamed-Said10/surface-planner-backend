/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role needed to access related tables
);

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // Fetch user from Supabase
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role !== "PHOTOGRAPHER") {
      return NextResponse.json(
        { error: "Access denied. Only photographers can access this endpoint." },
        { status: 403 }
      );
    }

    // Fetch bookings with related data
    const { data: bookings, error: bookingsError } = await supabase
      .from("Booking")
      .select(`
        *,
        package:Package (name, price, description),
        addOns:AddOn (*),
        client:User (id, firstname, lastname, email),
        statusHistories:BookingStatusHistory (
          *,
          user:User (id, firstname, lastname, email, role)
        )
      `)
      .eq("photographerId", user.id)
      .order("createdAt", { ascending: false });

    if (bookingsError) {
      console.error("Error fetching bookings:", bookingsError);
      return NextResponse.json(
        { error: "Failed to retrieve bookings." },
        { status: 500 }
      );
    }

    // Sort statusHistories by createdAt descending
    for (const booking of bookings) {
      booking.statusHistories.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    // Group bookings by status
    const bookingsByStatus: Record<string, any[]> = {
      BOOKING_CREATED: [],
      PHOTOGRAPHER_ASSIGNED: [],
      SHOOTING: [],
      EDITING: [],
      COMPLETED: [],
    };

    bookings.forEach((booking: any) => {
      if (bookingsByStatus[booking.status]) {
        bookingsByStatus[booking.status].push(booking);
      }
    });

    return NextResponse.json({
      photographer: {
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
      allBookings: bookings,
      bookingsByStatus,
    });
  } catch (error: any) {
    console.error("Error retrieving photographer's bookings and status history:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve bookings and status history",
        details: error.message,
      },
      { status: 500 }
    );
  }
}










/* 

//eslint-disable @typescript-eslint/no-explicit-any 
import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


 // API endpoint to get all bookings status history for a photographer
 // 
 // This endpoint will return all bookings and their status history
 // for the currently logged-in photographer
 
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
*/