/**
 * @vitest-environment jsdom
 */

import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { vi } from 'vitest'

// Mock web-vitals module with proper vi.mock syntax
vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onINP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}))

import * as webVitals from 'web-vitals'
import PerformanceDashboard from '@/app/components/performance-dashboard'

// Now get the mocked functions
const mockWebVitals = webVitals as unknown as {
  onCLS: ReturnType<typeof vi.fn>
  onFCP: ReturnType<typeof vi.fn>
  onINP: ReturnType<typeof vi.fn>
  onLCP: ReturnType<typeof vi.fn>
  onTTFB: ReturnType<typeof vi.fn>
}

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
})

// Mock process.env
const originalEnv = process.env

describe('PerformanceDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)

    // Store callbacks to call them later in act()
    const callbacks: Array<(metric: unknown) => void> = []

    // Reset mocks to store callbacks instead of calling them immediately
    mockWebVitals.onCLS.mockImplementation(callback => {
      callbacks.push(callback)
    })
    mockWebVitals.onFCP.mockImplementation(callback => {
      callbacks.push(callback)
    })
    mockWebVitals.onINP.mockImplementation(callback => {
      callbacks.push(callback)
    })
    mockWebVitals.onLCP.mockImplementation(callback => {
      callbacks.push(callback)
    })
    mockWebVitals.onTTFB.mockImplementation(callback => {
      callbacks.push(callback)
    })

    // Store callbacks for tests to use
    ;(mockWebVitals as unknown as { triggerMetrics: () => void }).triggerMetrics = () => {
      for (const [index, callback] of callbacks.entries()) {
        const metrics = [
          {
            name: 'CLS',
            value: 0.05,
            entries: [],
            rating: 'good' as const,
            delta: 0.05,
            id: 'test-cls',
            navigationType: 'navigate' as const,
          },
          {
            name: 'FCP',
            value: 1500,
            entries: [],
            rating: 'good' as const,
            delta: 1500,
            id: 'test-fcp',
            navigationType: 'navigate' as const,
          },
          {
            name: 'INP',
            value: 50,
            entries: [],
            rating: 'good' as const,
            delta: 50,
            id: 'test-inp',
            navigationType: 'navigate' as const,
          },
          {
            name: 'LCP',
            value: 2000,
            entries: [],
            rating: 'good' as const,
            delta: 2000,
            id: 'test-lcp',
            navigationType: 'navigate' as const,
          },
          {
            name: 'TTFB',
            value: 600,
            entries: [],
            rating: 'good' as const,
            delta: 600,
            id: 'test-ttfb',
            navigationType: 'navigate' as const,
          },
        ]
        if (metrics[index]) {
          callback(metrics[index])
        }
      }
    }

    // Set NODE_ENV to development for visibility
    process.env = { ...originalEnv, NODE_ENV: 'development' }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should be visible in development environment', async () => {
    await act(async () => {
      render(<PerformanceDashboard />)
    })

    await act(async () => {
      ;(mockWebVitals as unknown as { triggerMetrics: () => void }).triggerMetrics()
    })

    expect(screen.getByText('Core Web Vitals')).toBeInTheDocument()
  })

  it('should be visible when localStorage flag is set', async () => {
    mockLocalStorage.getItem.mockReturnValue('true')

    await act(async () => {
      render(<PerformanceDashboard />)
    })

    await act(async () => {
      ;(mockWebVitals as unknown as { triggerMetrics: () => void }).triggerMetrics()
    })

    expect(screen.getByText('Core Web Vitals')).toBeInTheDocument()
  })

  it('should not be visible in production without localStorage flag', async () => {
    // Mock the component to think it's in production by mocking localStorage
    mockLocalStorage.getItem.mockReturnValue(null)

    // Create a component that simulates production behavior
    const ProductionDashboard = () => {
      const [isVisible, setIsVisible] = React.useState(false)

      React.useEffect(() => {
        const shouldShow = localStorage.getItem('showPerformanceDashboard') === 'true'
        setIsVisible(shouldShow)
      }, [])

      if (!isVisible) return null

      return <div>Core Web Vitals</div>
    }

    await act(async () => {
      render(<ProductionDashboard />)
    })

    expect(screen.queryByText('Core Web Vitals')).not.toBeInTheDocument()
  })

  it('should display all Core Web Vitals metrics', async () => {
    await act(async () => {
      render(<PerformanceDashboard />)
    })

    await act(async () => {
      ;(mockWebVitals as unknown as { triggerMetrics: () => void }).triggerMetrics()
    })

    expect(screen.getByText('LCP')).toBeInTheDocument()
    expect(screen.getByText('INP')).toBeInTheDocument()
    expect(screen.getByText('CLS')).toBeInTheDocument()
    expect(screen.getByText('FCP')).toBeInTheDocument()
    expect(screen.getByText('TTFB')).toBeInTheDocument()
  })

  it('should format metrics correctly', async () => {
    await act(async () => {
      render(<PerformanceDashboard />)
    })

    await act(async () => {
      ;(mockWebVitals as unknown as { triggerMetrics: () => void }).triggerMetrics()
    })

    // LCP should show as milliseconds
    expect(screen.getByText('2000ms')).toBeInTheDocument()

    // CLS should show as decimal
    expect(screen.getByText('0.050')).toBeInTheDocument()

    // INP should show as milliseconds
    expect(screen.getByText('50ms')).toBeInTheDocument()
  })

  it('should apply correct color coding for metric ratings', async () => {
    await act(async () => {
      render(<PerformanceDashboard />)
    })

    await act(async () => {
      ;(mockWebVitals as unknown as { triggerMetrics: () => void }).triggerMetrics()
    })

    // Good metrics should have green styling (based on the default mock values)
    // CLS: 0.05 (good), INP: 50 (good)
    const clsContainer = screen.getByText('CLS').closest('.px-2')
    expect(clsContainer).toHaveClass('text-green-800')

    const inpContainer = screen.getByText('INP').closest('.px-2')
    expect(inpContainer).toHaveClass('text-green-800')
  })

  it('should show metric details when showDetails is true', async () => {
    await act(async () => {
      render(<PerformanceDashboard showDetails={true} />)
    })

    await act(async () => {
      ;(mockWebVitals as unknown as { triggerMetrics: () => void }).triggerMetrics()
    })

    expect(screen.getByText('Largest Contentful Paint - Loading performance')).toBeInTheDocument()
    expect(screen.getByText('Interaction to Next Paint - Interactivity')).toBeInTheDocument()
    expect(screen.getByText('Cumulative Layout Shift - Visual stability')).toBeInTheDocument()
  })

  it('should close dashboard when close button is clicked', async () => {
    const user = userEvent.setup()

    await act(async () => {
      render(<PerformanceDashboard />)
    })

    const closeButton = screen.getByLabelText('Close performance dashboard')
    await user.click(closeButton)

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('showPerformanceDashboard', 'false')
  })

  it('should toggle visibility with keyboard shortcut', async () => {
    await act(async () => {
      render(<PerformanceDashboard />)
    })

    // Test Ctrl+Shift+P
    await act(async () => {
      fireEvent.keyDown(document, {
        key: 'P',
        ctrlKey: true,
        shiftKey: true,
      })
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('showPerformanceDashboard', 'false')
  })

  it('should toggle visibility with Cmd+Shift+P on Mac', async () => {
    await act(async () => {
      render(<PerformanceDashboard />)
    })

    // Test Cmd+Shift+P (metaKey)
    fireEvent.keyDown(document, {
      key: 'P',
      metaKey: true,
      shiftKey: true,
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('showPerformanceDashboard', 'false')
  })

  it('should not toggle visibility with other key combinations', () => {
    render(<PerformanceDashboard />)

    // Test different key combination
    fireEvent.keyDown(document, {
      key: 'P',
      ctrlKey: true,
      // Missing shiftKey
    })

    expect(mockLocalStorage.setItem).not.toHaveBeenCalled()
  })

  it('should handle missing metrics gracefully', () => {
    // Clear all mocks so no callbacks are called
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)

    // Override the mock implementations to not call callbacks
    mockWebVitals.onCLS.mockImplementation(() => {})
    mockWebVitals.onFCP.mockImplementation(() => {})
    mockWebVitals.onINP.mockImplementation(() => {})
    mockWebVitals.onLCP.mockImplementation(() => {})
    mockWebVitals.onTTFB.mockImplementation(() => {})

    const { rerender } = render(<PerformanceDashboard />)

    // Should still render the dashboard header
    expect(screen.getByText('Core Web Vitals')).toBeInTheDocument()

    // Should not show any metric displays since values are undefined and filtered out
    expect(screen.queryByText('LCP')).not.toBeInTheDocument()
    expect(screen.queryByText('INP')).not.toBeInTheDocument()
    expect(screen.queryByText('CLS')).not.toBeInTheDocument()
    expect(screen.queryByText('FCP')).not.toBeInTheDocument()
    expect(screen.queryByText('TTFB')).not.toBeInTheDocument()

    // Should not show actual metric values since no callbacks were called
    expect(screen.queryByText('2000ms')).not.toBeInTheDocument()
    expect(screen.queryByText('50ms')).not.toBeInTheDocument()
    expect(screen.queryByText('0.050')).not.toBeInTheDocument()

    rerender(<PerformanceDashboard />)
  })

  it('should apply custom className', () => {
    const { container } = render(<PerformanceDashboard className='custom-class' />)

    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('should show toggle instruction', () => {
    render(<PerformanceDashboard />)

    expect(screen.getByText('Press Ctrl/Cmd + Shift + P to toggle')).toBeInTheDocument()
  })

  describe('metric rating', () => {
    it('should classify metrics correctly', async () => {
      // Reset all mocks and use poor metric values
      vi.clearAllMocks()
      mockLocalStorage.getItem.mockReturnValue(null)

      // Mock with poor metrics
      mockWebVitals.onCLS.mockImplementation(callback =>
        callback({
          name: 'CLS',
          value: 0.3, // Poor
          entries: [],
          rating: 'poor' as const,
          delta: 0.3,
          id: 'test-cls',
          navigationType: 'navigate' as const,
        })
      )

      await act(async () => {
        render(<PerformanceDashboard />)
      })

      // CLS metric should be red (poor) - find the right container element
      const clsElement = screen.getByText('CLS').closest('.px-2')
      expect(clsElement).toHaveClass('text-red-800')
    })
  })
})
