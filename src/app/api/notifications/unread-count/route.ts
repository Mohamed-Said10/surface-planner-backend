/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/notifications/unread-count/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";

// GET /api/notifications/unread-count - Get count of unread notifications for current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { count, error: countError } = await supabase
      .from("Notification")
      .select("id", { count: "exact", head: false })
      .eq("userId", user.id)
      .eq("isRead", false);

    if (countError) {
      throw new Error(`Failed to count unread notifications: ${countError.message}`);
    }

    return NextResponse.json({ count: count || 0 });
  } catch (error: any) {
    console.error("Error counting unread notifications:", error);
    return NextResponse.json(
      { error: "Failed to count unread notifications", details: error.message },
      { status: 500 }
    );
  }
}
