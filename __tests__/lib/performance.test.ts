/**
 * @jest-environment jsdom
 */

import {
  initPerformanceMonitoring,
  trackCustomMetric,
  preloadImage,
  preloadCriticalResources,
  preventLayoutShift,
  observeElementIntersection,
  measureCustomTiming,
} from '@/lib/performance'

// Mock web-vitals with dynamic import support
const mockOnCLS = jest.fn()
const mockOnFCP = jest.fn()
const mockOnINP = jest.fn()
const mockOnLCP = jest.fn()
const mockOnTTFB = jest.fn()

jest.mock('web-vitals', () => ({
  onCLS: mockOnCLS,
  onFCP: mockOnFCP,
  onINP: mockOnINP,
  onLCP: mockOnLCP,
  onTTFB: mockOnTTFB,
}))

// Mock fetch
global.fetch = jest.fn()

describe('Performance Library', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
    // Enable performance monitoring for tests
    process.env.ENABLE_PERFORMANCE_MONITORING = 'true'
  })

  afterEach(() => {
    // Clean up environment variable
    delete process.env.ENABLE_PERFORMANCE_MONITORING
  })

  describe('initPerformanceMonitoring', () => {
    it('should initialize all web vitals metrics collection', async () => {
      await initPerformanceMonitoring()

      expect(mockOnCLS).toHaveBeenCalled()
      expect(mockOnFCP).toHaveBeenCalled()
      expect(mockOnINP).toHaveBeenCalled()
      expect(mockOnLCP).toHaveBeenCalled()
      expect(mockOnTTFB).toHaveBeenCalled()
    })

    it('should send metrics to analytics endpoint when callback is triggered', async () => {
      await initPerformanceMonitoring()

      // Get the callback function passed to onCLS
      const clsCallback = mockOnCLS.mock.calls[0][0]

      // Simulate metric callback
      const mockMetric = {
        name: 'CLS',
        value: 0.05,
        delta: 0.05,
        id: 'test-id',
        navigationType: 'navigate',
      }

      await clsCallback(mockMetric)

      expect(fetch).toHaveBeenCalledWith('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('"name":"CLS"'),
        keepalive: true,
      })
    })

    it('should handle fetch errors gracefully', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      await initPerformanceMonitoring()
      const clsCallback = mockOnCLS.mock.calls[0][0]
      const mockMetric = {
        name: 'CLS',
        value: 0.05,
        delta: 0.05,
        id: 'test-id',
        navigationType: 'navigate',
      }

      // Should not throw error or call console.warn (since we removed console statements)
      expect(() => clsCallback(mockMetric)).not.toThrow()
    })
  })

  describe('trackCustomMetric', () => {
    it('should send custom metric to analytics endpoint', async () => {
      await trackCustomMetric({ name: 'PageLoad', value: 1500, rating: 'good' })

      expect(fetch).toHaveBeenCalledWith('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('"name":"PageLoad"'),
        keepalive: true,
      })
    })

    it('should handle fetch errors in custom metrics', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      // Should not throw error or call console.warn (since we removed console statements)
      await expect(trackCustomMetric({ name: 'PageLoad', value: 1500 })).resolves.not.toThrow()
    })
  })

  describe('preloadImage', () => {
    it('should create link element with correct attributes', () => {
      const mockLink = {
        rel: '',
        as: '',
        href: '',
        setAttribute: jest.fn(),
      }

      const createElementSpy = jest
        .spyOn(document, 'createElement')
        .mockReturnValue(mockLink as any)
      const appendChildSpy = jest.spyOn(document.head, 'appendChild').mockImplementation()

      preloadImage('/test-image.jpg')

      expect(createElementSpy).toHaveBeenCalledWith('link')
      expect(mockLink.rel).toBe('preload')
      expect(mockLink.as).toBe('image')
      expect(mockLink.href).toBe('/test-image.jpg')
      expect(appendChildSpy).toHaveBeenCalledWith(mockLink)

      createElementSpy.mockRestore()
      appendChildSpy.mockRestore()
    })

    it('should set imageSizes when provided', () => {
      const mockLink = {
        rel: '',
        as: '',
        href: '',
        setAttribute: jest.fn(),
      }

      const createElementSpy = jest
        .spyOn(document, 'createElement')
        .mockReturnValue(mockLink as any)
      const appendChildSpy = jest.spyOn(document.head, 'appendChild').mockImplementation()

      preloadImage('/test-image.jpg', 'image', '(max-width: 768px) 100vw, 50vw')

      expect(mockLink.setAttribute).toHaveBeenCalledWith(
        'imagesizes',
        '(max-width: 768px) 100vw, 50vw'
      )

      createElementSpy.mockRestore()
      appendChildSpy.mockRestore()
    })
  })

  describe('preloadCriticalResources', () => {
    it('should preload multiple resources', () => {
      const createElementSpy = jest.spyOn(document, 'createElement')
      const appendChildSpy = jest.spyOn(document.head, 'appendChild').mockImplementation()

      const resources = [
        { href: '/styles.css', as: 'style' },
        { href: '/script.js', as: 'script' },
        { href: '/font.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      ]

      preloadCriticalResources(resources)

      expect(createElementSpy).toHaveBeenCalledTimes(3)
      expect(appendChildSpy).toHaveBeenCalledTimes(3)

      createElementSpy.mockRestore()
      appendChildSpy.mockRestore()
    })
  })

  describe('preventLayoutShift', () => {
    it('should set width and height on element', () => {
      const mockElement = {
        style: {},
      }

      preventLayoutShift(mockElement as any, 800, 600)

      expect(mockElement.style).toEqual({
        width: '800px',
        height: '600px',
        aspectRatio: '4 / 3',
      })
    })

    it('should set aspect ratio when dimensions are provided', () => {
      const mockElement = {
        style: {},
      }

      preventLayoutShift(mockElement as any, 16, 9, true)

      expect(mockElement.style).toEqual({
        width: '16px',
        height: '9px',
        aspectRatio: '16 / 9',
      })
    })
  })

  describe('observeElementIntersection', () => {
    let mockObserver: any
    let mockIntersectionObserver: jest.Mock

    beforeEach(() => {
      mockObserver = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }

      mockIntersectionObserver = jest.fn().mockImplementation(callback => {
        mockObserver.callback = callback
        return mockObserver
      })

      global.IntersectionObserver = mockIntersectionObserver
    })

    it('should create intersection observer and observe element', () => {
      const mockElement = document.createElement('div')
      const mockCallback = jest.fn()

      const cleanup = observeElementIntersection(mockElement, mockCallback)

      expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), undefined)
      expect(mockObserver.observe).toHaveBeenCalledWith(mockElement)
      expect(typeof cleanup).toBe('function')
    })

    it('should call callback when element intersects', () => {
      const mockElement = document.createElement('div')
      const mockCallback = jest.fn()

      observeElementIntersection(mockElement, mockCallback)

      // Simulate intersection
      const mockEntry = { isIntersecting: true, target: mockElement }
      mockObserver.callback([mockEntry])

      expect(mockCallback).toHaveBeenCalledWith(mockEntry)
    })

    it('should use custom options when provided', () => {
      const mockElement = document.createElement('div')
      const mockCallback = jest.fn()
      const customOptions = { threshold: 0.5, rootMargin: '10px' }

      observeElementIntersection(mockElement, mockCallback, customOptions)

      expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), customOptions)
    })
  })

  describe('measureCustomTiming', () => {
    let mockPerformance: any

    beforeEach(() => {
      mockPerformance = {
        mark: jest.fn(),
        measure: jest.fn(),
        getEntriesByName: jest.fn().mockReturnValue([{ duration: 1500 }]),
        clearMarks: jest.fn(),
        clearMeasures: jest.fn(),
      }

      // Delete existing performance object and replace with our mock
      delete (global as any).performance
      global.performance = mockPerformance
    })

    it('should measure timing between marks', () => {
      const result = measureCustomTiming('test-operation-start', 'test-operation-end')

      expect(mockPerformance.mark).toHaveBeenCalledWith('test-operation-start')
      expect(mockPerformance.mark).toHaveBeenCalledWith('test-operation-end')
      expect(mockPerformance.measure).toHaveBeenCalledWith(
        'test-operation-start-to-test-operation-end',
        'test-operation-start',
        'test-operation-end'
      )
      expect(mockPerformance.getEntriesByName).toHaveBeenCalledWith(
        'test-operation-start-to-test-operation-end',
        'measure'
      )
      expect(result).toBe(1500)
    })

    it('should clean up marks and measures', () => {
      measureCustomTiming('test-operation-start', 'test-operation-end')

      expect(mockPerformance.clearMarks).toHaveBeenCalledWith('test-operation-start')
      expect(mockPerformance.clearMarks).toHaveBeenCalledWith('test-operation-end')
      expect(mockPerformance.clearMeasures).toHaveBeenCalledWith(
        'test-operation-start-to-test-operation-end'
      )
    })

    it('should return null when performance API is not available', () => {
      global.performance = undefined as any

      const result = measureCustomTiming('start-mark', 'end-mark')

      expect(result).toBeNull()
    })

    it('should return null when measurement fails', () => {
      mockPerformance.getEntriesByName.mockReturnValue([])

      const result = measureCustomTiming('start-mark', 'end-mark')

      expect(result).toBeNull()
    })
  })

  describe('metric rating system', () => {
    it('should rate LCP correctly', async () => {
      await initPerformanceMonitoring()
      const lcpCallback = mockOnLCP.mock.calls[0][0]

      // Good LCP
      await lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'test',
        delta: 2000,
        entries: [],
        rating: 'good',
        navigationType: 'navigate',
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"rating":"good"'),
        })
      )

      // Poor LCP
      await lcpCallback({
        name: 'LCP',
        value: 5000,
        id: 'test',
        delta: 5000,
        entries: [],
        rating: 'poor',
        navigationType: 'navigate',
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"rating":"poor"'),
        })
      )
    })

    it('should rate INP correctly', async () => {
      await initPerformanceMonitoring()
      const inpCallback = mockOnINP.mock.calls[0][0]

      // Good INP
      await inpCallback({
        name: 'INP',
        value: 150,
        id: 'test',
        delta: 150,
        entries: [],
        rating: 'good',
        navigationType: 'navigate',
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"rating":"good"'),
        })
      )

      // Poor INP
      await inpCallback({
        name: 'INP',
        value: 600,
        id: 'test',
        delta: 600,
        entries: [],
        rating: 'poor',
        navigationType: 'navigate',
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"rating":"poor"'),
        })
      )
    })

    it('should rate CLS correctly', async () => {
      await initPerformanceMonitoring()
      const clsCallback = mockOnCLS.mock.calls[0][0]

      // Good CLS
      await clsCallback({
        name: 'CLS',
        value: 0.05,
        id: 'test',
        delta: 0.05,
        entries: [],
        rating: 'good',
        navigationType: 'navigate',
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"rating":"good"'),
        })
      )

      // Poor CLS
      await clsCallback({
        name: 'CLS',
        value: 0.3,
        id: 'test',
        delta: 0.3,
        entries: [],
        rating: 'poor',
        navigationType: 'navigate',
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"rating":"poor"'),
        })
      )
    })
  })
})
