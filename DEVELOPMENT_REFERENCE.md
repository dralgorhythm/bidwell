# Bidwell Development Reference Guide

## 📋 Quick Reference Card

### Essential Commands

```bash
# Development workflow
npm run dev              # Start development server
npm run test:watch       # Run tests in watch mode
npm run type-check       # TypeScript validation
npm run lint:fix         # Auto-fix linting issues

# Pre-commit checklist
npm run test:coverage    # Ensure 70% coverage
npm run build            # Verify production build
npm run type-check       # TypeScript validation
```

### File Creation Patterns

```bash
# Component: app/components/ComponentName.tsx
# Page: app/feature-name/page.tsx
# API: app/api/endpoint/route.ts
# Utility: lib/utility-name.ts
# Test: __tests__/path/file-name.test.tsx
```

## 🏗️ Component Development Patterns

### Server Component Template

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

// Export metadata for pages
export const metadata: Metadata = {
  title: 'Example Page',
  description: 'Description for SEO',
  openGraph: {
    title: 'Example Page',
    description: 'Description for SEO',
    type: 'website',
  },
}
```

### Client Component Template

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

## 🔧 API Route Development

### Secure API Route Template

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders, getClientIP } from 'lib/security'
import { createRateLimit, checkRateLimit } from 'lib/validation'
import { z } from 'zod'

// Rate limiting configuration
const rateLimit = createRateLimit(10, 60 * 1000) // 10 requests per minute

// Input validation schema
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
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // Input validation
    const body = await request.json()
    const validatedData = RequestSchema.parse(body)

    // Business logic here
    const result = await processData(validatedData.data)

    return NextResponse.json(
      { success: true, data: result },
      {
        status: 200,
        headers: getSecurityHeaders(),
      }
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

async function processData(data: string) {
  // Implementation here
  return { processed: data }
}
```

## 🧪 Testing Patterns

### Component Test Template

```typescript
// __tests__/components/example.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import ExampleComponent from 'app/components/example'

expect.extend(toHaveNoViolations)

describe('ExampleComponent', () => {
  it('renders correctly', () => {
    render(<ExampleComponent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('handles user interaction', () => {
    const mockOnClick = jest.fn()
    render(<ExampleComponent onClick={mockOnClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ExampleComponent title="Test" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('meets performance requirements', () => {
    const startTime = performance.now()
    render(<ExampleComponent title="Performance Test" />)
    const endTime = performance.now()

    expect(endTime - startTime).toBeLessThan(100) // 100ms threshold
  })
})
```

### API Route Test Template

```typescript
// __tests__/api/example.test.ts
import { createMocks } from 'node-mocks-http'
import { POST } from 'app/api/example/route'

describe('/api/example', () => {
  it('handles valid requests', async () => {
    const { req } = createMocks({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { data: 'test data' },
    })

    const response = await POST(req as any)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('validates input data', async () => {
    const { req } = createMocks({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { data: '' }, // Invalid: empty string
    })

    const response = await POST(req as any)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid input')
  })

  it('enforces rate limiting', async () => {
    // Implementation depends on your rate limiting strategy
  })
})
```

## 🎨 Styling Conventions

### Tailwind CSS Patterns

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
const buttonClasses =
  'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'

// Form elements
const inputClasses =
  'w-full p-2 border border-neutral-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
```

### Dark Mode Support

```typescript
// Always include dark mode variants
const cardClasses = 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800'
const textClasses = 'text-neutral-900 dark:text-neutral-100'
```

## 🚀 Performance Optimization Patterns

### Image Optimization

```typescript
import OptimizedImage from 'app/components/optimized-image'

// Use the optimized image component
<OptimizedImage
  src="/images/example.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false} // Set to true for above-the-fold images
  className="rounded-lg"
/>
```

### Font Loading

```typescript
// In layout.tsx or component
import { preloadFonts } from 'lib/font-optimization'

useEffect(() => {
  preloadFonts([{ href: '/fonts/custom-font.woff2', crossOrigin: 'anonymous' }])
}, [])
```

### Performance Monitoring

```typescript
import { trackPerformance } from 'lib/performance'

// Track custom metrics
useEffect(() => {
  trackPerformance('component-load', startTime, {
    component: 'ExampleComponent',
    props: JSON.stringify(props),
  })
}, [])
```

## 🔒 Security Implementation Patterns

### Input Validation

```typescript
import { z } from 'zod'

