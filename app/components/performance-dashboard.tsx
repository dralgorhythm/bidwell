'use client'

import { useState, useEffect } from 'react'

interface PerformanceMetrics {
  lcp?: number
  inp?: number
  cls?: number
  fcp?: number
  ttfb?: number
}

interface PerformanceDashboardProps {
  showDetails?: boolean
  className?: string
}

function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    INP: { good: 200, poor: 500 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  }

  const threshold = thresholds[name as keyof typeof thresholds]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function formatMetricValue(name: string, value: number): string {
  if (name === 'CLS') {
    return value.toFixed(3)
  }
  return `${Math.round(value)}ms`
}

function getMetricColor(rating: string): string {
  switch (rating) {
    case 'good':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'needs-improvement':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'poor':
      return 'text-red-600 bg-red-50 border-red-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export default function PerformanceDashboard({
  showDetails = false,
  className = '',
}: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or if explicitly enabled
    const shouldShow =
      process.env.NODE_ENV === 'development' ||
      localStorage.getItem('showPerformanceDashboard') === 'true'
    setIsVisible(shouldShow)

    if (!shouldShow) return

    // Collect Core Web Vitals using dynamic imports to prevent SSR issues
    const initializeMetrics = async () => {
      try {
        const webVitals = await import('web-vitals')
        const { onCLS, onFCP, onINP, onLCP, onTTFB } = webVitals

        const handleMetric = (metric: { name: string; value: number }) => {
          setMetrics(prev => ({
            ...prev,
            [metric.name.toLowerCase()]: metric.value,
          }))
        }

        // Initialize metric collection
        onCLS(handleMetric)
        onFCP(handleMetric)
        onINP(handleMetric)
        onLCP(handleMetric)
        onTTFB(handleMetric)
      } catch {
        // Failed to load web-vitals - silent fail
      }
    }

    initializeMetrics()

    // Toggle visibility with keyboard shortcut (Ctrl/Cmd + Shift + P)
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'P') {
        event.preventDefault()
        setIsVisible(prev => {
          const newValue = !prev
          localStorage.setItem('showPerformanceDashboard', newValue.toString())
          return newValue
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isVisible) return null

  const metricDisplays = [
    {
      name: 'LCP',
      label: 'Largest Contentful Paint',
      value: metrics.lcp,
      description: 'Loading performance',
    },
    {
      name: 'INP',
      label: 'Interaction to Next Paint',
      value: metrics.inp,
      description: 'Interactivity',
    },
    {
      name: 'CLS',
      label: 'Cumulative Layout Shift',
      value: metrics.cls,
      description: 'Visual stability',
    },
    {
      name: 'FCP',
      label: 'First Contentful Paint',
      value: metrics.fcp,
      description: 'Loading performance',
    },
    {
      name: 'TTFB',
      label: 'Time to First Byte',
      value: metrics.ttfb,
      description: 'Server response',
    },
  ]

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>Core Web Vitals</h3>
          <button
            onClick={() => {
              setIsVisible(false)
              localStorage.setItem('showPerformanceDashboard', 'false')
            }}
            className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            aria-label='Close performance dashboard'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        <div className='space-y-2'>
          {metricDisplays.map(({ name, label, value, description }) => {
            if (value === undefined) return null

            const rating = getMetricRating(name, value)
            const colorClass = getMetricColor(rating)

            return (
              <div key={name} className={`px-2 py-1 rounded border ${colorClass}`}>
                <div className='flex items-center justify-between'>
                  <span className='text-xs font-medium'>{name}</span>
                  <span className='text-xs font-mono'>{formatMetricValue(name, value)}</span>
                </div>
                {showDetails && (
                  <div className='text-xs opacity-75 mt-1'>
                    {label} - {description}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
          Press Ctrl/Cmd + Shift + P to toggle
        </div>
      </div>
    </div>
  )
}
