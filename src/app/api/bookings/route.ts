/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001", // must match frontend origin
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true", // <== also VERY IMPORTANT
};


export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Access-Control-Allow-Origin": "http://localhost:3001", // your frontend
      "Access-Control-Allow-Credentials": "true",
    }    
  });
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { 
          status: 401,
          headers: corsHeaders
        }
      );
    }

    // Parse request body
    const body = await req.json();
    const {
      selectedPackage,
      propertyType,
      propertySize,
      buildingName,
      unitNumber,
      floor,
      street,
      addOns,
      date,
      timeSlot,
      firstName,
      lastName,
      phoneNumber,
      email,
    } = body;

    // Validate required fields
    if (
      !selectedPackage ||
      !propertyType ||
      !propertySize ||
      !buildingName ||
      !unitNumber ||
      !floor ||
      !street ||
      !date ||
      !timeSlot ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    // Get client information from session
    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { 
          status: 404,
          headers: corsHeaders
        }
      );
    }

    let packageData = await prisma.package.findUnique({
      where: { id: selectedPackage.id }
    });

    // If package doesn't exist, create it
    if (!packageData) {
      packageData = await prisma.package.create({
        data: {
          id: selectedPackage.id,
          name: selectedPackage.name,
          price: selectedPackage.price,
          description: selectedPackage.description || "",
          features: selectedPackage.features || [],
          pricePerExtra: selectedPackage.pricePerExtra || null,
        }
      });
    }

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        clientId: user.id,
        packageId: selectedPackage.id,
        propertyType,
        propertySize,
        buildingName,
        unitNumber,
        floor,
        street,
        appointmentDate: new Date(date),
        timeSlot,
        firstName,
        lastName,
        phoneNumber,
        email,
        status: "BOOKING_CREATED",
        addOns: {
          create: addOns.map((addon: any) => ({
            addonId: addon.id,
            name: addon.name,
            price: addon.price,
          })) || [],
        },
      },
      include: {
        addOns: true,
        package: true,
      },
    });

    return NextResponse.json(
      { message: "Booking created successfully", booking },
      { 
        status: 201,
        headers: corsHeaders
      }
    );
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { 
          status: 401,
          headers: corsHeaders
        }
      );
    }

    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { 
          status: 404,
          headers: corsHeaders
        }
      );
    }

    // Get query parameters
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build where clause based on user role
    const whereClause: any = {};

    if (user.role === "CLIENT") {
      whereClause.clientId = user.id;
    } else if (user.role === "PHOTOGRAPHER") {
      whereClause.photographerId = user.id;
    }

    if (status) {
      whereClause.status = status;
    }

    // Get bookings with pagination
    const [bookings, totalCount] = await Promise.all([
      prisma.booking.findMany({
        where: whereClause,
        include: {
          addOns: true,
          package: true,
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
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.booking.count({ where: whereClause }),
    ]);

    return NextResponse.json(
      {
        bookings,
        pagination: {
          total: totalCount,
          page,
          limit,
          pages: Math.ceil(totalCount / limit),
        },
      },
      { 
        headers: corsHeaders
      }
    );
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: error.message },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}