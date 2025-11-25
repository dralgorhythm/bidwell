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
 * Get rating for First Contentful Paint (FCP)
 * Good: ≤ 1500ms
 * Needs Improvement: > 1500ms and ≤ 3000ms
 * Poor: > 3000ms
 */
export function getFCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
  if (value <= 1500) return 'good'
  if (value <= 3000) return 'needs-improvement'
  return 'poor'
}

/**
 * Get rating for First Input Delay (FID)
 * Good: ≤ 100ms
 * Needs Improvement: > 100ms and ≤ 300ms
 * Poor: > 300ms
 */
export function getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
  if (value <= 100) return 'good'
  if (value <= 300) return 'needs-improvement'
  return 'poor'
}

/**
 * Get rating for Time to Interactive (TTI)
 * Good: ≤ 3800ms
 * Needs Improvement: > 3800ms and ≤ 7000ms
 * Poor: > 7000ms
 */
export function getTTIRating(value: number): 'good' | 'needs-improvement' | 'poor' {
  if (value <= 3800) return 'good'
  if (value <= 7000) return 'needs-improvement'
  return 'poor'
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

    // For static export builds, skip API calls since they won't be available
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true') {
      // In static export mode, you could:
      // - Send to external analytics service (Google Analytics, etc.)
      // - Store in localStorage for client-side analytics
      // - Skip server-side tracking entirely
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
export function measurePerformance(_name: string, fn: () => void): void {
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
export async function trackCustomMetric({
  name,
  value,
  rating = 'good',
  category = 'custom',
  label = '',
}: {
  name: string
  value: number
  rating?: 'good' | 'needs-improvement' | 'poor'
  category?: string
  label?: string
}): Promise<void> {
  try {
    const customMetric = {
      name,
      value,
      rating,
      category,
      label,
      delta: value,
      id: `custom-${Date.now()}`,
      navigationType: 'custom',
    }

    // For static export builds, skip API calls since they won't be available
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true') {
      // In static export mode, you could:
      // - Send to external analytics service (Google Analytics, etc.)
      // - Store in localStorage for client-side analytics
      // - Skip server-side tracking entirely
      return
    }

    await fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customMetric),
      keepalive: true,
    })
  } catch {
    // Silently fail - don't impact user experience
  }
}

/**
 * Preload images for better LCP
 */
export function preloadImage(src: string, type?: string, imageSizes?: string): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src

  if (type) {
    link.type = `image/${type}`
  }

  if (imageSizes) {
    // Use setAttribute for imagesizes as expected by tests
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

  for (const { href, as, type } of resources) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    if (as === 'font') link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }
}

/**
 * Prevent layout shifts by setting dimensions
 */
export function preventLayoutShift(
  element: HTMLElement,
  width?: number | string,
  height?: number | string,
  useAspectRatio?: boolean
): void {
  if (!element) return

  if (width === undefined || height === undefined) {
    // Handle missing dimensions by setting empty values
    element.style.width = ''
    element.style.height = ''
    element.style.aspectRatio = ''
    return
  }

  // Convert numbers to pixels
  const widthValue = typeof width === 'number' ? `${width}px` : width
  const heightValue = typeof height === 'number' ? `${height}px` : height

  // Calculate aspect ratio from numeric values with simplification
  let aspectRatio = ''
  if (typeof width === 'number' && typeof height === 'number' && height > 0) {
    // Find GCD to simplify the ratio
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const divisor = gcd(width, height)
    aspectRatio = `${width / divisor} / ${height / divisor}`
  }
  // Calculate from string values
  else if (typeof width === 'string' && typeof height === 'string') {
    // Extract numeric values from strings like "200px"
    const widthNum = Number.parseInt(width, 10)
    const heightNum = Number.parseInt(height, 10)
    if (!Number.isNaN(widthNum) && !Number.isNaN(heightNum) && heightNum > 0) {
      // Find GCD to simplify the ratio
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      const divisor = gcd(widthNum, heightNum)
      aspectRatio = `${widthNum / divisor} / ${heightNum / divisor}`
    }
  }

  element.style.width = widthValue
  element.style.height = heightValue

  if (useAspectRatio !== false && aspectRatio) {
    element.style.aspectRatio = aspectRatio
  }
}

/**
 * Observe element intersection for lazy loading
 */
export function observeElementIntersection(
  element: Element,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): () => void {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    return () => {} // Return a no-op function if not supported
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        callback(entry)
        observer.unobserve(entry.target)
      }
    }
  }, options)

  // Check if observer has observe method (for mocked scenarios)
  if (observer && typeof observer.observe === 'function') {
    observer.observe(element)
  }

  // Return a cleanup function that disconnects the observer
  return () => {
    if (observer && typeof observer.disconnect === 'function') {
      observer.disconnect()
    }
  }
}

/**
 * Measure custom timing operations
 */
export function measureCustomTiming(startMark: string, endMark: string): number | null {
  if (typeof window === 'undefined' || !window.performance) return null

  try {
    const measureName = `${startMark}-to-${endMark}`

    // Create marks
    window.performance.mark(startMark)
    window.performance.mark(endMark)

    // Measure between the marks
    window.performance.measure(measureName, startMark, endMark)

    const entries = window.performance.getEntriesByName(measureName, 'measure')
    const duration = entries.length > 0 ? entries[0].duration : null

    // Cleanup
    window.performance.clearMarks(startMark)
    window.performance.clearMarks(endMark)
    window.performance.clearMeasures(measureName)

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
