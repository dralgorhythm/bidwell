import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { ContactFormResponse } from '@/app/(main)/contact/schema'
import { contactFormSchema } from '@/app/(main)/contact/schema'

// Rate limiting storage (in-memory for simplicity, use Redis in production)
export const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5 // Max 5 requests per hour per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limitData = rateLimitMap.get(ip)

  if (!limitData || now > limitData.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return true
  }

  if (limitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  limitData.count++
  return true
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIp || 'unknown'
}

function sanitizeInput(text: string): string {
  // Remove potential XSS and script tags
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactFormResponse>> {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate with Zod schema
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      const errors: Record<string, string[]> = {}
      result.error.issues.forEach(error => {
        const field = error.path[0] as string
        if (!errors[field]) {
          errors[field] = []
        }
        errors[field]?.push(error.message)
      })

      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed. Please check your input.',
          errors,
        },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      ...result.data,
      name: sanitizeInput(result.data.name),
      email: sanitizeInput(result.data.email),
      message: sanitizeInput(result.data.message),
      company: result.data.company ? sanitizeInput(result.data.company) : undefined,
      phone: result.data.phone ? sanitizeInput(result.data.phone) : undefined,
      bestTimeToContact: result.data.bestTimeToContact
        ? sanitizeInput(result.data.bestTimeToContact)
        : undefined,
      otherDetails: result.data.otherDetails ? sanitizeInput(result.data.otherDetails) : undefined,
    }

    // TODO: Send email notification
    // This is a placeholder for email service integration
    // In production, integrate with Resend, SendGrid, or similar service
    console.log('Contact form submission:', {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip: clientIp,
    })

    // For now, we'll just log the submission
    // In production, you would:
    // 1. Send email to admin
    // 2. Send confirmation email to user
    // 3. Optionally store in database

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for your message! I will get back to you within 24-48 hours during business days.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}

// Reject other methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PATCH(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
