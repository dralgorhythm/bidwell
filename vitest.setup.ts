import '@testing-library/jest-dom'
import * as matchers from '@testing-library/jest-dom/matchers'
import { toHaveNoViolations } from 'jest-axe'
import React from 'react'
import { vi } from 'vitest'

// Mock react-dom/test-utils for React 19 compatibility
vi.mock('react-dom/test-utils', () => ({
  act: React.act,
}))

// Extend Vitest's expect
expect.extend(matchers)
expect.extend(toHaveNoViolations)

// Alias jest to vi for compatibility
globalThis.jest = {
  ...vi,
  fn: vi.fn,
  mock: vi.mock,
  spyOn: vi.spyOn,
  useFakeTimers: vi.useFakeTimers,
  useRealTimers: vi.useRealTimers,
  advanceTimersByTime: vi.advanceTimersByTime,
  clearAllMocks: vi.clearAllMocks,
  resetAllMocks: vi.resetAllMocks,
  restoreAllMocks: vi.restoreAllMocks,
  // biome-ignore lint/suspicious/noExplicitAny: Jest compatibility
} as any

// Mock Web APIs
global.Headers =
  global.Headers ||
  (class Headers extends Map {
    // biome-ignore lint/suspicious/noExplicitAny: Mock implementation
    constructor(init: any = {}) {
      super()
      if (init) {
        for (const [key, value] of Object.entries(init as Record<string, string>)) {
          this.set(key, value)
        }
      }
    }
    get(name: string) {
      return super.get(name.toLowerCase())
    }
    set(name: string, value: unknown) {
      return super.set(name.toLowerCase(), value)
    }
    // biome-ignore lint/suspicious/noExplicitAny: Mock implementation
  } as unknown as { new (init?: any): Headers; prototype: Headers })

global.Response =
  global.Response ||
  (class Response {
    body: unknown
    status: number
    statusText: string
    headers: unknown
    // biome-ignore lint/suspicious/noExplicitAny: Mock implementation
    constructor(body: unknown, init: any = {}) {
      this.body = body
      this.status = init.status || 200
      this.statusText = init.statusText || 'OK'
      this.headers = new global.Headers(init.headers || {})
    }
    text() {
      return Promise.resolve(this.body)
    }
    json() {
      return Promise.resolve(JSON.parse(this.body as string))
    }
    // biome-ignore lint/suspicious/noExplicitAny: Mock implementation
    static json(data: unknown, init: any = {}) {
      return new Response(JSON.stringify(data) as string, {
        ...init,
        headers: { 'content-type': 'application/json', ...init.headers },
      })
    }
  } as unknown as {
    new (body: unknown, init?: unknown): Response
    json(data: unknown, init?: unknown): Response
    prototype: Response
  })

global.Request =
  global.Request ||
  (class Request {
    url: string
    method: string
    headers: unknown
    body: unknown
    // biome-ignore lint/suspicious/noExplicitAny: Mock implementation
    constructor(url: string, init: any = {}) {
      this.url = url
      this.method = init.method || 'GET'
      this.headers = new global.Headers(init.headers || {})
      this.body = init.body || null
    }
  } as unknown as { new (url: string, init?: unknown): Request; prototype: Request })

// Mock Next.js modules
vi.mock('next/server', () => ({
  NextRequest: vi.fn((url, init) => new global.Request(url, init)),
  NextResponse: {
    json: vi.fn(
      (data, init = {}) =>
        new global.Response(JSON.stringify(data), {
          ...init,
          headers: { 'content-type': 'application/json', ...init.headers },
        })
    ),
    next: vi.fn(() => new global.Response()),
    redirect: vi.fn(
      (url, status = 302) => new global.Response(null, { status, headers: { location: url } })
    ),
    rewrite: vi.fn(() => new global.Response()),
  },
}))

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  events: { on: vi.fn(), off: vi.fn(), emit: vi.fn() },
}

vi.mock('next/router', () => ({ useRouter: () => mockRouter }))
vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  root = null
  rootMargin = ''
  thresholds = []
  takeRecords = vi.fn(() => [])
} as unknown as {
  new (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver
  prototype: IntersectionObserver
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
} as unknown as {
  new (callback: ResizeObserverCallback): ResizeObserver
  prototype: ResizeObserver
}

// Mock document.fonts
Object.defineProperty(document, 'fonts', {
  value: {
    ready: Promise.resolve(),
    check: () => true,
  },
  writable: true,
})
