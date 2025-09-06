import { validateEnv, isSecureEnvironment } from '../../lib/env'

// Helper function to set environment variables in a test-safe way
function setEnvVar(key: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[key]
  } else {
    Object.defineProperty(process.env, key, {
      value,
      writable: true,
      configurable: true,
    })
  }
}

describe('lib/env.ts', () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    // Restore all environment variables
    Object.keys(process.env).forEach(key => {
      if (!(key in originalEnv)) {
        delete process.env[key]
      }
    })
    Object.keys(originalEnv).forEach(key => {
      setEnvVar(key, originalEnv[key])
    })
  })

  describe('validateEnv', () => {
    it('validates correct environment variables', () => {
      setEnvVar('NODE_ENV', 'development')
      expect(() => validateEnv()).not.toThrow()
    })

    it('validates production environment', () => {
      setEnvVar('NODE_ENV', 'production')
      expect(() => validateEnv()).not.toThrow()
    })

    it('validates test environment', () => {
      setEnvVar('NODE_ENV', 'test')
      expect(() => validateEnv()).not.toThrow()
    })

    it('handles optional email service variables', () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('EMAIL_FROM', 'test@example.com')
      setEnvVar('EMAIL_SERVICE', 'SendGrid')
      expect(() => validateEnv()).not.toThrow()
    })

    it('handles optional auth variables', () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('NEXTAUTH_SECRET', 'very-long-secret-key-for-nextauth-minimum-32-chars')
      setEnvVar('NEXTAUTH_URL', 'http://localhost:3000')
      expect(() => validateEnv()).not.toThrow()
    })

    it('throws error for invalid NODE_ENV', () => {
      setEnvVar('NODE_ENV', 'invalid')

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {
        throw new Error('process.exit called')
      }) as any)

      expect(() => validateEnv()).toThrow('process.exit called')
      expect(exitSpy).toHaveBeenCalledWith(1)

      exitSpy.mockRestore()
    })

    it('throws error for invalid email format', () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('EMAIL_FROM', 'invalid-email')

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => validateEnv()).toThrow('process.exit called')

      consoleSpy.mockRestore()
      exitSpy.mockRestore()
    })

    it('throws error for short NEXTAUTH_SECRET', () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('NEXTAUTH_SECRET', 'short')

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => validateEnv()).toThrow('process.exit called')

      consoleSpy.mockRestore()
      exitSpy.mockRestore()
    })

    it('throws error for invalid URL', () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('NEXTAUTH_URL', 'not-a-url')

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
      setEnvVar('NODE_ENV', 'production')
      expect(isSecureEnvironment()).toBe(true)
    })

    it('returns true for production VERCEL_ENV', () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('VERCEL_ENV', 'production')
      expect(isSecureEnvironment()).toBe(true)
    })

    it('returns false for development environment', () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('VERCEL_ENV', 'development')
      expect(isSecureEnvironment()).toBe(false)
    })

    it('returns false for test environment', () => {
      setEnvVar('NODE_ENV', 'test')
      expect(isSecureEnvironment()).toBe(false)
    })
  })
})
