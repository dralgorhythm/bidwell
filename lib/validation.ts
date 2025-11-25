import { z } from 'zod'

// Email validation schema
export const emailSchema = z.string().email('Please enter a valid email address')

// Name validation schema
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')

// Message validation schema
export const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(5000, 'Message must be less than 5000 characters')

// Phone validation schema (optional)
export const phoneSchema = z
  .string()
  .regex(/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''))

// Contact form validation schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.string().min(1, 'Please select a subject'),
  message: messageSchema,
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 5000) // Limit length
}

// Rate limiting helper
export interface RateLimitInfo {
  limit: number
  windowMs: number
  requests: Map<string, { count: number; resetTime: number }>
}

export function createRateLimit(limit: number, windowMs: number): RateLimitInfo {
  return {
    limit,
    windowMs,
    requests: new Map(),
  }
}

export function checkRateLimit(
  rateLimitInfo: RateLimitInfo,
  identifier: string
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const { limit, windowMs, requests } = rateLimitInfo

  // Clean up expired entries
  const keysToDelete: string[] = []
  requests.forEach((value, key) => {
    if (now > value.resetTime) {
      keysToDelete.push(key)
    }
  })
  for (const key of keysToDelete) {
    requests.delete(key)
  }

  const requestInfo = requests.get(identifier)

  if (!requestInfo) {
    requests.set(identifier, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: limit - 1, resetTime: now + windowMs }
  }

  if (requestInfo.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: requestInfo.resetTime }
  }

  requestInfo.count += 1
  return {
    allowed: true,
    remaining: limit - requestInfo.count,
    resetTime: requestInfo.resetTime,
  }
}
