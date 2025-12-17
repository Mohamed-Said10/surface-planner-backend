// eslint-disable @typescript-eslint/no-explicit-any
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

// Helper function to get CORS headers based on request origin
function getCorsHeaders(request?: NextRequest) {
  const origin = request?.headers.get('origin') || '';
  const allowedOrigins = [
    'https://sp-dashboard-nine.vercel.app',
    'http://localhost:3001'
  ];

  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-csrf-token",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400"
  };
}

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "" // Use service role key for server-side
);

export async function OPTIONS(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);

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
    // eslint-disable-next-line prefer-const
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
          photographerId: null,
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
      const addOnsData = addOns.map((addon) => ({
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
  } catch (error: unknown) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const session = await getServerSession(authOptions);
    console.log('GET /api/bookings - Session:', session?.user?.email);

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

    console.log('User lookup:', { email: session.user.email, found: !!user, error: userError?.message });

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found", details: userError?.message },
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
    client: User!Booking_clientId_fkey(id, firstname, lastname, email),
    photographer: User!Booking_photographerId_fkey(id, firstname, lastname, email)
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

    console.log('Bookings query result:', { count: bookings?.length, error: bookingsError?.message });

    if (bookingsError) {
      console.error('Bookings query error:', bookingsError);
      return NextResponse.json(
        { error: "Failed to fetch bookings", details: bookingsError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    // Get total count separately (Supabase doesn't return count with range)
    let countQuery = supabase
      .from("Booking")
      .select("*", { count: "exact", head: true });

    if (user.role === "CLIENT") {
      countQuery = countQuery.eq("clientId", user.id);
    } else if (user.role === "PHOTOGRAPHER") {
      countQuery = countQuery.eq("photographerId", user.id);
    }

    if (status) {
      countQuery = countQuery.eq("status", status);
    }

    const { count: totalCount, error: countError } = await countQuery;

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
  } catch (error: unknown) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings", details:  error instanceof Error ? error.message : "Unknown error"  },
      { status: 500, headers: corsHeaders }
    );
  }
}


