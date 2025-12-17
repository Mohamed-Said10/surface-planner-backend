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
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function OPTIONS(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const session = await getServerSession(authOptions);
    console.log('GET /api/bookings/[id] - Session:', session?.user?.email);

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

    const bookingId = params.id;

    // Fetch single booking with related data
    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select(`
        *,
        addOns: AddOn(*),
        package: Package(*),
        client: User!Booking_clientId_fkey(id, firstname, lastname, email),
        photographer: User!Booking_photographerId_fkey(id, firstname, lastname, email, phoneNumber)
      `)
      .eq("id", bookingId)
      .single();

    console.log('Booking query result:', { found: !!booking, error: bookingError?.message });

    if (bookingError) {
      console.error('Booking query error:', bookingError);
      return NextResponse.json(
        { error: "Failed to fetch booking", details: bookingError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Check authorization - user must be the client or photographer of this booking
    if (user.role === "CLIENT" && booking.clientId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You don't have access to this booking." },
        { status: 403, headers: corsHeaders }
      );
    }

    if (user.role === "PHOTOGRAPHER" && booking.photographerId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You don't have access to this booking." },
        { status: 403, headers: corsHeaders }
      );
    }

    return NextResponse.json(booking, { headers: corsHeaders });
  } catch (error: unknown) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const corsHeaders = getCorsHeaders(req);

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

    const bookingId = params.id;
    const body = await req.json();
    const { reason, action } = body;

    // Fetch booking to check ownership
    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Check authorization
    if (user.role === "CLIENT" && booking.clientId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You can only cancel your own bookings." },
        { status: 403, headers: corsHeaders }
      );
    }

    if (user.role === "PHOTOGRAPHER" && booking.photographerId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You can only reject bookings assigned to you." },
        { status: 403, headers: corsHeaders }
      );
    }

    // Update booking status based on action
    const newStatus = action === 'REJECT' ? 'PHOTOGRAPHER_REJECTED' : 'CANCELLED';

    const { error: updateError } = await supabase
      .from("Booking")
      .update({
        status: newStatus,
        notes: reason || null
      })
      .eq("id", bookingId);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update booking", details: updateError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    // Add status history entry
    const { error: historyError } = await supabase
      .from("BookingStatusHistory")
      .insert([
        {
          bookingId: bookingId,
          status: newStatus,
          userId: user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

    if (historyError) {
      console.error("Failed to add booking status history:", historyError);
    }

    return NextResponse.json(
      {
        message: action === 'REJECT' ? "Booking rejected successfully" : "Booking cancelled successfully",
        status: newStatus
      },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
