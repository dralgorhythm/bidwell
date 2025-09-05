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

  beforeEach(() => {
    // Clear the module cache to ensure fresh imports
    jest.resetModules()
  })

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
    it('validates correct environment variables', async () => {
      setEnvVar('NODE_ENV', 'development')
      const { validateEnv } = await import('../../lib/env')
      expect(() => validateEnv()).not.toThrow()
    })

    it('validates production environment', async () => {
      setEnvVar('NODE_ENV', 'production')
      const { validateEnv } = await import('../../lib/env')
      expect(() => validateEnv()).not.toThrow()
    })

    it('validates test environment', async () => {
      setEnvVar('NODE_ENV', 'test')
      const { validateEnv } = await import('../../lib/env')
      expect(() => validateEnv()).not.toThrow()
    })

    it('handles optional email service variables', async () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('EMAIL_FROM', 'test@example.com')
      setEnvVar('EMAIL_SERVICE', 'SendGrid')
      const { validateEnv } = await import('../../lib/env')
      expect(() => validateEnv()).not.toThrow()
    })

    it('handles optional auth variables', async () => {
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('NEXTAUTH_SECRET', 'very-long-secret-key-for-nextauth-minimum-32-chars')
      setEnvVar('NEXTAUTH_URL', 'http://localhost:3000')
      const { validateEnv } = await import('../../lib/env')
      expect(() => validateEnv()).not.toThrow()
    })

    it('throws error for invalid NODE_ENV', async () => {
      // Set NODE_ENV to development to avoid validation during import
      setEnvVar('NODE_ENV', 'development')
      
      // Clear cache and import the module
      const envModulePath = require.resolve('../../lib/env')
      delete require.cache[envModulePath]
      const envModule = await import('../../lib/env')
      
      // Now change NODE_ENV to invalid for the test
      setEnvVar('NODE_ENV', 'invalid')
      
      // Mock process.exit to throw instead of exiting
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })
      
      // Test that validateEnv throws the expected error
      expect(() => envModule.validateEnv()).toThrow('process.exit called')
      
      // Verify process.exit was called with code 1
      expect(exitSpy).toHaveBeenCalledWith(1)

      // Clean up
      exitSpy.mockRestore()
    })

    it('throws error for invalid email format', async () => {
      // Set NODE_ENV to development to avoid validation during import
      setEnvVar('NODE_ENV', 'development')
      
      // Clear cache and import the module
      const envModulePath = require.resolve('../../lib/env')
      delete require.cache[envModulePath]
      const envModule = await import('../../lib/env')
      
      // Set invalid email after import
      setEnvVar('EMAIL_FROM', 'invalid-email')

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => envModule.validateEnv()).toThrow('process.exit called')
      expect(exitSpy).toHaveBeenCalledWith(1)

      exitSpy.mockRestore()
    })

    it('throws error for short NEXTAUTH_SECRET', async () => {
      // Set NODE_ENV to development to avoid validation during import
      setEnvVar('NODE_ENV', 'development')
      
      // Clear cache and import the module
      const envModulePath = require.resolve('../../lib/env')
      delete require.cache[envModulePath]
      const envModule = await import('../../lib/env')
      
      // Set invalid NEXTAUTH_SECRET after import
      setEnvVar('NEXTAUTH_SECRET', 'short')

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => envModule.validateEnv()).toThrow('process.exit called')
      expect(exitSpy).toHaveBeenCalledWith(1)

      exitSpy.mockRestore()
    })

    it('throws error for invalid URL', async () => {
      // Set NODE_ENV to development to avoid validation during import
      setEnvVar('NODE_ENV', 'development')
      
      // Clear cache and import the module
      const envModulePath = require.resolve('../../lib/env')
      delete require.cache[envModulePath]
      const envModule = await import('../../lib/env')
      
      // Set invalid URL after import
      setEnvVar('NEXTAUTH_URL', 'not-a-url')

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called')
      })

      expect(() => envModule.validateEnv()).toThrow('process.exit called')
      expect(exitSpy).toHaveBeenCalledWith(1)

      exitSpy.mockRestore()
    })
  })

  describe('isSecureEnvironment', () => {
    it('returns true for production NODE_ENV', async () => {
      // Set to development first to avoid module validation, then import
      setEnvVar('NODE_ENV', 'development')
      const envModulePath = require.resolve('../../lib/env')
      delete require.cache[envModulePath]
      const envModule = await import('../../lib/env')
      
      // Now change to production for the test
      setEnvVar('NODE_ENV', 'production')
      expect(envModule.isSecureEnvironment()).toBe(true)
    })

    it('returns true for production VERCEL_ENV', async () => {
      // Set to development first to avoid module validation, then import  
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('VERCEL_ENV', 'production')
      const envModulePath = require.resolve('../../lib/env')
      delete require.cache[envModulePath]
      const envModule = await import('../../lib/env')
      expect(envModule.isSecureEnvironment()).toBe(true)
    })

    it('returns false for development environment', async () => {
      // Set to development first to avoid module validation, then import
      setEnvVar('NODE_ENV', 'development')
      setEnvVar('VERCEL_ENV', 'development')
      const envModulePath = require.resolve('../../lib/env')
      delete require.cache[envModulePath]
      const envModule = await import('../../lib/env')
      expect(envModule.isSecureEnvironment()).toBe(false)
    })

    it('returns false for test environment', async () => {
      // Set to development first to avoid module validation, then import
      setEnvVar('NODE_ENV', 'development')
      const envModulePath = require.resolve('../../lib/env')
      delete require.cache[envModulePath]
      const envModule = await import('../../lib/env')
      
      // Now change to test for the actual test
      setEnvVar('NODE_ENV', 'test')
      expect(envModule.isSecureEnvironment()).toBe(false)
    })
  })
})
