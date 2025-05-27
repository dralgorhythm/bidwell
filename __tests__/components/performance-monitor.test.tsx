/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PerformanceMonitor from '@/app/components/performance-monitor'
import * as performanceLib from '@/lib/performance'

// Mock the performance library
jest.mock('@/lib/performance', () => ({
  initPerformanceMonitoring: jest.fn(),
  trackCustomMetric: jest.fn(),
}))

// Mock window.performance
const mockPerformance = {
  now: jest.fn(() => 1000),
  getEntriesByType: jest.fn(),
}

Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true,
})

// Mock requestIdleCallback
Object.defineProperty(window, 'requestIdleCallback', {
  value: jest.fn(cb => setTimeout(cb, 0)),
  writable: true,
})

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Reset document ready state
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      writable: true,
    })
  })

  it('should initialize performance monitoring when enableReporting is true', () => {
    render(<PerformanceMonitor enableReporting={true} />)

    expect(performanceLib.initPerformanceMonitoring).toHaveBeenCalled()
  })

  it('should not initialize performance monitoring when enableReporting is false', () => {
    render(<PerformanceMonitor enableReporting={false} />)

    expect(performanceLib.initPerformanceMonitoring).not.toHaveBeenCalled()
  })

  it('should track page load metrics when navigation timing is available', () => {
    const mockNavigation = {
      navigationStart: 0,
      requestStart: 100,
      responseStart: 200,
      domContentLoadedEventEnd: 500,
      loadEventEnd: 800,
    }

    mockPerformance.getEntriesByType.mockReturnValue([mockNavigation])

    // Set document as complete to trigger immediate tracking
    Object.defineProperty(document, 'readyState', {
      value: 'complete',
      writable: true,
    })

    render(<PerformanceMonitor enableReporting={true} />)

    expect(performanceLib.trackCustomMetric).toHaveBeenCalledWith({
      name: 'TTFB',
      value: 100,
      category: 'navigation',
      label: 'page-load'
    })
    expect(performanceLib.trackCustomMetric).toHaveBeenCalledWith({
      name: 'DCL',
      value: 300,
      category: 'navigation',
      label: 'dom-content-loaded'
    })
    expect(performanceLib.trackCustomMetric).toHaveBeenCalledWith({
      name: 'Load',
      value: 600,
      category: 'navigation',
      label: 'load-complete'
    })
  })

  it('should track user interactions', async () => {
    const user = userEvent.setup()

    render(<PerformanceMonitor enableReporting={true} />)

    // Create a button to interact with
    const button = document.createElement('button')
    button.textContent = 'Test Button'
    document.body.appendChild(button)

    // Simulate click
    await user.click(button)

    // Wait for requestIdleCallback
    await new Promise(resolve => setTimeout(resolve, 10))

    expect(performanceLib.trackCustomMetric).toHaveBeenCalledWith({
      name: 'Interaction',
      value: expect.any(Number),
      category: 'user-interaction',
      label: 'response-time'
    })

    // Cleanup
    document.body.removeChild(button)
  })

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

    const { unmount } = render(<PerformanceMonitor enableReporting={true} />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))

    removeEventListenerSpy.mockRestore()
  })

  it('should handle missing performance API gracefully', () => {
    // Temporarily remove performance API
    const originalPerformance = window.performance
    // @ts-ignore
    delete window.performance

    expect(() => {
      render(<PerformanceMonitor enableReporting={true} />)
    }).not.toThrow()

    // Restore performance API
    window.performance = originalPerformance
  })

  it('should not render any visible content', () => {
    const { container } = render(<PerformanceMonitor enableReporting={true} />)

    expect(container.firstChild).toBeNull()
  })
})
