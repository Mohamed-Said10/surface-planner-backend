
// eslint-disable @typescript-eslint/no-explicit-any 
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001", // frontend origin
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "" // Use service role key for server-side
);

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Access-Control-Allow-Origin": "http://localhost:3001",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

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
        { status: 400, headers: corsHeaders }
      );
    }

    // Fetch user by email
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Check if package exists
    let { data: packageData, error: packageError } = await supabase
      .from("Package")
      .select("*")
      .eq("id", selectedPackage.id)
      .single();

    if (packageError && packageError.code === "PGRST116") {
      // Package not found, create it
      const { data: createdPackage, error: createError } = await supabase
        .from("Package")
        .insert({
          id: selectedPackage.id,
          name: selectedPackage.name,
          price: selectedPackage.price,
          description: selectedPackage.description || "",
          features: selectedPackage.features || [],
          pricePerExtra: selectedPackage.pricePerExtra || null,
        })
        .select()
        .single();

      if (createError) {
        return NextResponse.json(
          { error: "Failed to create package", details: createError.message },
          { status: 500, headers: corsHeaders }
        );
      }
      packageData = createdPackage;
    } else if (packageError) {
      return NextResponse.json(
        { error: "Failed to fetch package", details: packageError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    // Insert booking
    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .insert([
        {
          clientId: user.id,
          packageId: selectedPackage.id,
          propertyType,
          propertySize,
          buildingName,
          unitNumber,
          floor,
          street,
          appointmentDate: new Date(date).toISOString(),
          timeSlot,
          firstName,
          lastName,
          phoneNumber,
          email,
          status: "BOOKING_CREATED",
        },
      ])
      .select()
      .single();

    if (bookingError) {
      return NextResponse.json(
        { error: "Failed to create booking", details: bookingError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    // Insert addOns if present
    if (addOns && Array.isArray(addOns) && addOns.length > 0) {
      const addOnsData = addOns.map((addon: any) => ({
        bookingId: booking.id,
        addonId: addon.id,
        name: addon.name,
        price: addon.price,
      }));

      const { error: addOnsError } = await supabase
        .from("AddOn")
        .insert(addOnsData);
      if (addOnsError) {
        console.error("Failed to add booking addOns:", addOnsError);
        // We continue anyway
      }
    }

    // ✅ Add status history entry
    const { error: historyError } = await supabase
    .from("BookingStatusHistory")
    .insert([
      {
        bookingId: booking.id,
        status: "BOOKING_CREATED",
        userId: user.id, // ✅ this is required
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);


    if (historyError) {
    console.error("Failed to add booking status history:", historyError);
    // You might still allow the booking to proceed, or handle this as a critical error
    }

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: {
          ...booking,
          package: packageData,
          addOns: addOns || [],
        },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const from = (page - 1) * limit;

    let query = supabase.from("Booking").select(`
    *,
    addOns: AddOn(*),
    package: Package(*),
    client: User!clientId(id, firstname, lastname, email),
    photographer: User!photographerId(id, firstname, lastname, email)
  `);

    if (user.role === "CLIENT") {
      query = query.eq("clientId", user.id);
    } else if (user.role === "PHOTOGRAPHER") {
      query = query.eq("photographerId", user.id);
    }

    if (status) {
      query = query.eq("status", status);
    }

    query = query
      .range(from, from + limit - 1)
      .order("createdAt", { ascending: false });

    const { data: bookings, error: bookingsError } = await query;

    if (bookingsError) {
      return NextResponse.json(
        { error: "Failed to fetch bookings", details: bookingsError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    // Get total count separately (Supabase doesn't return count with range)
    const { count: totalCount, error: countError } = await supabase
      .from("Booking")
      .select("*", { count: "exact", head: true })
      .match(
        user.role === "CLIENT"
          ? { clientId: user.id }
          : user.role === "PHOTOGRAPHER"
          ? { photographerId: user.id }
          : {}
      )
      .eq(status ? "status" : undefined, status || undefined);

    if (countError) {
      console.error("Failed to get total bookings count:", countError);
    }

    return NextResponse.json(
      {
        bookings,
        pagination: {
          total: totalCount ?? 0,
          page,
          limit,
          pages: totalCount ? Math.ceil(totalCount / limit) : 0,
        },
      },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}







/*
// eslint-disable @typescript-eslint/no-explicit-any
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }
    // Parse request body
    const body = await req.json();
    console.log(req.body,"request body")

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
        { status: 400 }
      );
    }

    // Get client information from session
    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // First, ensure the package exists in the database
    console.log(selectedPackage.id,"selectedPackage.id")
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

    // Create booking and initial status history in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create booking in database
      const booking = await tx.booking.create({
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
            create: addOns?.map((addon: any) => ({
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

      // Create initial status history entry
      const statusHistory = await tx.bookingStatusHistory.create({
        data: {
          bookingId: booking.id,
          userId: user.id,
          status: "BOOKING_CREATED",
        }
      });

      return { booking, statusHistory };
    });

    return NextResponse.json(
      { 
        message: "Booking created successfully", 
        booking: result.booking,
        statusHistoryId: result.statusHistory.id 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500 }
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

    // Get query parameters
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build where clause based on user role
    const whereClause: any = {};

    if (user.role === "CLIENT") {
      // Clients can only see their own bookings
      whereClause.clientId = user.id;
    } else if (user.role === "PHOTOGRAPHER") {
      // Photographers can see bookings assigned to them AND unassigned bookings with BOOKING_CREATED status
      whereClause.OR = [
        { photographerId: user.id },
        { photographerId: null, status: "BOOKING_CREATED" } // Unassigned bookings
      ];
    }
    // Admins can see all bookings

    // Add status filter if provided
    if (status) {
      // If we already have an OR condition, we need to handle this differently
      if (whereClause.OR) {
        whereClause.OR = whereClause.OR.map((condition: any) => ({
          ...condition,
          status: status
        }));
      } else {
        whereClause.status = status;
      }
    }

    // Get bookings with pagination
    const [bookings, totalCount] = await Promise.all([
      prisma.booking.findMany({
        where: whereClause,
        include: {
          addOns: true,
          package: true,
          statusHistories: {
            orderBy: { createdAt: 'desc' },
            take: 5, // Get the last 5 status changes
            include: {
              user: {
                select: {
                  id: true,
                  firstname: true,
                  lastname: true,
                  role: true
                }
              }
            }
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
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.booking.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: error.message },
      { status: 500 }
    );
  }
}
*/