/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/notifications/mark-all-read/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import supabase from "@/lib/supabaseAdmin";
import { authOptions } from "@/utils/authOptions";
import { getCorsHeaders, handleCorsOptions } from "@/lib/cors";

// OPTIONS handler for CORS preflight
export async function OPTIONS(req: NextRequest) {
  return handleCorsOptions(req);
}

// POST /api/notifications/mark-all-read - Mark all notifications as read for current user
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

    const userEmail = session.user.email;
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Mark all unread notifications as read for this user
    const now = new Date().toISOString();
    const { data: updatedNotifications, error: updateError } = await supabase
      .from("Notification")
      .update({
        isRead: true,
        readAt: now,
        updatedAt: now,
      })
      .eq("userId", user.id)
      .eq("isRead", false)
      .select();

    if (updateError) {
      throw new Error(`Failed to mark notifications as read: ${updateError.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "All notifications marked as read",
      updatedCount: updatedNotifications?.length || 0,
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error marking notifications as read:", error);
    const corsHeaders = getCorsHeaders(req);
    return NextResponse.json(
      { error: "Failed to mark notifications as read", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PATCH method (same as POST for compatibility with frontend)
export const PATCH = POST;
export const PATCH = POST;
