import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your-secret-key";

export async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      error: true,
      response: NextResponse.json(
        { error: "Unauthorized. Missing or invalid token." },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
    return { error: false, user: decoded }; // Return the decoded token (user info)
  } catch (error) {
    return {
      error: true,
      response: NextResponse.json(
        { error: "Unauthorized. Invalid token." },
        { status: 401 }
      ),
    };
  }
}