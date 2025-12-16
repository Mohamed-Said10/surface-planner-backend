import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";
import { AddOn } from "@prisma/client";

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
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be a secure server-side key
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
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const { bookingId, amount, paymentMethod = "Credit Card" } = await req.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId and amount" },
        { status: 400, headers: corsHeaders }
      );
    }

    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404, headers: corsHeaders });
    }

    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select(`
        *,
        AddOn(*),
        Package(*)
      `)
      .eq("id", bookingId)
      .single();
      console.log("booking", booking);


    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404, headers: corsHeaders });
    }

    if (booking.clientId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });
    }

    const addOnTotal = booking.AddOn?.reduce((sum: number, addon: AddOn) => sum + addon.price, 0) || 0;
    const totalBookingAmount = parseFloat((booking.Package.price + addOnTotal).toFixed(2));
    const receivedAmount = parseFloat(parseFloat(amount).toFixed(2));

    if (Math.abs(receivedAmount - totalBookingAmount) > 0.01) {
      return NextResponse.json(
        {
          error: "Payment amount doesn't match booking total",
          expected: totalBookingAmount,
          received: receivedAmount,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const { data: payment, error: paymentError } = await supabase
      .from("Payment")
      .insert({
        userId: user.id,
        bookingId: booking.id,
        amount: receivedAmount,
        paymentMethod: paymentMethod,
        transactionId: transactionId,
        status: "COMPLETED",
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    const { error: updateError } = await supabase
      .from("Booking")
      .update({ isPaid: true })
      .eq("id", bookingId);

    if (updateError) throw updateError;

    return NextResponse.json(
      { message: "Payment processed", payment, transactionId },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500, headers: corsHeaders });
  }
}

export async function GET(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const bookingId = new URL(req.url).searchParams.get("bookingId")?.replace(/"/g, "");

    if (!bookingId) {
      return NextResponse.json({ error: "Missing bookingId" }, { status: 400, headers: corsHeaders });
    }

    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404, headers: corsHeaders });
    }

    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select(`
        *,
        AddOn(*),
        Package(*),
        Payment(*)
      `)
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404, headers: corsHeaders });
    }

    if (booking.clientId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });
    }

    const totalAmount = booking.Package.price +
      booking.AddOn.reduce((sum: number, addon: AddOn) => sum + addon.price, 0);

    return NextResponse.json({
      booking,
      totalAmount,
      isPaid: booking.isPaid,
      payments: booking.Payment,
    }, { headers: corsHeaders });
  } catch (error: unknown) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({
      error: "Failed to fetch payment",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500, headers: corsHeaders });
  }
}







/*
// eslint-disable @typescript-eslint/no-explicit-any 
// File: app/api/payments/route.ts
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
    const { bookingId, amount, paymentMethod = "Credit Card" } = await req.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId and amount" },
        { status: 400 }
      );
    }

    // Get user information from session
    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        addOns: true,
        package: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Verify the user is the owner of the booking or an admin
    if (booking.clientId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You are not authorized to make payment for this booking" },
        { status: 403 }
      );
    }

    
const totalBookingAmount = parseFloat(
  (booking.package.price + 
   booking.addOns.reduce((sum, addon) => sum + addon.price, 0))
  .toFixed(2)
);

const receivedAmount = parseFloat(parseFloat(amount).toFixed(2));

if (receivedAmount !== totalBookingAmount) {
  return NextResponse.json(
    { 
      error: "Payment amount doesn't match booking total",
      expected: totalBookingAmount,
      received: receivedAmount
    },
    { status: 400 }
  );
}
    // Basic amount validation (with some tolerance for floating point errors)
    if (Math.abs(parseFloat(amount) - totalBookingAmount) > 0.01) {
      return NextResponse.json(
        { 
          error: "Payment amount doesn't match booking total",
          expected: totalBookingAmount,
          received: parseFloat(amount)
        },
        { status: 400 }
      );
    }

    // Generate a mock transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        bookingId: booking.id,
        amount: parseFloat(amount),
        paymentMethod,
        transactionId,
        status: "COMPLETED"
      }
    });

    // Update booking payment status
    await prisma.booking.update({
      where: { id: bookingId },
      data: { 
        isPaid: true,
      }
    });

    return NextResponse.json(
      { 
        message: "Payment processed successfully", 
        payment,
        transactionId
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Failed to process payment", details: error.message },
      { status: 500 }
    );
  }
}

// Get payment by booking ID
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

    // Get user information from session
    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get booking ID from query params
    const url = new URL(req.url);
const bookingId = url.searchParams.get("bookingId")?.replace(/"/g, ''); // Trim quotes
console.log("Received bookingId:", bookingId); // Add this in your GET handler

    if (!bookingId) {
      return NextResponse.json(
        { error: "Missing required query parameter: bookingId" },
        { status: 400 }
      );
    }

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        addOns: true,
        package: true,
        payments: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Verify the user is the owner of the booking or an admin
    if (booking.clientId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You are not authorized to view this booking" },
        { status: 403 }
      );
    }

    // Calculate total amount
    const totalAmount = booking.package.price + 
      booking.addOns.reduce((sum, addon) => sum + addon.price, 0);

    return NextResponse.json({
      booking,
      totalAmount,
      isPaid: booking.isPaid,
      payments: booking.payments
    });
  } catch (error: any) {
    console.error("Error fetching payment info:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment information", details: error.message },
      { status: 500 }
    );
  }
}
  */