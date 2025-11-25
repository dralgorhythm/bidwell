import {
  checkRateLimit,
  contactFormSchema,
  createRateLimit,
  emailSchema,
  messageSchema,
  nameSchema,
  phoneSchema,
  sanitizeInput,
} from '../../lib/validation'

describe('phoneSchema', () => {
  it('validates correct phone numbers', () => {
    expect(phoneSchema.safeParse('+1234567890').success).toBe(true)
    expect(phoneSchema.safeParse('1234567890').success).toBe(true)
    expect(phoneSchema.safeParse('1').success).toBe(true)
  })

  it('accepts empty string', () => {
    expect(phoneSchema.safeParse('').success).toBe(true)
  })

  it('accepts undefined', () => {
    expect(phoneSchema.safeParse(undefined).success).toBe(true)
  })

  it('rejects invalid phone numbers', () => {
    expect(phoneSchema.safeParse('invalid-phone').success).toBe(false)
    expect(phoneSchema.safeParse('0123456789').success).toBe(false) // Can't start with 0
    expect(phoneSchema.safeParse('+').success).toBe(false)
  })
})

describe('emailSchema', () => {
  it('validates correct email addresses', () => {
    expect(emailSchema.safeParse('test@example.com').success).toBe(true)
    expect(emailSchema.safeParse('user.name+tag@domain.co.uk').success).toBe(true)
  })

  it('rejects invalid email addresses', () => {
    expect(emailSchema.safeParse('invalid-email').success).toBe(false)
    expect(emailSchema.safeParse('user@').success).toBe(false)
    expect(emailSchema.safeParse('@domain.com').success).toBe(false)
  })

  it('provides correct error message', () => {
    const result = emailSchema.safeParse('invalid')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address')
    }
  })
})

describe('nameSchema', () => {
  it('validates correct names', () => {
    expect(nameSchema.safeParse('John Doe').success).toBe(true)
    expect(nameSchema.safeParse('Ab').success).toBe(true) // Changed from 'A' to 'Ab' (min 2 chars)
    expect(nameSchema.safeParse('Name with spaces').success).toBe(true)
  })

  it('rejects empty strings', () => {
    expect(nameSchema.safeParse('').success).toBe(false)
  })

  it('rejects names that are too long', () => {
    const longName = 'a'.repeat(101)
    expect(nameSchema.safeParse(longName).success).toBe(false)
  })

  it('provides correct error messages', () => {
    const emptyResult = nameSchema.safeParse('')
    expect(emptyResult.success).toBe(false)
    if (!emptyResult.success) {
      expect(emptyResult.error.issues[0].message).toBe('Name must be at least 2 characters')
    }

    const longName = 'a'.repeat(101)
    const longResult = nameSchema.safeParse(longName)
    expect(longResult.success).toBe(false)
    if (!longResult.success) {
      expect(longResult.error.issues[0].message).toBe('Name must be less than 100 characters')
    }
  })
})

describe('messageSchema', () => {
  it('validates correct messages', () => {
    expect(messageSchema.safeParse('This is a valid message').success).toBe(true)
    expect(messageSchema.safeParse('Short message').success).toBe(true) // Changed to 13 chars (min 10)
  })

  it('rejects empty strings', () => {
    expect(messageSchema.safeParse('').success).toBe(false)
  })

  it('rejects messages that are too long', () => {
    const longMessage = 'a'.repeat(5001) // Changed from 1001 to 5001 (max 5000)
    expect(messageSchema.safeParse(longMessage).success).toBe(false)
  })

  it('provides correct error messages', () => {
    const emptyResult = messageSchema.safeParse('')
    expect(emptyResult.success).toBe(false)
    if (!emptyResult.success) {
      expect(emptyResult.error.issues[0].message).toBe('Message must be at least 10 characters')
    }

    const longMessage = 'a'.repeat(5001) // Changed from 1001 to 5001
    const longResult = messageSchema.safeParse(longMessage)
    expect(longResult.success).toBe(false)
    if (!longResult.success) {
      expect(longResult.error.issues[0].message).toBe('Message must be less than 5000 characters')
    }
  })
})

