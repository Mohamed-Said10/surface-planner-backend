import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Must be service role for update access
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid or missing token" }, { status: 400 });
  }

  try {
    // Find the user with the given verification token
    const { data: user, error: findError } = await supabase
      .from("User")
      .select("*")
      .eq("verificationToken", token)
      .single();

    if (findError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update the user's emailVerified and clear the token
    const { error: updateError } = await supabase
      .from("User")
      .update({
        emailVerified: new Date().toISOString(),
        verificationToken: null,
      })
      .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ message: "Email verified successfully. You can now log in." });

  } catch (error) {
    console.error("Error during email verification:", error);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}

