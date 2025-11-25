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
          trackCustomMetric({
            name: 'TTFB',
            value: ttfb,
            category: 'navigation',
            label: 'page-load',
          })

          // Track DOM Content Loaded
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.responseStart
          trackCustomMetric({
            name: 'DCL',
            value: domContentLoaded,
            category: 'navigation',
            label: 'dom-content-loaded',
          })

          // Track Load Complete
          const loadComplete = navigation.loadEventEnd - navigation.responseStart
          trackCustomMetric({
            name: 'Load',
            value: loadComplete,
            category: 'navigation',
            label: 'load-complete',
          })

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
        trackCustomMetric({
          name: 'Interaction',
          value: duration,
          category: 'user-interaction',
          label: 'response-time',
        })

        if (debug && duration > 100) {
          // Slow interaction detected - could be reported to monitoring
        }
      })
    }

    // Add interaction listeners
    const interactionEvents = ['click', 'keydown', 'touchstart']
    for (const eventType of interactionEvents) {
      document.addEventListener(eventType, trackInteraction, { passive: true })
    }

    // Cleanup function
    return () => {
      window.removeEventListener('load', trackPageLoad)
      for (const eventType of interactionEvents) {
        document.removeEventListener(eventType, trackInteraction)
      }
    }
  }, [enableReporting, debug])

  // This component doesn't render anything visible
  return null
}
