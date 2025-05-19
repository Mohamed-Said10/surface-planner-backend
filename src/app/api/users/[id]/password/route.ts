import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCorsHeaders, handleCorsOptions } from "@/lib/cors";
import { compare, hash } from "bcrypt";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (replace with your env vars or import your supabase client)
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "" // Use a service role key with update permissions
);

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const corsHeaders = getCorsHeaders(request);

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    if (session.user.id !== params.id) {
      return NextResponse.json(
        { error: "You can only update your own password" },
        { status: 403, headers: corsHeaders }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current and new password are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Fetch user password hash from Supabase
    const { data: userData, error: fetchError } = await supabase
      .from("User") // Use exact table name, adjust if needed (likely "users")
      .select("password")
      .eq("id", params.id)
      .single();

    if (fetchError || !userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Verify current password
    const isValid = await compare(currentPassword, userData.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 12);

    // Update password in Supabase
    const { error: updateError } = await supabase
      .from("User") // same table name as above
      .update({ password: hashedPassword })
      .eq("id", params.id);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update password", details: updateError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: "Password updated successfully" },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("Password update error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update password", details: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle preflight
export async function OPTIONS(request: NextRequest) {
  return handleCorsOptions(request);
}







/*import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCorsHeaders, handleCorsOptions } from "@/lib/cors";
import { compare, hash } from "bcrypt";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const corsHeaders = getCorsHeaders(request);

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    if (session.user.id !== params.id) {
      return NextResponse.json(
        { error: "You can only update your own password" },
        { status: 403, headers: corsHeaders }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current and new password are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Get user with password hash
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { password: true }
    });

    if (!user?.password) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Verify current password
    const isValid = await compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Hash new password with proper salt rounds (12 is the number of rounds)
    const hashedPassword = await hash(newPassword, 12);
    // Update password
    await prisma.user.update({
      where: { id: params.id },
      data: { password: hashedPassword }
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("Password update error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update password", details: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle preflight
export async function OPTIONS(request: NextRequest) {
  return handleCorsOptions(request);
}
*/