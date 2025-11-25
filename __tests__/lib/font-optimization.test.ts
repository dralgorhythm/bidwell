import {
  addFontSizeAdjustments,
  CRITICAL_FONT_SUBSET,
  getFontLoadingStrategy,
  initializeFontOptimization,
  optimizeFontDisplay,
  preloadCriticalFontSubset,
  preloadFonts,
  waitForFontsReady,
} from '../../lib/font-optimization'

describe('Font Optimization', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'fonts', {
      value: {
        ready: Promise.resolve(),
        check: vi.fn().mockReturnValue(true),
      },
      writable: true,
    })
  })

  let mockCreateElement: ReturnType<typeof vi.fn>
  let mockAppendChild: ReturnType<typeof vi.fn>
  let createdElements: unknown[]

  // biome-ignore lint/suspicious/noDuplicateTestHooks: Necessary for specific setup
  beforeEach(() => {
    // console.log('document.fonts:', (document as any).fonts)
    createdElements = []
    mockAppendChild = vi.fn()
    mockCreateElement = jest.fn().mockImplementation(tag => {
      const element = {
        tagName: tag.toUpperCase(),
        rel: '',
        as: '',
        href: '',
        type: '',
        crossOrigin: '',
        textContent: '',
        addEventListener: jest.fn(),
      }
      createdElements.push(element)
      return element
    })

    // Mock document with JSDOM-compatible methods
    Object.defineProperty(global, 'document', {
      value: {
        createElement: mockCreateElement,
        head: { appendChild: mockAppendChild },
        fonts: { ready: Promise.resolve() },
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      writable: true,
      configurable: true,
    })
  })

  describe('preloadFonts', () => {
    it('creates preload link elements for each font', () => {
      const fonts = [
        { href: '/fonts/font1.woff2', crossOrigin: 'anonymous' as const },
        { href: '/fonts/font2.woff2', type: 'font/woff2' },
      ]

      preloadFonts(fonts)

      expect(mockCreateElement).toHaveBeenCalledTimes(2)
      expect(mockCreateElement).toHaveBeenCalledWith('link')
      expect(mockAppendChild).toHaveBeenCalledTimes(2)
    })

    it('sets correct attributes on link elements', () => {
      const fonts = [{ href: '/fonts/font1.woff2' }]

      preloadFonts(fonts)

      expect(mockAppendChild).toHaveBeenCalled()
      const linkElement = mockAppendChild.mock.calls[0][0]
      expect(linkElement.rel).toBe('preload')
      expect(linkElement.as).toBe('font')
      expect(linkElement.href).toBe('/fonts/font1.woff2')
      expect(linkElement.type).toBe('font/woff2')
    })
  })

  describe('optimizeFontDisplay', () => {
    it('creates a style element with font-display rules', () => {
      optimizeFontDisplay()

      expect(mockCreateElement).toHaveBeenCalledWith('style')
      expect(mockAppendChild).toHaveBeenCalled()

      const styleElement = mockAppendChild.mock.calls[0][0]
      expect(styleElement.textContent).toContain('font-display: swap')
      expect(styleElement.textContent).toContain('GeistSans')
      expect(styleElement.textContent).toContain('GeistMono')
    })
  })

  describe('waitForFontsReady', () => {
    it('resolves when document.fonts.ready resolves', async () => {
      await expect(waitForFontsReady()).resolves.not.toThrow()
    })

    it('resolves immediately when fonts API not available', async () => {
      // Remove fonts property
      const tempFonts = document.fonts
      ;(document as unknown as { fonts: undefined }).fonts = undefined

      await expect(waitForFontsReady()).resolves.not.toThrow()

      // Restore fonts property
      Object.defineProperty(document, 'fonts', {
        value: tempFonts,
        configurable: true,
      })
    })

    it('handles rejected promises gracefully', async () => {
      // Make document.fonts.ready reject
      const originalReady = document.fonts.ready
      const rejectedPromise = Promise.reject('Font error')
      // Suppress the unhandled rejection warning
      rejectedPromise.catch(() => {})

      Object.defineProperty(document.fonts, 'ready', {
        value: rejectedPromise,
        configurable: true,
      })

      await expect(waitForFontsReady()).resolves.not.toThrow()

      // Restore original ready property
      Object.defineProperty(document.fonts, 'ready', {
        value: originalReady,
        configurable: true,
      })
    })
  })

  describe('addFontSizeAdjustments', () => {
    it('creates style element with font-face size adjustments', () => {
      addFontSizeAdjustments()

      expect(mockCreateElement).toHaveBeenCalledWith('style')
      expect(mockAppendChild).toHaveBeenCalled()

      const styleElement = mockAppendChild.mock.calls[0][0]
      expect(styleElement.textContent).toContain('size-adjust')
      expect(styleElement.textContent).toContain('ascent-override')
      expect(styleElement.textContent).toContain('GeistSans-fallback')
      expect(styleElement.textContent).toContain('GeistMono-fallback')
    })
  })

  describe('getFontLoadingStrategy', () => {
    it('returns default strategy when connection info unavailable', () => {
      // Navigator without connection info
      Object.defineProperty(global, 'navigator', {
        value: {},
        writable: true,
      })

      expect(getFontLoadingStrategy()).toBe('swap')
    })

    it('returns optional for slow connections', () => {
      // Mock slow connection
      Object.defineProperty(global, 'navigator', {
        value: {
          connection: { effectiveType: 'slow-2g' },
        },
        writable: true,
      })

      expect(getFontLoadingStrategy()).toBe('optional')

      // Change to 2g
      Object.defineProperty(global.navigator, 'connection', {
        value: { effectiveType: '2g' },
        writable: true,
      })

      expect(getFontLoadingStrategy()).toBe('optional')
    })

    it('returns fallback for medium speed connections', () => {
      // Mock 3g connection
      Object.defineProperty(global, 'navigator', {
        value: {
          connection: { effectiveType: '3g' },
        },
        writable: true,
      })

      expect(getFontLoadingStrategy()).toBe('fallback')
    })
  })

  describe('initializeFontOptimization', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })
    it('calls all required font optimization functions', async () => {
      // Since the functions modify document, we'll test that document methods are called
      // which indicates the functions were executed

      initializeFontOptimization()

      // Should call createElement for both style elements (optimize and adjust)
      expect(mockCreateElement).toHaveBeenCalledWith('style')
      expect(mockCreateElement).toHaveBeenCalledTimes(2)
      expect(mockAppendChild).toHaveBeenCalledTimes(2)
    })
  })

  describe('preloadCriticalFontSubset', () => {
    it('creates preload link for critical font subset', () => {
      preloadCriticalFontSubset('/fonts/critical.woff2')

      expect(mockCreateElement).toHaveBeenCalledWith('link')
      expect(mockAppendChild).toHaveBeenCalled()

      const linkElement = mockAppendChild.mock.calls[0][0]
      expect(linkElement.rel).toBe('preload')
      expect(linkElement.as).toBe('font')
      expect(linkElement.href).toContain('/fonts/critical.woff2?subset=')
      expect(linkElement.crossOrigin).toBe('anonymous')
    })
  })

  describe('CRITICAL_FONT_SUBSET', () => {
    it('contains essential characters', () => {
      expect(CRITICAL_FONT_SUBSET).toContain('A')
      expect(CRITICAL_FONT_SUBSET).toContain('z')
      expect(CRITICAL_FONT_SUBSET).toContain('0')
      expect(CRITICAL_FONT_SUBSET).toContain('?')
    })
  })
})
