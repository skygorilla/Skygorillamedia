import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/utils/inputValidator';

/**
 * Security middleware following Skygorilla world-class standards
 */

export function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next();
    
    // Skip rate limiting in development
    if (process.env.NODE_ENV !== 'development') {
      const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
      try {
        if (!rateLimit(clientIp, 100, 60000)) {
          return new NextResponse('Too Many Requests', { status: 429 });
        }
      } catch (error) {
        console.error('Rate limiting error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
      }
    }

  // Security headers - allow framing in development
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Frame-Options', 'ALLOWALL');
  } else {
    response.headers.set('X-Frame-Options', 'DENY');
  }
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), autoplay=(), local-fonts=(), cross-origin-isolated=()');
  
  // Strict Transport Security for HTTPS
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Content Security Policy - relaxed for development
  const isDev = process.env.NODE_ENV === 'development';
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    isDev ? "frame-ancestors *" : "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);

    // Block suspicious requests
    try {
      const userAgent = request.headers.get('user-agent') || '';
      const suspiciousPatterns = [
        /sqlmap/i, /nikto/i, /nessus/i, /burp/i, /nmap/i,
        /<script/i, /javascript:/i, /vbscript:/i,
      ];

      if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    } catch (error) {
      console.error('User agent validation error:', error);
    }

    // Block requests with suspicious query parameters
    try {
      const suspiciousParams = ['<script', 'javascript:', 'vbscript:', 'onload=', 'onerror='];
      
      for (const [key, value] of request.nextUrl.searchParams.entries()) {
        if (suspiciousParams.some(pattern => key.includes(pattern) || value.includes(pattern))) {
          return new NextResponse('Bad Request', { status: 400 });
        }
      }
    } catch (error) {
      console.error('Query parameter validation error:', { error: error instanceof Error ? error.message : 'Unknown error' });
    }

    // Validate file upload paths
    if (request.method === 'POST' && request.nextUrl.pathname.includes('/upload')) {
      const contentType = request.headers.get('content-type') || '';
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      
      if (!allowedTypes.some(type => contentType.includes(type))) {
        return new NextResponse('Unsupported Media Type', { status: 415 });
      }
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};