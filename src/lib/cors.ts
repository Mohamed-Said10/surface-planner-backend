// src/lib/cors.ts

import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://sp-dashboard-nine.vercel.app",
  "http://localhost:3001",
  "http://localhost:3000",
];

export function getCorsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get("origin");
  const headers: HeadersInit = {};

  if (origin && allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  headers["Vary"] = "Origin";
  headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,PATCH,OPTIONS";
  headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Cookie";
  headers["Access-Control-Allow-Credentials"] = "true";

  return headers;
}

export function handleCorsOptions(request: NextRequest): NextResponse {
  const headers = getCorsHeaders(request);
  return new NextResponse(null, {
    status: 204,
    headers,
  });
}
