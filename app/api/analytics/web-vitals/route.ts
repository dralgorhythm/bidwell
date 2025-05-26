import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders, getClientIP } from '@/lib/security'
import { createRateLimit, checkRateLimit } from '@/lib/validation'

// Rate limiting: 60 requests per minute per IP for analytics
const rateLimit = createRateLimit(60, 60 * 1000)

export const dynamic = 'force-dynamic'

interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
  userAgent?: string
  url?: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Check rate limit
    const rateLimitResult = checkRateLimit(rateLimit, clientIP)

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded for analytics' },
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          },
        }
      )
    }

    // Parse the request body
    const metric: Partial<WebVitalMetric> = await request.json()

    // Validate required fields
    if (!metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data: name and value are required' },
        {
          status: 400,
          headers: getSecurityHeaders(),
        }
      )
    }

    // Enrich metric with additional data
    const enrichedMetric: WebVitalMetric = {
      ...metric,
      userAgent: request.headers.get('user-agent') || undefined,
      url: request.headers.get('referer') || undefined,
      timestamp: new Date().toISOString(),
    } as WebVitalMetric

    // Track metric for monitoring (in production, send to your analytics service)
    if (process.env.NODE_ENV === 'development') {
      // Development mode: metric data available for debugging
      // Could be logged to monitoring service in production
    }

    // In production, you would typically:
    // 1. Send to Google Analytics 4
    // 2. Store in your database
    // 3. Send to monitoring services like Sentry, DataDog, etc.
    // 4. Trigger alerts for poor performance

    // Example: Send poor performance alerts
    if (enrichedMetric.rating === 'poor') {
      await sendPerformanceAlert(enrichedMetric)
    }

    return NextResponse.json(
      { success: true, received: enrichedMetric.name },
      {
        status: 200,
        headers: {
          ...getSecurityHeaders(),
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        },
      }
    )
  } catch {
    // Handle error but don't expose details to client
    // In production, this would be logged to monitoring service

    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: getSecurityHeaders(),
      }
    )
  }
}

/**
 * Send alerts for poor performance metrics
 */
async function sendPerformanceAlert(metric: WebVitalMetric): Promise<void> {
  try {
    // In production, you might:
    // - Send to Slack/Discord
    // - Email alerts
    // - Create monitoring tickets
    // - Send to error tracking services

    // Poor performance metric detected - could trigger alerts

    // Example: Send to webhook for alerting
    if (process.env.PERFORMANCE_WEBHOOK_URL) {
      await fetch(process.env.PERFORMANCE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `🚨 Poor Performance Alert: ${metric.name} = ${metric.value} on ${metric.url}`,
          metric,
        }),
      })
    }
  } catch {
    // Failed to send performance alert - silent fail
    // In production, this would be logged to monitoring service
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    {
      status: 405,
      headers: getSecurityHeaders(),
    }
  )
}
