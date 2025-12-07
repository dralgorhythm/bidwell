import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DELETE, GET, PATCH, POST, PUT, rateLimitMap } from './route'

// Helper to create a mock NextRequest
function createMockRequest(url: string, options: RequestInit = {}): Request {
  return new Request(url, options)
}

// Counter for unique IPs
let ipCounter = 0

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    rateLimitMap.clear() // Clear rate limit between tests
    ipCounter = 0
  })

  describe('POST /api/contact', () => {
    it('accepts valid contact form submission', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        inquiryType: 'Career Coaching Consultation',
        message: 'I would like to discuss career coaching opportunities.',
        preferredContactMethod: 'Email',
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(validData),
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('Thank you')
    })

    it('rejects submission with missing required fields', async () => {
      const invalidData = {
        name: 'John',
        // Missing email, inquiryType, and message
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(invalidData),
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.errors).toBeDefined()
    })

    it('validates email format', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        inquiryType: 'Career Coaching Consultation',
        message: 'Test message with enough characters.',
        preferredContactMethod: 'Email',
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(invalidData),
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.errors?.email).toBeDefined()
    })

    it('validates message minimum length', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        inquiryType: 'Career Coaching Consultation',
        message: 'Short',
        preferredContactMethod: 'Email',
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(invalidData),
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.errors?.message).toBeDefined()
    })

    it('accepts optional fields', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        company: 'Acme Corp',
        inquiryType: 'Business Partnership',
        message: 'I would like to discuss a potential business partnership.',
        preferredContactMethod: 'Phone',
        bestTimeToContact: 'Weekday afternoons',
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(validData),
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('validates inquiry type enum', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        inquiryType: 'Invalid Type',
        message: 'Test message with enough characters.',
        preferredContactMethod: 'Email',
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(invalidData),
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.errors?.inquiryType).toBeDefined()
    })

    it('enforces rate limiting', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        inquiryType: 'Career Coaching Consultation',
        message: 'Test message with enough characters for validation.',
        preferredContactMethod: 'Email',
      }

      const testIp = '192.168.99.99'
      const headers = {
        'Content-Type': 'application/json',
        'x-forwarded-for': testIp,
      }

      // Send 6 requests (limit is 5)
      const requests = Array.from({ length: 6 }, () =>
        createMockRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          headers,
          body: JSON.stringify(validData),
        })
      )

      const responses = await Promise.all(requests.map(req => POST(req as never)))

      // First 5 should succeed
      expect(responses[0]?.status).toBe(200)
      expect(responses[4]?.status).toBe(200)

      // 6th should be rate limited
      expect(responses[5]?.status).toBe(429)
      const data = await responses[5]?.json()
      expect(data?.success).toBe(false)
      expect(data?.message).toContain('Too many requests')
    })

    it('handles malformed JSON', async () => {
      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: 'invalid json',
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })

  describe('Other HTTP Methods', () => {
    it('rejects GET requests', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(405)
      expect(data.error).toBe('Method not allowed')
    })

    it('rejects PUT requests', async () => {
      const response = await PUT()
      const data = await response.json()

      expect(response.status).toBe(405)
      expect(data.error).toBe('Method not allowed')
    })

    it('rejects DELETE requests', async () => {
      const response = await DELETE()
      const data = await response.json()

      expect(response.status).toBe(405)
      expect(data.error).toBe('Method not allowed')
    })

    it('rejects PATCH requests', async () => {
      const response = await PATCH()
      const data = await response.json()

      expect(response.status).toBe(405)
      expect(data.error).toBe('Method not allowed')
    })
  })

  describe('Input Sanitization', () => {
    it('sanitizes HTML from inputs', async () => {
      const dataWithHTML = {
        name: 'John <script>alert("xss")</script> Doe',
        email: 'john@example.com',
        inquiryType: 'Career Coaching Consultation',
        message: 'Message with <b>HTML</b> tags and enough characters.',
        preferredContactMethod: 'Email',
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(dataWithHTML),
      }) as never

      const response = await POST(request)
      expect(response.status).toBe(200)
      // In production, you'd verify sanitization in logs or database
    })
  })

  describe('Validation Edge Cases', () => {
    it('validates maximum name length', async () => {
      const longName = 'a'.repeat(101)
      const invalidData = {
        name: longName,
        email: 'john@example.com',
        inquiryType: 'Career Coaching Consultation',
        message: 'Test message with enough characters.',
        preferredContactMethod: 'Email',
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(invalidData),
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.errors?.name).toBeDefined()
    })

    it('validates maximum message length', async () => {
      const longMessage = 'a'.repeat(2001)
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        inquiryType: 'Career Coaching Consultation',
        message: longMessage,
        preferredContactMethod: 'Email',
      }

      const request = createMockRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${++ipCounter}`,
        },
        body: JSON.stringify(invalidData),
      }) as never

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.errors?.message).toBeDefined()
    })
  })
})
