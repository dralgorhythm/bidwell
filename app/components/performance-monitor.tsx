'use client'

import { useEffect } from 'react'
import { initPerformanceMonitoring, trackCustomMetric } from '@/lib/performance'

interface PerformanceMonitorProps {
  enableReporting?: boolean
  debug?: boolean
}

export default function PerformanceMonitor({
  enableReporting = true,
  debug = false,
}: PerformanceMonitorProps) {
  useEffect(() => {
    // Initialize performance monitoring
    if (enableReporting) {
      initPerformanceMonitoring()
    }

    // Track page load timing
    const trackPageLoad = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming

        if (navigation) {
          // Track Time to First Byte (TTFB)
          const ttfb = navigation.responseStart - navigation.requestStart
          trackCustomMetric('TTFB', ttfb)

          // Track DOM Content Loaded
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.responseStart
          trackCustomMetric('DCL', domContentLoaded)

          // Track Load Complete
          const loadComplete = navigation.loadEventEnd - navigation.responseStart
          trackCustomMetric('Load', loadComplete)

          if (debug) {
            // Performance metrics tracked in development mode
            // Could be displayed in dev tools or sent to monitoring
          }
        }
      }
    }

    // Track performance after page load
    if (document.readyState === 'complete') {
      trackPageLoad()
    } else {
      window.addEventListener('load', trackPageLoad)
    }

    // Track user interactions for FID optimization
    const trackInteraction = () => {
      const startTime = performance.now()

      requestIdleCallback(() => {
        const duration = performance.now() - startTime
        trackCustomMetric('Interaction', duration)

        if (debug && duration > 100) {
          // Slow interaction detected - could be reported to monitoring
        }
      })
    }

    // Add interaction listeners
    const interactionEvents = ['click', 'keydown', 'touchstart']
    interactionEvents.forEach(eventType => {
      document.addEventListener(eventType, trackInteraction, { passive: true })
    })

    // Cleanup function
    return () => {
      window.removeEventListener('load', trackPageLoad)
      interactionEvents.forEach(eventType => {
        document.removeEventListener(eventType, trackInteraction)
      })
    }
  }, [enableReporting, debug])

  // This component doesn't render anything visible
  return null
}
