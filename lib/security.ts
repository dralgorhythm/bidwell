import { randomBytes, createHash } from 'crypto'

// Generate CSRF token
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

// Hash token for storage/comparison
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

// Verify CSRF token
export function verifyCSRFToken(providedToken: string, storedHash: string): boolean {
  if (!providedToken || !storedHash) {
    return false
  }

  const providedHash = hashToken(providedToken)
  return providedHash === storedHash
}

// Get client IP address from request
export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  if (cfConnectingIP) {
    return cfConnectingIP
  }

  // Fallback
  return 'unknown'
}

// Security headers for API responses
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
}

