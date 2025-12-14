import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Define CORS headers once for reuse
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstname, lastname, phoneNumber } = await req.json();

    // Validate input
    if (!email || !password || !firstname || !lastname) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, firstname, lastname" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Check if user exists
    const { data: existingUser, error: selectError } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

    if (selectError && selectError.code !== "PGRST116") { // ignore "no rows found"
      console.error("Error checking user existence:", selectError);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409, headers: CORS_HEADERS }
      );
    }

    // Hash password and generate token
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create photographer user
    const { error: insertError } = await supabase.from("User").insert({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      phoneNumber: phoneNumber || null,
      role: "PHOTOGRAPHER",
      emailVerified: null,
      verificationToken: verificationToken,
    });

    if (insertError) {
      console.error("Error creating photographer:", insertError);
      return NextResponse.json(
        { error: "Failed to create photographer account" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // Send verification email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const verificationUrl = `${process.env.BASE_URL}/auth/verify?token=${verificationToken}`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your photographer account",
        html: `<p>Hi ${firstname},</p>
               <p>Thank you for signing up as a photographer. Please verify your email by clicking the link below:</p>
               <a href="${verificationUrl}">Verify Email</a>
               <p>Once verified, your account will be reviewed by our admin team before activation.</p>
               <p>If you did not sign up, please ignore this email.</p>`,
      });
    }

    return NextResponse.json(
      {
        message: "Photographer account created successfully. Please check your email to verify. Your account will be activated after admin review."
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("Photographer signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// Preflight OPTIONS handler
export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}
