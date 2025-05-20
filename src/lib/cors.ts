// src/lib/cors.ts

import { NextRequest, NextResponse } from "next/server";

const allowedOrigin = "https://sp-dashboard-nine.vercel.app";

export function getCorsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get("origin");
  const headers: HeadersInit = {};

  if (origin === allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  headers["Vary"] = "Origin";
  headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS";
  headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
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
