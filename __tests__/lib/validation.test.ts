import {
  emailSchema,
  nameSchema,
  messageSchema,
  phoneSchema,
  contactFormSchema
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
      expect(result.error.errors[0].message).toBe('Please enter a valid email address')
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
      expect(emptyResult.error.errors[0].message).toBe('Name must be at least 2 characters')
    }

    const longName = 'a'.repeat(101)
    const longResult = nameSchema.safeParse(longName)
    expect(longResult.success).toBe(false)
    if (!longResult.success) {
      expect(longResult.error.errors[0].message).toBe('Name must be less than 100 characters')
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
      expect(emptyResult.error.errors[0].message).toBe('Message must be at least 10 characters')
    }

    const longMessage = 'a'.repeat(5001) // Changed from 1001 to 5001
    const longResult = messageSchema.safeParse(longMessage)
    expect(longResult.success).toBe(false)
    if (!longResult.success) {
      expect(longResult.error.errors[0].message).toBe('Message must be less than 5000 characters')
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
      message: 'This is a test message with enough characters'
    }
    expect(contactFormSchema.safeParse(validData).success).toBe(true)
  })

  it('validates form data without optional phone', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters'
    }
    expect(contactFormSchema.safeParse(validData).success).toBe(true)
  })

  it('rejects form data with invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'This is a test message'
    }
    expect(contactFormSchema.safeParse(invalidData).success).toBe(false)
  })

  it('rejects form data with missing required fields', () => {
    const invalidData = {
      email: 'john@example.com',
      message: 'This is a test message'
    }
    expect(contactFormSchema.safeParse(invalidData).success).toBe(false)
  })
})

