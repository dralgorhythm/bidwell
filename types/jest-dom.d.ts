import '@testing-library/jest-dom'

// Extend Jest matchers with jest-axe
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R
    }
  }
}
