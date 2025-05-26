import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

// Extend Jest with jest-axe matchers
expect.extend(toHaveNoViolations)

// Mock Web APIs that might not be available in Jest environment
global.Headers = global.Headers || class Headers extends Map {
  constructor(init = {}) {
    super()
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this.set(key, value)
      })
    }
  }

  get(name) {
    return super.get(name.toLowerCase())
  }

  set(name, value) {
    return super.set(name.toLowerCase(), value)
  }
}

global.Response = global.Response || class Response {
  constructor(body, init = {}) {
    this.body = body
    this.status = init.status || 200
    this.statusText = init.statusText || 'OK'
    this.headers = new global.Headers(init.headers || {})
  }

  text() {
    return Promise.resolve(this.body)
  }

  json() {
    return Promise.resolve(JSON.parse(this.body))
  }

  static json(data, init = {}) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...init.headers
      }
    })
  }
}

global.Request = global.Request || class Request {
  constructor(url, init = {}) {
    Object.defineProperty(this, 'url', {
      value: url,
      writable: false,
      configurable: true
    })
    this.method = init.method || 'GET'
    this.headers = new global.Headers(init.headers || {})
    this.body = init.body || null
  }
}

// Mock NextResponse for Next.js API routes
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url, init) => {
    const req = new global.Request(url, init)
    return req
  }),
  NextResponse: {
    json: jest.fn((data, init = {}) => {
      return new global.Response(JSON.stringify(data), {
        ...init,
        headers: {
          'content-type': 'application/json',
          ...init.headers
        }
      })
    }),
    next: jest.fn(() => new global.Response()),
    redirect: jest.fn((url, status = 302) =>
      new global.Response(null, { status, headers: { location: url } })
    ),
    rewrite: jest.fn(() => new global.Response()),
  }
}))

// Mock Next.js router
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Global test utilities
global.testUtils = {
  mockRouter,
  // Add more utilities as needed
}
