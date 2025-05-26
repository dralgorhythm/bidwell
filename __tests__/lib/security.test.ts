import {
  generateCSRFToken,
  hashToken,
  verifyCSRFToken,
  getClientIP,
  getSecurityHeaders,
} from '../../lib/security'

describe('lib/security.ts', () => {
  describe('generateCSRFToken', () => {
    it('generates a 64-character hex token', () => {
      const token = generateCSRFToken()
      expect(token).toHaveLength(64)
      expect(token).toMatch(/^[a-f0-9]+$/)
    })

    it('generates unique tokens', () => {
      const token1 = generateCSRFToken()
      const token2 = generateCSRFToken()
      expect(token1).not.toBe(token2)
    })
  })

  describe('hashToken', () => {
    it('generates consistent hash for same input', () => {
      const token = 'test-token'
      const hash1 = hashToken(token)
      const hash2 = hashToken(token)
      expect(hash1).toBe(hash2)
    })

    it('generates different hashes for different inputs', () => {
      const token1 = 'test-token-1'
      const token2 = 'test-token-2'
      const hash1 = hashToken(token1)
      const hash2 = hashToken(token2)
      expect(hash1).not.toBe(hash2)
    })

    it('generates 64-character hex hash', () => {
      const token = 'test-token'
      const hash = hashToken(token)
      expect(hash).toHaveLength(64)
      expect(hash).toMatch(/^[a-f0-9]+$/)
    })
  })

  describe('verifyCSRFToken', () => {
    it('returns true for matching token and hash', () => {
      const token = 'test-token'
      const hash = hashToken(token)
      expect(verifyCSRFToken(token, hash)).toBe(true)
    })

    it('returns false for non-matching token and hash', () => {
      const token = 'test-token'
      const wrongHash = hashToken('different-token')
      expect(verifyCSRFToken(token, wrongHash)).toBe(false)
    })

    it('returns false for empty token', () => {
      const hash = hashToken('test-token')
      expect(verifyCSRFToken('', hash)).toBe(false)
    })

    it('returns false for empty hash', () => {
      const token = 'test-token'
      expect(verifyCSRFToken(token, '')).toBe(false)
    })

    it('returns false for null/undefined values', () => {
      expect(verifyCSRFToken(null as any, 'hash')).toBe(false)
      expect(verifyCSRFToken('token', null as any)).toBe(false)
    })
  })

  describe('getClientIP', () => {
    it('extracts IP from x-forwarded-for header', () => {
      const request = new Request('https://example.com', {
        headers: {
          'x-forwarded-for': '192.168.1.1, 10.0.0.1',
        },
      })
      expect(getClientIP(request)).toBe('192.168.1.1')
    })

    it('extracts IP from x-real-ip header when no x-forwarded-for', () => {
      const request = new Request('https://example.com', {
        headers: {
          'x-real-ip': '192.168.1.2',
        },
      })
      expect(getClientIP(request)).toBe('192.168.1.2')
    })

    it('extracts IP from cf-connecting-ip header when others missing', () => {
      const request = new Request('https://example.com', {
        headers: {
          'cf-connecting-ip': '192.168.1.3',
        },
      })
      expect(getClientIP(request)).toBe('192.168.1.3')
    })

    it('returns unknown when no IP headers present', () => {
      const request = new Request('https://example.com')
      expect(getClientIP(request)).toBe('unknown')
    })

    it('prioritizes x-forwarded-for over other headers', () => {
      const request = new Request('https://example.com', {
        headers: {
          'x-forwarded-for': '192.168.1.1',
          'x-real-ip': '192.168.1.2',
          'cf-connecting-ip': '192.168.1.3',
        },
      })
      expect(getClientIP(request)).toBe('192.168.1.1')
    })

    it('handles multiple IPs in x-forwarded-for', () => {
      const request = new Request('https://example.com', {
        headers: {
          'x-forwarded-for': '  192.168.1.1  ,  10.0.0.1  ,  172.16.0.1  ',
        },
      })
      expect(getClientIP(request)).toBe('192.168.1.1')
    })
  })

  describe('getSecurityHeaders', () => {
    it('returns all required security headers', () => {
      const headers = getSecurityHeaders()

      expect(headers).toHaveProperty('X-Content-Type-Options', 'nosniff')
      expect(headers).toHaveProperty('X-Frame-Options', 'DENY')
      expect(headers).toHaveProperty('X-XSS-Protection', '1; mode=block')
      expect(headers).toHaveProperty('Referrer-Policy', 'strict-origin-when-cross-origin')
      expect(headers).toHaveProperty('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      expect(headers).toHaveProperty('Pragma', 'no-cache')
      expect(headers).toHaveProperty('Expires', '0')
    })

    it('returns object with string values', () => {
      const headers = getSecurityHeaders()

      Object.values(headers).forEach(value => {
        expect(typeof value).toBe('string')
      })
    })

    it('includes cache prevention headers', () => {
      const headers = getSecurityHeaders()

      expect(headers['Cache-Control']).toContain('no-store')
      expect(headers['Cache-Control']).toContain('no-cache')
      expect(headers['Cache-Control']).toContain('must-revalidate')
      expect(headers['Pragma']).toBe('no-cache')
      expect(headers['Expires']).toBe('0')
    })
  })
})

