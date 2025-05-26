import { render, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'
import React from 'react'

// Performance testing utilities
export class PerformanceTestHelper {
  private static readonly RENDER_THRESHOLD = 100 // ms
  private static readonly INTERACTION_THRESHOLD = 50 // ms

  static measureRenderTime(component: ReactElement): number {
    const start = performance.now()
    render(component)
    const end = performance.now()
    return end - start
  }

  static async measureAsyncOperation<T>(operation: () => Promise<T>): Promise<{
    result: T
    duration: number
  }> {
    const start = performance.now()
    const result = await operation()
    const end = performance.now()
    return { result, duration: end - start }
  }

  static expectFastRender(renderTime: number, customThreshold?: number): void {
    const threshold = customThreshold || this.RENDER_THRESHOLD
    expect(renderTime).toBeLessThan(threshold)
  }

  static expectFastInteraction(interactionTime: number, customThreshold?: number): void {
    const threshold = customThreshold || this.INTERACTION_THRESHOLD
    expect(interactionTime).toBeLessThan(threshold)
  }

  static createPerformanceObserver(entryTypes: string[]): PerformanceObserver {
    return new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`Performance entry: ${entry.name} - ${entry.duration}ms`)
      })
    })
  }
}

// Memory usage testing
export class MemoryTestHelper {
  private static initialMemory: number

  static startMemoryMeasurement(): void {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in performance) {
      this.initialMemory = (performance as any).memory.usedJSHeapSize
    }
  }

  static getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in performance) {
      return (performance as any).memory.usedJSHeapSize - this.initialMemory
    }
    return 0
  }

  static expectLowMemoryUsage(threshold = 1024 * 1024): void { // 1MB default
    const usage = this.getMemoryUsage()
    expect(usage).toBeLessThan(threshold)
  }
}

// Component stress testing
export class StressTestHelper {
  static async stressTestComponent(
    component: ReactElement,
    iterations = 100
  ): Promise<{
    averageRenderTime: number
    maxRenderTime: number
    minRenderTime: number
    failures: number
  }> {
    const renderTimes: number[] = []
    let failures = 0

    for (let i = 0; i < iterations; i++) {
      try {
        const renderTime = PerformanceTestHelper.measureRenderTime(component)
        renderTimes.push(renderTime)
      } catch (error) {
        failures++
        console.error(`Stress test iteration ${i} failed:`, error)
      }
    }

    return {
      averageRenderTime: renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length,
      maxRenderTime: Math.max(...renderTimes),
      minRenderTime: Math.min(...renderTimes),
      failures,
    }
  }
}

// Bundle size testing helpers
export class BundleTestHelper {
  static async measureComponentSize(componentPath: string): Promise<number> {
    try {
      // This would require build-time analysis in a real implementation
      // For now, we'll return a mock size
      return 1024 // Mock size in bytes
    } catch (error) {
      console.error('Bundle size measurement failed:', error)
      return 0
    }
  }

  static expectSmallBundle(size: number, threshold = 10 * 1024): void { // 10KB default
    expect(size).toBeLessThan(threshold)
  }
}

// Utility for testing component rendering under different conditions
export class EnvironmentTestHelper {
  static simulateSlowDevice(component: ReactElement): RenderResult {
    // Mock slow device by adding artificial delay
    const originalSetTimeout = global.setTimeout
    global.setTimeout = ((fn: Function, delay: number) => {
      return originalSetTimeout(fn, delay * 2) // Double all timeouts
    }) as any

    const result = render(component)

    // Restore original setTimeout
    global.setTimeout = originalSetTimeout

    return result
  }

  static simulateLowMemory(): void {
    // Mock low memory conditions
    if (typeof window !== 'undefined' && 'performance' in window) {
      Object.defineProperty(performance, 'memory', {
        value: {
          usedJSHeapSize: 50 * 1024 * 1024, // 50MB
          totalJSHeapSize: 60 * 1024 * 1024, // 60MB
          jsHeapSizeLimit: 64 * 1024 * 1024, // 64MB
        },
        writable: true,
      })
    }
  }
}

// Error boundary testing
export class ErrorTestHelper {
  static createErrorBoundary(fallback: ReactElement) {
    return class TestErrorBoundary extends React.Component<
      { children: React.ReactNode },
      { hasError: boolean }
    > {
      constructor(props: { children: React.ReactNode }) {
        super(props)
        this.state = { hasError: false }
      }

      static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true }
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('Error boundary caught error:', error, errorInfo)
      }

      render(): React.ReactNode {
        if (this.state.hasError) {
          return fallback
        }

        return this.props.children
      }
    }
  }

  static expectErrorHandling(
    componentWithError: ReactElement,
    expectedError: string
  ): void {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const ErrorBoundary = this.createErrorBoundary(<div>Error occurred</div>)

    render(
      <ErrorBoundary>
        {componentWithError}
      </ErrorBoundary>
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(expectedError),
      expect.any(Object)
    )

    consoleSpy.mockRestore()
  }
}
