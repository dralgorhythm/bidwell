# API Reference

This document provides comprehensive technical reference for the Bidwell Consulting codebase, including APIs, components, utilities, and development patterns.

## Table of Contents

- [Component Library](#component-library)
- [Utility Libraries](#utility-libraries)
- [API Endpoints](#api-endpoints)
- [Development Patterns](#development-patterns)
- [TypeScript Interfaces](#typescript-interfaces)
- [Testing Utilities](#testing-utilities)
- [Configuration Reference](#configuration-reference)

## Component Library

### Core Components

#### OptimizedImage

Enhanced image component with performance optimizations.

```typescript
interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  sizes?: string
}

// Usage
<OptimizedImage
  src="/images/example.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}
  className="rounded-lg"
/>
```

**Features:**

- Automatic WebP/AVIF format selection
- Responsive image sizing
- Lazy loading by default
- Layout shift prevention

#### PerformanceMonitor

Client-side performance monitoring component.

```typescript
interface PerformanceMonitorProps {
  children: React.ReactNode
  trackingId?: string
}

// Usage
<PerformanceMonitor trackingId="homepage">
  <YourComponent />
</PerformanceMonitor>
```

**Features:**

- Core Web Vitals tracking
- Custom performance metrics
- Real-time monitoring
- Automatic reporting

#### StructuredData

SEO-optimized structured data component.

```typescript
interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'Person' | 'Article'
  data: Record<string, any>
}

// Usage
<StructuredData
  type="WebSite"
  data={{
    name: "Bidwell Consulting",
    url: "https://bidwell.info",
    description: "Software engineering and consulting services"
  }}
/>
```

#### ComparisonForm

Interactive number comparison tool.

```typescript
interface ComparisonFormProps {
  onCompare?: (a: number, b: number, result: string) => void
}

// Usage
<ComparisonForm onCompare={(a, b, result) => console.log(result)} />
```

### Layout Components

#### Footer

Site footer with navigation and contact information.

```typescript
interface FooterProps {
  className?: string
}

// Usage
<Footer className="mt-auto" />
```

#### Nav

Primary navigation component.

```typescript
interface NavProps {
  className?: string
}

// Usage
<Nav className="sticky top-0" />
```

## Utility Libraries

### Performance Utilities (`lib/performance.ts`)

#### Core Web Vitals Tracking

```typescript
// Track Core Web Vitals
trackPerformance(metricName: string, value: number, context?: Record<string, any>): void

// Example
trackPerformance('component-load', loadTime, { component: 'Header' })
```

#### Performance Thresholds

```typescript
interface PerformanceThresholds {
  LCP: { good: 2500, poor: 4000 }
  INP: { good: 200, poor: 500 }
  CLS: { good: 0.1, poor: 0.25 }
  FCP: { good: 1800, poor: 3000 }
  TTFB: { good: 800, poor: 1800 }
}

// Get performance rating
getPerformanceRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor'
```

#### Resource Preloading

```typescript
// Preload critical resources
preloadCriticalResources(resources: Array<{
  href: string
  as: 'script' | 'style' | 'font' | 'image'
  crossOrigin?: string
}>): void

// Example
preloadCriticalResources([
  { href: '/fonts/geist.woff2', as: 'font', crossOrigin: 'anonymous' }
])
```

### Font Optimization (`lib/font-optimization.ts`)

#### Font Loading Strategies

```typescript
// Initialize font optimization
initializeFontOptimization(): void

// Preload specific fonts
preloadFonts(fonts: Array<{
  href: string
  crossOrigin?: string
}>): void

// Check font loading support
supportsFontDisplay(): boolean
```

#### Font Display Strategies

```typescript
enum FontDisplayStrategy {
  AUTO = 'auto',
  BLOCK = 'block',
  SWAP = 'swap',
  FALLBACK = 'fallback',
  OPTIONAL = 'optional'
}

// Apply font display strategy
applyFontDisplayStrategy(strategy: FontDisplayStrategy): void
```

### Security Utilities (`lib/security.ts`)

#### Security Headers

```typescript
// Get security headers for responses
getSecurityHeaders(): Record<string, string>

// Example response headers
{
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}
```

#### Client IP Detection

```typescript
// Extract client IP from request
getClientIP(request: NextRequest): string

// Usage in API routes
const clientIP = getClientIP(request)
```

### Validation Utilities (`lib/validation.ts`)

#### Rate Limiting

```typescript
// Create rate limiter
createRateLimit(requests: number, windowMs: number): RateLimit

// Check rate limit
checkRateLimit(rateLimit: RateLimit, identifier: string): {
  allowed: boolean
  remaining: number
  resetTime: number
}

// Example
const rateLimit = createRateLimit(10, 60 * 1000) // 10 requests per minute
const result = checkRateLimit(rateLimit, clientIP)
```

#### Input Validation Schemas

```typescript
import { z } from 'zod'

// Contact form schema
const ContactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(1000),
})

// Comparison form schema
const ComparisonSchema = z.object({
  numberA: z.number().finite(),
  numberB: z.number().finite(),
})

// Usage
try {
  const validatedData = ContactFormSchema.parse(userInput)
} catch (error) {
  // Handle validation errors
}
```

### Environment Validation (`lib/env.ts`)

```typescript
// Environment variable validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),
})

// Validated environment
export const env = envSchema.parse(process.env)
```

## API Endpoints

### Health Check (`/api/health`)

Basic health check endpoint for monitoring.

```typescript
// GET /api/health
interface HealthResponse {
  status: 'ok'
  timestamp: string
  environment: string
}

// Example response
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### Analytics (`/api/analytics`)

Performance metrics collection endpoint.

```typescript
// POST /api/analytics
interface AnalyticsRequest {
  metric: string
  value: number
  context?: Record<string, any>
}

interface AnalyticsResponse {
  success: boolean
  message: string
}

// Example request
{
  "metric": "LCP",
  "value": 1500,
  "context": { "page": "/", "device": "desktop" }
}
```

**Security Features:**

- Rate limiting: 10 requests per minute per IP
- Input validation with Zod schemas
- Security headers on all responses
- Proper error handling

## Development Patterns

### Component Templates

#### Server Component Template

```typescript
// app/components/example-server.tsx
import type { Metadata } from 'next'

interface ExampleProps {
  title: string
  children?: React.ReactNode
}

export default function ExampleServer({ title, children }: ExampleProps) {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">{title}</h1>
      {children}
    </section>
  )
}

// Metadata for pages
export const metadata: Metadata = {
  title: 'Example Page',
  description: 'Description for SEO',
  openGraph: {
    title: 'Example Page',
    description: 'Description for SEO',
    type: 'website'
  }
}
```

#### Client Component Template

```typescript
// app/components/example-client.tsx
'use client'

import { useState, useEffect } from 'react'

interface ExampleClientProps {
  initialValue?: string
}

export default function ExampleClient({ initialValue = '' }: ExampleClientProps) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    // Client-side logic here
  }, [])

  return (
    <div className="p-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  )
}
```

#### API Route Template

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders, getClientIP } from 'lib/security'
import { createRateLimit, checkRateLimit } from 'lib/validation'
import { z } from 'zod'

const rateLimit = createRateLimit(10, 60 * 1000)

const RequestSchema = z.object({
  data: z.string().min(1).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = checkRateLimit(rateLimit, clientIP)

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: getSecurityHeaders() }
      )
    }

    // Input validation
    const body = await request.json()
    const validatedData = RequestSchema.parse(body)

    // Business logic
    const result = await processData(validatedData.data)

    return NextResponse.json(
      { success: true, data: result },
      { status: 200, headers: getSecurityHeaders() }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400, headers: getSecurityHeaders() }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecurityHeaders() }
    )
  }
}
```

### Styling Patterns

#### Tailwind CSS Conventions

```typescript
// Layout components
const layoutClasses = 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'

// Typography hierarchy
const headingClasses = {
  h1: 'text-2xl font-semibold tracking-tighter',
  h2: 'text-xl font-medium tracking-tight',
  h3: 'text-lg font-medium tracking-tight',
}

// Interactive elements
const buttonClasses = [
  'px-4 py-2',
  'bg-blue-600 hover:bg-blue-700',
  'text-white',
  'rounded',
  'focus:outline-none focus:ring-2 focus:ring-blue-500',
].join(' ')

// Form elements
const inputClasses = [
  'w-full p-2',
  'border border-neutral-300 dark:border-neutral-700',
  'rounded',
  'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
].join(' ')
```

#### Dark Mode Support

```typescript
// Always include dark mode variants
const cardClasses = [
  'bg-white dark:bg-neutral-900',
  'border border-neutral-200 dark:border-neutral-800',
  'text-neutral-900 dark:text-neutral-100',
].join(' ')
```

#### Responsive Design

```typescript
// Mobile-first approach
const responsiveClasses = [
  'grid grid-cols-1', // Mobile: 1 column
  'sm:grid-cols-2', // Small: 2 columns
  'lg:grid-cols-3', // Large: 3 columns
  'xl:grid-cols-4', // Extra large: 4 columns
].join(' ')

// Touch-friendly interactions
const touchFriendlyButton = 'min-h-[44px] min-w-[44px] p-3'
```

## TypeScript Interfaces

### Common Types

```typescript
// Performance metrics
interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  threshold: {
    good: number
    poor: number
  }
}

// API response wrapper
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Component props with children
interface PropsWithChildren {
  children: React.ReactNode
  className?: string
}

// Page metadata
interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title: string
    description: string
    type: 'website' | 'article'
    images?: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
  }
}
```

### Form Interfaces

```typescript
// Contact form
interface ContactFormData {
  name: string
  email: string
  message: string
}

// Comparison form
interface ComparisonFormData {
  numberA: number
  numberB: number
}

// Form validation result
interface ValidationResult {
  valid: boolean
  errors: Record<string, string[]>
}
```

## Testing Utilities

### Test Helpers

```typescript
// Custom render function with providers
import { render as rtlRender } from '@testing-library/react'

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <TestProviders>{children}</TestProviders>,
    ...options
  })
}

// Accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

async function axeTest(container: HTMLElement) {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}
```

### Performance Testing

```typescript
// Measure render performance
class PerformanceTestHelper {
  static measureRenderTime<T>(component: React.ReactElement): number {
    const startTime = performance.now()
    render(component)
    const endTime = performance.now()
    return endTime - startTime
  }

  static expectFastRender(renderTime: number, threshold = 100) {
    expect(renderTime).toBeLessThan(threshold)
  }
}
```

### Mock Utilities

```typescript
// Next.js router mock
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
}

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

// Performance API mock
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
  },
})
```

## Configuration Reference

### Next.js Configuration

```typescript
// next.config.js
const nextConfig = {
  // Output mode: conditional for static export
  output: process.env.GITHUB_ACTIONS ? 'export' : 'standalone',

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.GITHUB_ACTIONS === 'true',
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // Webpack optimization
  webpack: config => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }
    return config
  },
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Jest Configuration

```javascript
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^app/(.*)$': '<rootDir>/app/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
}
```

### Tailwind Configuration

```javascript
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
```

---

**Related Documentation:**

- [Getting Started Guide](./getting-started.md) - Complete onboarding tutorial
- [Architecture Guide](./architecture.md) - System design and decisions
- [Development Guide](../DEVELOPMENT.md) - Development workflows and patterns
- [Contributing Guidelines](../CONTRIBUTING.md) - Contribution process and standards