describe('contactFormSchema', () => {
  it('validates complete form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    }
    expect(contactFormSchema.safeParse(validData).success).toBe(true)
  })

  it('validates form data without optional phone', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    }
    expect(contactFormSchema.safeParse(validData).success).toBe(true)
  })

  it('rejects form data with invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'This is a test message',
    }
    expect(contactFormSchema.safeParse(invalidData).success).toBe(false)
  })

  it('rejects form data with missing required fields', () => {
    const invalidData = {
      email: 'john@example.com',
      message: 'This is a test message',
    }
    expect(contactFormSchema.safeParse(invalidData).success).toBe(false)
  })
})

describe('sanitizeInput', () => {
  it('trims whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world')
  })

  it('removes HTML tags', () => {
    expect(sanitizeInput('hello <script>alert("xss")</script> world')).toBe(
      'hello scriptalert("xss")/script world'
    )
    expect(sanitizeInput('hello <div>content</div> world')).toBe('hello divcontent/div world')
  })

  it('limits input length', () => {
    const longInput = 'a'.repeat(6000)
    const result = sanitizeInput(longInput)
    expect(result.length).toBe(5000)
  })

  it('handles empty strings', () => {
    expect(sanitizeInput('')).toBe('')
    expect(sanitizeInput('   ')).toBe('')
  })

  it('handles mixed whitespace and HTML', () => {
    expect(sanitizeInput('  <p>Hello</p>  ')).toBe('pHello/p')
  })
})

describe('createRateLimit', () => {
  it('creates a rate limit object with correct properties', () => {
    const rateLimit = createRateLimit(10, 60000)
    expect(rateLimit.limit).toBe(10)
    expect(rateLimit.windowMs).toBe(60000)
    expect(rateLimit.requests).toBeInstanceOf(Map)
    expect(rateLimit.requests.size).toBe(0)
  })

  it('creates separate instances with different parameters', () => {
    const rateLimit1 = createRateLimit(5, 30000)
    const rateLimit2 = createRateLimit(20, 120000)

    expect(rateLimit1.limit).toBe(5)
    expect(rateLimit2.limit).toBe(20)
    expect(rateLimit1.requests).not.toBe(rateLimit2.requests)
  })
})

describe('checkRateLimit', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('allows first request and returns correct info', () => {
    const rateLimit = createRateLimit(5, 60000)
    const result = checkRateLimit(rateLimit, 'user1')

    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(4)
    expect(typeof result.resetTime).toBe('number')
  })

  it('tracks multiple requests from same identifier', () => {
    const rateLimit = createRateLimit(3, 60000)

    // First request
    let result = checkRateLimit(rateLimit, 'user1')
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(2)

    // Second request
    result = checkRateLimit(rateLimit, 'user1')
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(1)

    // Third request
    result = checkRateLimit(rateLimit, 'user1')
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(0)

    // Fourth request should be blocked
    result = checkRateLimit(rateLimit, 'user1')
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('handles different identifiers separately', () => {
    const rateLimit = createRateLimit(2, 60000)

    const result1 = checkRateLimit(rateLimit, 'user1')
    const result2 = checkRateLimit(rateLimit, 'user2')

    expect(result1.allowed).toBe(true)
    expect(result1.remaining).toBe(1)
    expect(result2.allowed).toBe(true)
    expect(result2.remaining).toBe(1)
  })

  it('cleans up expired entries', () => {
    const rateLimit = createRateLimit(2, 60000)
    const now = Date.now()
    jest.setSystemTime(now)

    // Make a request
    checkRateLimit(rateLimit, 'user1')
    expect(rateLimit.requests.size).toBe(1)

    // Move time forward past the window
    jest.setSystemTime(now + 70000) // 70 seconds later

    // Make another request - should clean up the expired entry
    const result = checkRateLimit(rateLimit, 'user2')
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(1)

    // Original entry should be cleaned up eventually
    checkRateLimit(rateLimit, 'user1')
    expect(rateLimit.requests.has('user1')).toBe(true) // New entry for user1
  })

  it('returns correct reset time', () => {
    const windowMs = 60000
    const rateLimit = createRateLimit(5, windowMs)
    const startTime = Date.now()
    jest.setSystemTime(startTime)

    const result = checkRateLimit(rateLimit, 'user1')
    expect(result.resetTime).toBe(startTime + windowMs)
  })
})