// Always validate user inputs
const UserInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  message: z.string().min(1).max(1000),
})

// In component or API route
try {
  const validatedData = UserInputSchema.parse(userInput)
  // Use validatedData safely
} catch (error) {
  // Handle validation errors
}
```

### Secure Headers

```typescript
// Always include security headers in API responses
import { getSecurityHeaders } from 'lib/security'

return NextResponse.json(data, {
  status: 200,
  headers: getSecurityHeaders(),
})
```

## 📱 Responsive Design Patterns

### Mobile-First Approach

```typescript
// Always start with mobile styles, then enhance
const responsiveClasses = [
  'grid grid-cols-1', // Mobile: 1 column
  'sm:grid-cols-2', // Small: 2 columns
  'lg:grid-cols-3', // Large: 3 columns
  'xl:grid-cols-4', // Extra large: 4 columns
].join(' ')
```

### Touch-Friendly Interactions

```typescript
// Ensure touch targets are at least 44px
const touchFriendlyButton = 'min-h-[44px] min-w-[44px] p-3'
```

## 🔍 SEO & Metadata Patterns

### Page Metadata

```typescript
// For each page component
export const metadata: Metadata = {
  title: 'Specific Page Title',
  description: 'Detailed description for search engines (150-160 characters)',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  openGraph: {
    title: 'Social Media Title',
    description: 'Social media description',
    type: 'website',
    images: [
      {
        url: '/og?title=Page%20Title',
        width: 1200,
        height: 630,
        alt: 'Alt text for social image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter description',
    images: ['/og?title=Page%20Title'],
  },
}
```

### Structured Data

```typescript
import StructuredData from 'app/components/structured-data'

// Include in page components
<StructuredData
  type="WebSite"
  data={{
    name: "Site Name",
    url: "https://example.com",
    description: "Site description"
  }}
/>
```

## ⚡ Development Workflow

### Pre-Commit Checklist

1. **Run Tests**: `npm run test:coverage`
2. **Type Check**: `npm run type-check`
3. **Lint**: `npm run lint:fix`
4. **Build**: `npm run build`
5. **Accessibility**: Check with screen reader
6. **Performance**: Lighthouse audit
7. **Security**: Review security implications

### Branch Strategy

```bash
# Feature development
git checkout -b feature/description
git commit -m "feat: add new feature"

# Bug fixes
git checkout -b fix/issue-description
git commit -m "fix: resolve issue"

# Documentation
git checkout -b docs/update-description
git commit -m "docs: update documentation"
```

### Environment Setup

```bash
# Development environment
NODE_ENV=development
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=dev_analytics_id

# Production environment (Vercel automatically sets these)
NODE_ENV=production
VERCEL_URL=your-domain.com
```

## 🚨 Common Pitfalls & Solutions

### Hydration Mismatches

```typescript
// Problem: Server/client mismatch
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) {
  return <div>Loading...</div> // Consistent server/client render
}
```

### Font Loading Issues

```typescript
// Problem: FOUT (Flash of Unstyled Text)
// Solution: Use font-display: swap and fallbacks
import { initializeFontOptimization } from 'lib/font-optimization'

useEffect(() => {
  initializeFontOptimization()
}, [])
```

### Performance Issues

```typescript
// Problem: Large bundle size
// Solution: Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // If client-only
})
```

## 📚 Learning Resources

### Code Examples in Codebase

- **Component Patterns**: `app/components/`
- **API Patterns**: `app/api/health/route.ts`
- **Testing Patterns**: `__tests__/components/`
- **Performance Patterns**: `lib/performance.ts`
- **Security Patterns**: `lib/security.ts`

### External Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Testing Library](https://testing-library.com/docs/)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 💡 Pro Tips

1. **Always use TypeScript**: Catch errors at compile time
2. **Server-first**: Default to server components, add 'use client' only when needed
3. **Test-driven**: Write tests before implementing features
4. **Performance-aware**: Consider Core Web Vitals impact
5. **Accessibility-first**: Include ARIA labels and keyboard navigation
6. **Security-conscious**: Validate all inputs, use security headers
7. **Mobile-optimized**: Test on actual devices, not just browser dev tools

This reference guide provides the essential patterns and practices for developing within the Bidwell codebase effectively.
