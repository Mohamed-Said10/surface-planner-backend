// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prisma"; // Adjust the import path as necessary
import nodemailer from "nodemailer";
import crypto from "crypto"; 

export async function POST(req: Request) {
  try {
    const { email, password, firstname, lastname } = await req.json();

    // Check if all fields are provided
    if (!email || !password || !firstname || !lastname) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, firstname, lastname" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create new user in the database with `emailVerified` set to null
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstname,
        lastname,
        role: "CLIENT",
        emailVerified: null,
        verificationToken,
      },
    });

    // Configure nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });

    // Generate the verification URL
    const verificationUrl = `${process.env.BASE_URL}/auth/verify?token=${verificationToken}`;

    // Send the verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<p>Hi ${firstname},</p>
             <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
             <a href="${verificationUrl}">Verify Email</a>
             <p>If you did not sign up, please ignore this email.</p>`,
    });

    return NextResponse.json({
      message: "User created successfully. Please check your email to verify your account.",
    });
  } catch (error: unknown) {
    console.error("Error during signup:", error);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
