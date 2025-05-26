import { NextRequest } from 'next/server'
import { GET } from '../../app/api/health/route'

// Mock the dependencies
jest.mock('lib/security', () => ({
  getSecurityHeaders: jest.fn(() => ({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  })),
  getClientIP: jest.fn(() => '192.168.1.1'),
}))

jest.mock('lib/validation', () => ({
  createRateLimit: jest.fn(() => ({
    limit: 10,
    windowMs: 60000,
    requests: new Map(),
  })),
  checkRateLimit: jest.fn(() => ({
    allowed: true,
    remaining: 9,
    resetTime: Date.now() + 60000,
  })),
}))

const { getSecurityHeaders, getClientIP } = require('lib/security')
const { checkRateLimit } = require('lib/validation')

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns healthy status with correct response structure', async () => {
    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('status', 'healthy')
    expect(data).toHaveProperty('timestamp')
    expect(data).toHaveProperty('environment')
    expect(new Date(data.timestamp)).toBeInstanceOf(Date)
  })

  it('includes security headers in response', async () => {
    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET(request)

    expect(getSecurityHeaders).toHaveBeenCalled()
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
    expect(response.headers.get('X-Frame-Options')).toBe('DENY')
  })

  it('includes rate limit headers', async () => {
    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET(request)

    expect(response.headers.get('X-RateLimit-Limit')).toBe('10')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('9')
  })

  it('checks client IP for rate limiting', async () => {
    const request = new NextRequest('http://localhost:3000/api/health')
    await GET(request)

    expect(getClientIP).toHaveBeenCalledWith(request)
    expect(checkRateLimit).toHaveBeenCalled()
  })

  it('returns 429 when rate limit exceeded', async () => {
    checkRateLimit.mockReturnValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 30000,
    })

    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(429)
    expect(data).toHaveProperty('error', 'Too many requests')
    expect(response.headers.get('Retry-After')).toBeTruthy()
    expect(response.headers.get('X-RateLimit-Limit')).toBe('10')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0')
  })

  it('handles errors gracefully', async () => {
    // Mock an error in getClientIP
    getClientIP.mockImplementationOnce(() => {
      throw new Error('Network error')
    })

    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toHaveProperty('error', 'Internal server error')
    expect(console.error).toHaveBeenCalledWith('Health check error:', expect.any(Error))
  })

  it('includes correct environment in response', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'test'

    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET(request)
    const data = await response.json()

    expect(data.environment).toBe('test')

    process.env.NODE_ENV = originalEnv
  })

  it('handles missing NODE_ENV', async () => {
    const originalEnv = process.env.NODE_ENV
    delete process.env.NODE_ENV

    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET(request)
    const data = await response.json()

    expect(data.environment).toBe('unknown')

    process.env.NODE_ENV = originalEnv
  })

  it('calculates retry-after header correctly', async () => {
    const futureTime = Date.now() + 45000 // 45 seconds
    checkRateLimit.mockReturnValueOnce({
      allowed: false,
      remaining: 0,
      resetTime: futureTime,
    })

    jest.spyOn(Date, 'now').mockReturnValue(Date.now())

    const request = new NextRequest('http://localhost:3000/api/health')
    const response = await GET(request)

    const retryAfter = parseInt(response.headers.get('Retry-After') || '0')
    expect(retryAfter).toBeGreaterThan(0)
    expect(retryAfter).toBeLessThanOrEqual(45)
  })
})
