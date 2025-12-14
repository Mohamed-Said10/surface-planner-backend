// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle CORS
  const response = NextResponse.next()
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', 'https://sp-dashboard-nine.vercel.app')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-csrf-token')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Max-Age', '86400')

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return handleCorsOptions(request)
  }

  // 2. Create a base response we'll modify
  let response = NextResponse.next()

  // 3. Protected routes configuration
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