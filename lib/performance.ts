// Performance monitoring library with proper SSR handling
// Dynamic import for web-vitals to prevent SSR issues

export interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
}

export interface PerformanceThresholds {
  LCP: { good: number; poor: number }
  INP: { good: number; poor: number }
  CLS: { good: number; poor: number }
  FCP: { good: number; poor: number }
  TTFB: { good: number; poor: number }
}

// Core Web Vitals thresholds based on Google's recommendations
export const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  LCP: { good: 2500, poor: 4000 }, // ms
  INP: { good: 200, poor: 500 }, // ms (replaces FID with new thresholds)
  CLS: { good: 0.1, poor: 0.25 }, // layout shift score
  FCP: { good: 1800, poor: 3000 }, // ms
  TTFB: { good: 800, poor: 1800 }, // ms
}

/**
 * Determine performance rating based on metric value and thresholds
 */
export function getMetricRating(
  metricName: keyof PerformanceThresholds,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = PERFORMANCE_THRESHOLDS[metricName]
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Format performance metric values for display
 */
export function formatMetricValue(metricName: string, value: number): string {
  if (metricName === 'CLS') {
    return value.toFixed(3)
  }
  return `${Math.round(value)}ms`
}

/**
 * Send performance metric to analytics endpoint
 */
export async function sendToAnalytics(metric: PerformanceMetric): Promise<void> {
  try {
    // Only send in production or when explicitly enabled
    if (process.env.NODE_ENV !== 'production' && !process.env.ENABLE_PERFORMANCE_MONITORING) {
      // Metric collected but not sent in development mode
      return
    }

    await fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
      keepalive: true, // Ensure metric is sent even if page is unloading
    })
  } catch {
    // Silently fail - don't impact user experience
    // Error tracking could be added here if needed
  }
}

/**
 * Initialize performance monitoring with Core Web Vitals
 * Uses dynamic imports to prevent SSR issues
 */
export async function initPerformanceMonitoring(): Promise<void> {
  try {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return
    }

    // Dynamic import to prevent SSR issues
    const webVitals = await import('web-vitals')
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = webVitals

    // Handle each Core Web Vital metric
    const handleMetric = (metric: {
      name: string
      value: number
      delta: number
      id: string
      navigationType?: string
    }) => {
      const performanceMetric: PerformanceMetric = {
        name: metric.name,
        value: metric.value,
        rating: getMetricRating(metric.name as keyof PerformanceThresholds, metric.value),
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType || 'unknown',
      }

      sendToAnalytics(performanceMetric)
    }

    // Register Core Web Vitals observers
    onCLS(handleMetric)
    onINP(handleMetric)
    onLCP(handleMetric)
    onFCP(handleMetric)
    onTTFB(handleMetric)
  } catch {
    // Failed to initialize performance monitoring
    // Silent fail to avoid impacting user experience
  }
}

/**
 * Performance observer for custom metrics
 */
export function createPerformanceObserver(
  entryTypes: string[],
  callback: (entries: PerformanceEntry[]) => void
): PerformanceObserver | null {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return null
  }

  try {
    const observer = new PerformanceObserver(list => {
      callback(list.getEntries())
    })

    observer.observe({ entryTypes })
    return observer
  } catch {
    // Failed to create performance observer - silent fail
    return null
  }
}

/**
 * Measure and report custom performance metrics
 */
export function measurePerformance(name: string, fn: () => void): void {
  if (typeof window === 'undefined' || !('performance' in window)) {
    fn()
    return
  }

  const startTime = performance.now()
  fn()
  const endTime = performance.now()

  const duration = endTime - startTime

  // Track slow operations in development (could be sent to analytics)
  if (process.env.NODE_ENV === 'development' && duration > 16) {
    // Slow operation detected - could be logged to monitoring service
  }
}

/**
 * Track custom performance metric
 */
export async function trackCustomMetric(name: string, value: number): Promise<void> {
  const customMetric: PerformanceMetric = {
    name,
    value,
    rating: 'good', // Custom metrics don't have predefined thresholds
    delta: value,
    id: `custom-${Date.now()}`,
    navigationType: 'custom',
  }

  await sendToAnalytics(customMetric)
}

/**
 * Preload images for better LCP
 */
export function preloadImage(src: string, imageSizes?: string): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src

  if (imageSizes) {
    link.setAttribute('imagesizes', imageSizes)
  }

  document.head.appendChild(link)
}

/**
 * Preload multiple critical resources
 */
export function preloadCriticalResources(
  resources: Array<{ href: string; as: string; type?: string }>
): void {
  if (typeof document === 'undefined') return

  resources.forEach(({ href, as, type }) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    if (as === 'font') link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * Prevent layout shifts by setting dimensions
 */
export function preventLayoutShift(
  element: HTMLElement,
  width: number,
  height: number,
  useAspectRatio?: boolean
): void {
  if (!element) return

  if (useAspectRatio) {
    element.style.width = `${width}px`
    element.style.height = `${height}px`
    element.style.aspectRatio = `${width}/${height}`
  } else {
    element.style.width = `${width}px`
    element.style.height = `${height}px`
  }
}

/**
 * Observe element intersection for lazy loading
 */
export function observeElementIntersection(
  element: Element,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !window.IntersectionObserver) return null

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry)
        observer.unobserve(entry.target)
      }
    })
  }, options)

  observer.observe(element)
  return observer
}

/**
 * Measure custom timing operations
 */
export function measureCustomTiming(operationName: string): number | null {
  if (typeof performance === 'undefined') return null

  try {
    const startMark = `${operationName}-start`
    const endMark = `${operationName}-end`
    const measureName = `${operationName}-duration`

    performance.mark(startMark)
    performance.mark(endMark)
    performance.measure(measureName, startMark, endMark)

    const entries = performance.getEntriesByName(measureName, 'measure')
    const duration = entries.length > 0 ? entries[0].duration : null

    // Cleanup
    performance.clearMarks(startMark)
    performance.clearMarks(endMark)
    performance.clearMeasures(measureName)

    return duration
  } catch {
    return null
  }
}

/**
 * Prevent Cumulative Layout Shift (CLS) utilities
 */
export const clsOptimizations = {
  // Reserve space for dynamic content
  reserveSpace: (width: number, height: number) => ({
    width,
    height,
    minHeight: height,
  }),

  // Stable container for async loaded content
  stableContainer: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
}
