import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid or missing token" }, { status: 400 });
  }

  try {
    // Find the user with the verification token
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update the user's verified status and remove the token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
      },
    });

    return NextResponse.json({ message: "Email verified successfully. You can now log in." });
  } catch (error: unknown) {
    console.error("Error during email verification:", error);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}