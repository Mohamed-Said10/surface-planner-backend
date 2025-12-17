// src/app/api/bookings/validate/route.ts
// eslint-disable @typescript-eslint/no-explicit-any

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { date, timeSlot } = body;

    if (!date || !timeSlot) {
      return NextResponse.json(
        { error: "Date and time slot are required" },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      return NextResponse.json(
        { error: "Cannot book appointments in the past", isValid: false },
        { status: 400 }
      );
    }

    const maxFutureDate = new Date();
    maxFutureDate.setMonth(maxFutureDate.getMonth() + 3);

    if (appointmentDate > maxFutureDate) {
      return NextResponse.json(
        {
          error: "Cannot book appointments more than 3 months in advance",
          isValid: false,
        },
        { status: 400 }
      );
    }

    // Check if the requested time slot is already booked
    const { data: bookings, error: bookingError } = await supabase
      .from("booking")
      .select("id")
      .eq("appointmentDate", appointmentDate.toISOString().split("T")[0])
      .eq("timeSlot", timeSlot)
      .not("status", "in", ["COMPLETED"]);

    if (bookingError) throw bookingError;

    if (bookings && bookings.length > 0) {
      return NextResponse.json({
        isValid: false,
        message: "This time slot is already booked",
      });
    }

    // Check if any photographers are available
    const { data: photographers, error: photographerError } = await supabase
      .from("user")
      .select("id")
      .eq("role", "PHOTOGRAPHER");

    if (photographerError) throw photographerError;

    if (!photographers || photographers.length === 0) {
      return NextResponse.json({
        isValid: false,
        message: "No photographers are currently available",
      });
    }

    return NextResponse.json({
      isValid: true,
      message: "Date and time slot are available for booking",
    });
  } catch (error: unknown) {
    console.error("Error validating booking:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to validate booking",
        details: errorMessage,
        isValid: false,
      },
      { status: 500 }
    );
  }
}

