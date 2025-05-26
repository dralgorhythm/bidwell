import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders, getClientIP } from 'lib/security'
import { createRateLimit, checkRateLimit } from 'lib/validation'

// Rate limiting: 10 requests per minute per IP
const rateLimit = createRateLimit(10, 60 * 1000)

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Check rate limit
    const rateLimitResult = checkRateLimit(rateLimit, clientIP)

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          }
        }
      )
    }

    // Health check response
    const response = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        ...getSecurityHeaders(),
        'X-RateLimit-Limit': rateLimit.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      }
    })
  } catch (error) {
    // Log error but don't expose details
    console.error('Health check error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: getSecurityHeaders()
      }
    )
  }
}

