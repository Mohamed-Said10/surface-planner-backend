// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Helper function to get CORS headers
function getCorsHeaders(request?: NextRequest) {
  const origin = request?.headers.get('origin') || '';
  const allowedOrigins = [
    'https://sp-dashboard-nine.vercel.app',
    'http://localhost:3001'
  ];

  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-csrf-token',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400'
  }
}

// Helper function to handle CORS preflight requests
function handleCorsOptions(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request)
  })
}

export async function middleware(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return handleCorsOptions(request)
  }

  // Create a base response we'll modify
  let response = NextResponse.next()

  // Protected routes configuration
  const protectedRoutes = {
    '/dash': ['CLIENT'],
    '/dash/bookings': ['CLIENT'],
    '/dash/settings': ['CLIENT'],
    '/api/bookings': ['CLIENT', 'PHOTOGRAPHER', 'ADMIN'],
    '/api/booking': ['CLIENT']
  }

  const isProtected = Object.keys(protectedRoutes).some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtected) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token'
    })

    const isApiRoute = request.nextUrl.pathname.startsWith('/api')

    if (!session) {
      if (isApiRoute) {
        response = new NextResponse(
          JSON.stringify({ error: 'Authentication required' }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              ...getCorsHeaders(request)
            }
          }
        )
      } else {
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
        response = NextResponse.redirect(loginUrl)
        response.cookies.delete(
          process.env.NODE_ENV === 'production'
            ? '__Secure-next-auth.session-token'
            : 'next-auth.session-token'
        )
      }
      return response
    }

    const requiredRoles = Object.entries(protectedRoutes)
      .find(([route]) => request.nextUrl.pathname.startsWith(route))?.[1] || []

    if (!requiredRoles.includes(session.role as string)) {
      if (isApiRoute) {
        response = new NextResponse(
          JSON.stringify({ error: 'Insufficient permissions' }),
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              ...getCorsHeaders(request)
            }
          }
        )
      } else {
        response = NextResponse.redirect(new URL('/auth/unauthorized', request.url))
      }
      return response
    }

    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const csrfToken = request.cookies.get('next-auth.csrf-token')?.value
      const callbackUrl = request.cookies.get('next-auth.callback-url')?.value

      if (!csrfToken || !callbackUrl) {
        response = new NextResponse(
          JSON.stringify({ error: 'CSRF token verification failed' }),
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              ...getCorsHeaders(request)
            }
          }
        )
        return response
      }
    }
  }

  // Add CORS headers to all API responses
  if (request.nextUrl.pathname.startsWith('/api')) {
    const headers = getCorsHeaders(request)
    // Add security headers for API routes
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')

    // Apply to existing response
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
  }

  return response
}

// Applies this middleware to all API routes
export const config = {
  matcher: '/api/:path*',
}
