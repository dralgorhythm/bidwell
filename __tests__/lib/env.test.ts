// Import the module, but we'll mock the actual functions
import * as envModule from '../../lib/env'

// Create mocked versions of the functions
jest.mock('../../lib/env', () => {
  const originalModule = jest.requireActual('../../lib/env')
  return {
    ...originalModule,
    validateEnv: jest.fn(originalModule.validateEnv),
    isSecureEnvironment: jest.fn(originalModule.isSecureEnvironment)
  }
})

// Use the mocked functions
const { validateEnv, isSecureEnvironment } = envModule

describe('lib/env.ts', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('validateEnv', () => {
    it('validates correct environment variables', () => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'development',
        VERCEL_ENV: 'development',
        NEXT_PUBLIC_VERCEL_ENV: 'development',
      }

      expect(() => validateEnv()).not.toThrow()
    })

    it('validates production environment', () => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'production',
        VERCEL_ENV: 'production',
        NEXT_PUBLIC_VERCEL_ENV: 'production',
      }

      expect(() => validateEnv()).not.toThrow()
    })

    it('validates test environment', () => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'test',
      }

      expect(() => validateEnv()).not.toThrow()
    })

    it('handles optional email service variables', () => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'development',
        EMAIL_SERVICE_API_KEY: 'test-key',
        EMAIL_FROM: 'test@example.com',
        EMAIL_TO: 'contact@example.com',
      }

      expect(() => validateEnv()).not.toThrow()
    })

    it('handles optional auth variables', () => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'development',
        NEXTAUTH_SECRET: 'a'.repeat(32), // 32 character minimum
        NEXTAUTH_URL: 'https://example.com',
      }

      expect(() => validateEnv()).not.toThrow()
    })

    it('throws error for invalid NODE_ENV', () => {
      // Save original NODE_ENV
      const originalNodeEnv = process.env.NODE_ENV
      
      // Create a custom environment object for testing
      const mockEnv = { NODE_ENV: 'invalid' as any }

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => validateEnv()).toThrow('process.exit called')
      expect(consoleSpy).toHaveBeenCalledWith('❌ Invalid environment variables:')
      expect(exitSpy).toHaveBeenCalledWith(1)

      consoleSpy.mockRestore()
      exitSpy.mockRestore()
    })

    it('throws error for invalid email format', () => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'development',
        EMAIL_FROM: 'invalid-email',
      }

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => validateEnv()).toThrow('process.exit called')
      expect(consoleSpy).toHaveBeenCalledWith('❌ Invalid environment variables:')

      consoleSpy.mockRestore()
      exitSpy.mockRestore()
    })

    it('throws error for short NEXTAUTH_SECRET', () => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'development',
        NEXTAUTH_SECRET: 'short', // Less than 32 characters
      }

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => validateEnv()).toThrow('process.exit called')

      consoleSpy.mockRestore()
      exitSpy.mockRestore()
    })

    it('throws error for invalid URL', () => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'development',
        NEXTAUTH_URL: 'not-a-url',
      }

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => validateEnv()).toThrow('process.exit called')

      consoleSpy.mockRestore()
      exitSpy.mockRestore()
    })
  })

  describe('isSecureEnvironment', () => {
    it('returns true for production NODE_ENV', () => {
      process.env.NODE_ENV = 'production'
      expect(isSecureEnvironment()).toBe(true)
    })

    it('returns true for production VERCEL_ENV', () => {
      process.env.NODE_ENV = 'development'
      process.env.VERCEL_ENV = 'production'
      expect(isSecureEnvironment()).toBe(true)
    })

    it('returns false for development environment', () => {
      process.env.NODE_ENV = 'development'
      process.env.VERCEL_ENV = 'development'
      expect(isSecureEnvironment()).toBe(false)
    })

    it('returns false for test environment', () => {
      process.env.NODE_ENV = 'test'
      expect(isSecureEnvironment()).toBe(false)
    })
  })
})
