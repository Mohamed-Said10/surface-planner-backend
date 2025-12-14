import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // 2. Fetch current user
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("id, role")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Check if user is ADMIN
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Access denied. Only admins can access this endpoint." },
        { status: 403 }
      );
    }

    // 4. Fetch photographers
    const { data: photographers, error: fetchError } = await supabase
      .from("User")
      .select("id, firstname, lastname, city, email, phoneNumber, role")
      .eq("role", "PHOTOGRAPHER");

    if (fetchError || !photographers) {
      return NextResponse.json(
        { error: "Failed to fetch photographers", details: fetchError?.message },
        { status: 500 }
      );
    }

    // 5. Fetch completed bookings
    const { data: completedBookings, error: bError } = await supabase
      .from("Booking")
      .select("photographerId")
      .eq("status", "COMPLETED");

    if (bError || !completedBookings) {
      return NextResponse.json(
        { error: "Failed to fetch completed bookings", details: bError?.message },
        { status: 500 }
      );
    }

    // 6. Count completed bookings per photographer (add it by js)
    const bookingCountMap = completedBookings.reduce<Record<string, number>>((acc, booking) => {
      if (booking.photographerId) {
        acc[booking.photographerId] = (acc[booking.photographerId] || 0) + 1;
      }
      return acc;
    }, {});

    const photographersWithJobCount = photographers.map((photographer) => ({
      ...photographer,
      jobs_done: bookingCountMap[photographer.id] || 0,
    }));

    return NextResponse.json({ photographers: photographersWithJobCount });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Unexpected server error", details: error.message },
      { status: 500 }
    );
  }
}
