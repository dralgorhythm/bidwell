/**
 * Extended tests to improve coverage for performance.ts
 */
import { vi } from 'vitest'
import * as performance from '../../lib/performance'

describe('Additional Performance Tests', () => {
  // Save and mock window objects
  // biome-ignore lint/suspicious/noExplicitAny: Mocking global
  let originalWindow: any

  beforeEach(() => {
    originalWindow = { ...global.window }

    // Mock fetch
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    )

    // Mock performance reporting APIs
    global.window.performance = {
      mark: vi.fn(),
      measure: vi.fn(),
      getEntriesByName: vi.fn().mockReturnValue([{ duration: 100 }]),
      clearMarks: vi.fn(),
      clearMeasures: vi.fn(),
      // biome-ignore lint/suspicious/noExplicitAny: Mocking window performance
    } as any
  })

  afterEach(() => {
    // Restore original window
    global.window = originalWindow
    vi.clearAllMocks()
    // Restore document.createElement if it was mocked
    vi.restoreAllMocks()
  })

  describe('preloadImage edge cases', () => {
    it('handles different image sizes formats', () => {
      const mockLink = {
        rel: '',
        as: '',
        href: '',
        type: '',
        setAttribute: vi.fn(),
        getAttribute: vi.fn(),
      }

      const mockAppendChild = vi.fn()
      // biome-ignore lint/suspicious/noExplicitAny: Mocking DOM element
      const mockCreateElement = vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
      const originalAppendChild = document.head.appendChild
      document.head.appendChild = mockAppendChild

      // Test with imageSizes param
      performance.preloadImage('/test.webp', 'webp', '100vw')

      // Verify setAttribute was called with imagesizes
      expect(mockLink.setAttribute).toHaveBeenCalledWith('imagesizes', '100vw')
      expect(mockAppendChild).toHaveBeenCalledWith(mockLink)

      // Restore mocks
      mockCreateElement.mockRestore()
      document.head.appendChild = originalAppendChild
    })
  })

  describe('preventLayoutShift edge cases', () => {
    it('sets width and height with string values', () => {
      const element = document.createElement('div')

      performance.preventLayoutShift(element, '200px', '100px')

      expect(element.style.width).toBe('200px')
      expect(element.style.height).toBe('100px')
      expect(element.style.aspectRatio).toBe('2 / 1') // 200/100 = 2
    })

    it('handles numeric dimensions correctly', () => {
      const element = document.createElement('div')

      performance.preventLayoutShift(element, 300, 150)

      expect(element.style.width).toBe('300px')
      expect(element.style.height).toBe('150px')
      expect(element.style.aspectRatio).toBe('2 / 1') // 300/150 = 2
    })

    it('handles missing dimensions', () => {
      const element = document.createElement('div')

      performance.preventLayoutShift(element)

      expect(element.style.width).toBe('')
      expect(element.style.height).toBe('')
      expect(element.style.aspectRatio).toBe('')
    })
  })

  describe('observeElementIntersection edge cases', () => {
    it('returns a cleanup function that disconnects the observer', () => {
      const mockDisconnect = vi.fn()
      const mockObserve = vi.fn()

      // Mock IntersectionObserver
      global.IntersectionObserver = class MockIntersectionObserver {
        disconnect = mockDisconnect
        observe = mockObserve
        unobserve = vi.fn()
        root = null
        rootMargin = ''
        thresholds = []
        takeRecords = vi.fn(() => [])
      } as unknown as typeof IntersectionObserver

      const element = document.createElement('div')
      const callback = vi.fn()

      // Call the function
      const cleanup = performance.observeElementIntersection(element, callback)

      // Verify observation started
      expect(mockObserve).toHaveBeenCalledWith(element)

      // Call cleanup and verify disconnect
      cleanup()
      expect(mockDisconnect).toHaveBeenCalled()
    })

    it('handles custom threshold and rootMargin options', () => {
      // Mock IntersectionObserver constructor
      let capturedOptions: IntersectionObserverInit | undefined
      global.IntersectionObserver = class MockIntersectionObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()
        root = null
        rootMargin = ''
        thresholds = []
        takeRecords = vi.fn(() => [])

        constructor(_callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
          capturedOptions = options
        }
      } as unknown as typeof IntersectionObserver

      const element = document.createElement('div')
      const callback = vi.fn()
      const options = {
        threshold: 0.5,
        rootMargin: '10px',
      }

      // Call the function with options
      performance.observeElementIntersection(element, callback, options)

      // Verify constructor was called with options
      expect(capturedOptions).toEqual({
        threshold: 0.5,
        rootMargin: '10px',
      })
    })
  })

  describe('trackCustomMetric', () => {
    it('sends custom metric to analytics endpoint with all parameters', async () => {
      // Call trackCustomMetric with all params
      await performance.trackCustomMetric({
        name: 'test-metric',
        value: 123,
        rating: 'good',
        category: 'custom',
        label: 'test-label',
      })

      // Check that fetch was called with right params
      expect(fetch).toHaveBeenCalledWith(
        '/api/analytics/web-vitals',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.any(String),
        })
      )

      // Check the body contains all parameters
      const callBody = JSON.parse((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body)
      expect(callBody).toEqual(
        expect.objectContaining({
          name: 'test-metric',
          value: 123,
          rating: 'good',
          category: 'custom',
          label: 'test-label',
        })
      )
    })

    it('handles fetch errors gracefully', async () => {
      // Make fetch throw an error
      global.fetch = vi.fn().mockImplementation(() => {
        throw new Error('Network error')
      })

      // This should not throw
      await expect(
        performance.trackCustomMetric({ name: 'error-test', value: 100 })
      ).resolves.not.toThrow()
    })
  })

  describe('performance metrics rating', () => {
    it('categorizes FID metrics correctly', () => {
      const { getFIDRating } = performance

      expect(getFIDRating(90)).toBe('good')
      expect(getFIDRating(100)).toBe('good')
      expect(getFIDRating(200)).toBe('needs-improvement')
      expect(getFIDRating(300)).toBe('needs-improvement')
      expect(getFIDRating(400)).toBe('poor')
    })

    it('categorizes TTI metrics correctly', () => {
      const { getTTIRating } = performance

      expect(getTTIRating(2000)).toBe('good')
      expect(getTTIRating(3800)).toBe('good')
      expect(getTTIRating(5000)).toBe('needs-improvement')
      expect(getTTIRating(6000)).toBe('needs-improvement')
      expect(getTTIRating(8000)).toBe('poor')
    })

    it('categorizes FCP metrics correctly', () => {
      const { getFCPRating } = performance

      expect(getFCPRating(900)).toBe('good')
      expect(getFCPRating(1500)).toBe('good')
      expect(getFCPRating(2500)).toBe('needs-improvement')
      expect(getFCPRating(3000)).toBe('needs-improvement')
      expect(getFCPRating(4000)).toBe('poor')
    })
  })

  describe('measureCustomTiming with edge cases', () => {
    it('handles missing start mark', () => {
      // Mock measure to throw error (simulating missing mark)
      global.window.performance.measure = vi.fn().mockImplementation(() => {
        throw new Error(
          "Failed to execute 'measure' on 'Performance': The mark 'startMark' does not exist."
        )
      })

      const result = performance.measureCustomTiming('startMark', 'endMark')
      expect(result).toBeNull()
    })

    it('handles missing performance API', () => {
      // Remove performance API
      // biome-ignore lint/suspicious/noExplicitAny: Modifying global object
      ;(global.window as any).performance = undefined

      const result = performance.measureCustomTiming('startMark', 'endMark')
      expect(result).toBeNull()
    })

    it('returns null on exception', () => {
      // Make performance.measure throw an error
      global.window.performance.measure = vi.fn().mockImplementation(() => {
        throw new Error('Measurement error')
      })

      const result = performance.measureCustomTiming('startMark', 'endMark')
      expect(result).toBeNull()
    })
  })
})
