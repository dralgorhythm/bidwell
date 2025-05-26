import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'
import { axe, toHaveNoViolations } from 'jest-axe'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Custom render function with common providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
}

function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const { route = '/', ...renderOptions } = options

  // Mock router context if needed
  if (route !== '/') {
    const mockRouter = global.testUtils.mockRouter
    mockRouter.route = route
    mockRouter.pathname = route
    mockRouter.asPath = route
  }

  return render(ui, renderOptions)
}

// Accessibility testing helper
export async function axeTest(container: Element): Promise<void> {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}

// Custom matchers for common assertions
export const customMatchers = {
  toBeAccessible: async (received: Element) => {
    try {
      await axeTest(received)
      return {
        message: () => `Expected element to have accessibility violations`,
        pass: true,
      }
    } catch (error) {
      return {
        message: () => `Expected element to be accessible: ${error}`,
        pass: false,
      }
    }
  },
}

// Mock data generators
export const mockData = {
  comparisonResult: (overrides = {}) => ({
    firstNumber: 5,
    secondNumber: 10,
    result: '5 is less than 10',
    difference: 5,
    ...overrides,
  }),
}

// Test helpers for form interactions
export const formHelpers = {
  fillInput: async (user: any, element: HTMLElement, value: string) => {
    await user.clear(element)
    await user.type(element, value)
  },
  
  submitForm: async (user: any, form: HTMLElement) => {
    const submitButton = form.querySelector('button[type="submit"]') as HTMLElement
    if (submitButton) {
      await user.click(submitButton)
    }
  },
}

// Performance testing helpers
export const performanceHelpers = {
  measureRenderTime: (renderFn: () => RenderResult): number => {
    const start = performance.now()
    renderFn()
    const end = performance.now()
    return end - start
  },
  
  expectFastRender: (renderTime: number, threshold = 100) => {
    expect(renderTime).toBeLessThan(threshold)
  },
}

// Simple performance test function
export function performanceTest(fn: () => void): number {
  const start = performance.now()
  fn()
  const end = performance.now()
  return end - start
}

// Re-export everything from testing library
export * from '@testing-library/react'
export { userEvent } from '@testing-library/user-event'

// Re-export our custom render as the default render
export { customRender as render }
