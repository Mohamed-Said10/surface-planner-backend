import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for update privileges
);

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Token and password are required." },
      { status: 400 }
    );
  }

  try {
    // Find the user by the reset token
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("verificationToken", token)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token
    const { error: updateError } = await supabase
      .from("User")
      .update({
        password: hashedPassword,
        verificationToken: null,
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Failed to update password:", updateError);
      return NextResponse.json(
        { error: "Failed to reset password." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Password reset successfully." });
  } catch (error: unknown) {
    console.error("Error in reset password:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

