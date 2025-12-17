
// eslint-disable @typescript-eslint/no-explicit-any 
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized. Please login first." }, { status: 401 });
    }

    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let lastBookingData;

    if (user.role === "PHOTOGRAPHER") {
      const { data, error } = await supabase
        .from("Booking")
        .select("*")
        .eq("photographerId", user.id)
        .order("createdAt", { ascending: false })
        .limit(1);
      if (error || !data || data.length === 0) {
        return NextResponse.json({ error: "No bookings assigned to you" }, { status: 404 });
      }
      lastBookingData = data[0];
    } else if (user.role === "CLIENT") {
      const { data, error } = await supabase
        .from("Booking")
        .select("*")
        .eq("clientId", user.id)
        .order("createdAt", { ascending: false })
        .limit(1);
      if (error || !data || data.length === 0) {
        return NextResponse.json({ error: "You haven't made any bookings yet" }, { status: 404 });
      }
      lastBookingData = data[0];
      console.log("lastBookingData", lastBookingData);
    } else if (user.role === "ADMIN") {
      const { data, error } = await supabase
        .from("Booking")
        .select("*")
        .order("createdAt", { ascending: false })
        .limit(1);
      if (error || !data || data.length === 0) {
        return NextResponse.json({ error: "No bookings found in the system" }, { status: 404 });
      }
      lastBookingData = data[0];
    } else {
      return NextResponse.json(
        { error: "Unauthorized access: Invalid user role" },
        { status: 403 }
      );
    }

    const { data: statusHistory, error: statusError } = await supabase
      .from("BookingStatusHistory")
      .select("*")
      .eq("bookingId", lastBookingData.id)
      .order("createdAt", { ascending: false });

      console.log("statusHistory", statusHistory);
      console.log("statusError", statusError);
      

    if (statusError) {
      return NextResponse.json(
        { error: "Failed to fetch status history", details: statusError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      bookingId: lastBookingData.id,
      statusHistory,
    });

  } catch (error: unknown) {
    console.error("Error retrieving booking status history:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to retrieve status history", details: errorMessage },
      { status: 500 }
    );
  }
}

