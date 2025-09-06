# Contributing to Bidwell Consulting

Thank you for your interest in contributing to the Bidwell Consulting project! This guide will help you contribute effectively to this enterprise-level Next.js application.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Performance Guidelines](#performance-guidelines)
- [Security Requirements](#security-requirements)
- [Documentation Standards](#documentation-standards)

## Code of Conduct

This project follows professional software development standards:

- **Be respectful** and inclusive in all interactions
- **Collaborate constructively** with other contributors
- **Focus on technical merit** when reviewing code
- **Maintain professionalism** in all communications
- **Help newcomers** understand the project standards

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 18.x or 20.x** (LTS recommended)
- **npm 8.x or higher**
- **Git** for version control
- **VS Code** (recommended) with suggested extensions

### Initial Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**

   ```bash
   git clone https://github.com/YOUR-USERNAME/bidwell.git
   cd bidwell
   ```

3. **Add upstream remote:**

   ```bash
   git remote add upstream https://github.com/dralgorhythm/bidwell.git
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Verify setup:**
   ```bash
   npm run test:coverage
   npm run type-check
   npm run build
   ```

### Understanding the Project

Before making changes:

1. **Read the documentation:**
   - [Getting Started Guide](./docs/getting-started.md) - Complete onboarding
   - [Architecture Guide](./docs/architecture.md) - System design and decisions
   - [API Reference](./docs/reference.md) - Technical specifications

2. **Explore the codebase:**
   - Run the development server: `npm run dev`
   - Browse existing components and patterns
   - Review test files to understand expected behavior

## Development Workflow

### Branch Strategy

1. **Create a feature branch:**

   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/descriptive-name
   ```

2. **Branch naming conventions:**
   - `feature/description` - New features
   - `fix/description` - Bug fixes
   - `docs/description` - Documentation updates
   - `perf/description` - Performance improvements
   - `security/description` - Security fixes

### Making Changes

1. **Follow Test-Driven Development:**

   ```bash
   # 1. Write tests first
   touch __tests__/components/your-component.test.tsx

   # 2. Run tests (they should fail initially)
   npm run test:watch

   # 3. Implement feature
   # 4. Tests should now pass
   ```

2. **Development checklist:**
   - [ ] Write tests before implementing features
   - [ ] Follow existing code patterns
   - [ ] Include TypeScript types
   - [ ] Add proper error handling
   - [ ] Consider accessibility requirements
   - [ ] Optimize for performance

### Pre-Commit Quality Checks

Before committing, always run:

```bash
npm run test:coverage    # Verify 70% test coverage
npm run type-check       # TypeScript compilation
npm run lint:fix         # Auto-fix linting issues
npm run format:fix       # Format code consistently
npm run build            # Verify production build
```

**Automated checks:** These same checks run automatically in CI/CD, but running them locally saves time.

## Code Standards

### TypeScript Guidelines

- **Use strict mode** - No `any` types allowed
- **Proper interfaces** - Define interfaces for all props and data structures
- **Type safety** - Handle undefined/null values appropriately
- **Import organization** - Group imports logically

```typescript
// ✅ Good example
interface ComponentProps {
  title: string
  description?: string
  onAction: (id: string) => void
}

export default function Component({ title, description, onAction }: ComponentProps) {
  const handleClick = (event: React.MouseEvent) => {
    onAction(event.currentTarget.id)
  }

  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <button onClick={handleClick}>Action</button>
    </div>
  )
}
```

### Component Architecture

#### Server Components (Default)

Use server components for:

- Static content rendering
- Data fetching
- SEO optimization
- Performance-critical rendering

```typescript
// app/components/server-example.tsx
interface ServerComponentProps {
  data: DataType
}

export default function ServerComponent({ data }: ServerComponentProps) {
  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </section>
  )
}
```

#### Client Components (When Necessary)

Use client components only for:

- State management
- User interactions
- Browser APIs
- Event handlers

```typescript
// app/components/client-example.tsx
'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  )
}
```

### API Development Standards

Every API route must include:

1. **Rate limiting**
2. **Input validation**
3. **Security headers**
4. **Proper error handling**
5. **TypeScript types**

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders, getClientIP } from 'lib/security'
import { createRateLimit, checkRateLimit } from 'lib/validation'
import { z } from 'zod'

// Rate limiting
const rateLimit = createRateLimit(10, 60 * 1000) // 10 req/min

// Input validation
const RequestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
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

    // 2. Input validation
    const body = await request.json()
    const validatedData = RequestSchema.parse(body)

    // 3. Business logic
    const result = await processRequest(validatedData)

    // 4. Secure response
    return NextResponse.json(
      { success: true, data: result },
      {
        status: 200,
        headers: getSecurityHeaders(),
      }
    )
  } catch (error) {
    // 5. Error handling
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400, headers: getSecurityHeaders() }
      )
    }

    // Never expose internal errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecurityHeaders() }
    )
  }
}
```

### Styling Guidelines

- **Use Tailwind CSS** - Utility-first approach
- **Mobile-first** - Start with mobile styles, enhance for larger screens
- **Dark mode** - Always include dark mode variants
- **Accessibility** - Ensure proper contrast and touch targets

```typescript
// ✅ Good styling example
const Component = () => (
  <div className={[
    'p-4 rounded-lg',                              // Base styles
    'bg-white dark:bg-neutral-900',                // Dark mode
    'border border-neutral-200 dark:border-neutral-800', // Dark mode borders
    'text-neutral-900 dark:text-neutral-100',      // Dark mode text
    'hover:shadow-lg transition-shadow',           // Interactions
    'focus:outline-none focus:ring-2 focus:ring-blue-500' // Accessibility
  ].join(' ')}>
    Content
  </div>
)
```

## Testing Requirements

### Coverage Standards

- **Minimum 70% coverage** across all metrics:
  - Branches: 70%
  - Functions: 70%
  - Lines: 70%
  - Statements: 70%

### Test Types Required

#### 1. Unit Tests

Test individual components and utilities:

```typescript
// __tests__/components/example.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Example from 'app/components/example'

describe('Example Component', () => {
  it('renders with required props', () => {
    render(<Example title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('handles user interaction', () => {
    const mockHandler = jest.fn()
    render(<Example onAction={mockHandler} />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
```

#### 2. Accessibility Tests

Every component must pass accessibility tests:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Example title="Test" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

#### 3. API Tests

Test API routes comprehensively:

```typescript
// __tests__/api/example.test.ts
import { createMocks } from 'node-mocks-http'
import { POST } from 'app/api/example/route'

describe('/api/example', () => {
  it('handles valid requests', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: { name: 'Test', email: 'test@example.com' },
    })

    const response = await POST(req as any)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('validates input data', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: { name: '', email: 'invalid-email' }, // Invalid data
    })

    const response = await POST(req as any)
    expect(response.status).toBe(400)
  })
})
```

#### 4. Integration Tests

Test complete user journeys:

```typescript
// __tests__/integration/contact-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactPage from 'app/contact/page'

describe('Contact Form Integration', () => {
  it('completes full contact form submission', async () => {
    render(<ContactPage />)

    // Fill form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    })

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    // Verify success
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully')).toBeInTheDocument()
    })
  })
})
```

### Performance Tests

Include performance considerations:

```typescript
describe('Performance', () => {
  it('renders quickly', () => {
    const startTime = performance.now()
    render(<HeavyComponent />)
    const endTime = performance.now()

    expect(endTime - startTime).toBeLessThan(100) // 100ms threshold
  })
})
```

## Pull Request Process

### Before Submitting

1. **Sync with upstream:**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run full quality check:**

   ```bash
   npm run test:coverage
   npm run type-check
   npm run lint:fix
   npm run format:fix
   npm run build
   ```

3. **Test your changes:**
   - Test in development mode
   - Test production build locally
   - Verify accessibility with screen reader

### Pull Request Template

Include in your PR description:

```markdown
## Description

Brief description of changes and motivation.

## Type of Change

- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Security fix

## Testing

- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Coverage meets 70% threshold
- [ ] Accessibility tests pass

## Performance Impact

- [ ] No negative impact on Core Web Vitals
- [ ] Bundle size impact acceptable
- [ ] Loading performance tested

## Security Considerations

- [ ] Input validation implemented
- [ ] Rate limiting applied (if applicable)
- [ ] Security headers included
- [ ] No sensitive data exposed

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented where necessary
- [ ] Documentation updated if needed
```

### Review Process

1. **Automated checks** must pass:
   - TypeScript compilation
   - Linting and formatting
   - Test coverage (70%+)
   - Build verification

2. **Manual review** focuses on:
   - Code quality and patterns
   - Security considerations
   - Performance impact
   - Accessibility compliance

3. **Testing verification:**
   - Reviewer tests functionality
   - Performance impact assessed
   - Security implications reviewed

## Performance Guidelines

### Core Web Vitals Requirements

Every change must consider impact on:

- **LCP (Largest Contentful Paint)**: ≤ 2.5s
- **INP (Interaction to Next Paint)**: ≤ 200ms
- **CLS (Cumulative Layout Shift)**: ≤ 0.1
- **FCP (First Contentful Paint)**: ≤ 1.8s
- **TTFB (Time to First Byte)**: ≤ 800ms

### Performance Best Practices

1. **Image optimization:**

   ```typescript
   // Always use OptimizedImage component
   import OptimizedImage from 'app/components/optimized-image'

   <OptimizedImage
     src="/images/example.jpg"
     alt="Description"
     width={800}
     height={600}
     priority={isAboveFold}
   />
   ```

2. **Font loading:**

   ```typescript
   // Use font optimization utilities
   import { initializeFontOptimization } from 'lib/font-optimization'

   useEffect(() => {
     initializeFontOptimization()
   }, [])
   ```

3. **Code splitting:**

   ```typescript
   // Dynamic imports for heavy components
   const HeavyComponent = dynamic(() => import('./heavy-component'), {
     loading: () => <LoadingSpinner />
   })
   ```

4. **Bundle optimization:**
   - Prefer smaller dependencies
   - Use tree shaking friendly imports
   - Avoid unnecessary re-renders

## Security Requirements

### Input Validation

All user inputs must be validated:

```typescript
import { z } from 'zod'

const UserInputSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().min(1).max(100),
  message: z.string().min(1).max(1000),
})
```

### API Security

All API routes must implement:

1. **Rate limiting** (10 requests/minute default)
2. **Input validation** with Zod schemas
3. **Security headers** from `lib/security.ts`
4. **Proper error handling** (no information leakage)

### Security Headers

Include security headers in all responses:

```typescript
import { getSecurityHeaders } from 'lib/security'

return NextResponse.json(data, {
  headers: getSecurityHeaders(),
})
```

## Documentation Standards

### Code Documentation

- **Complex logic** must include comments
- **Public APIs** must have JSDoc comments
- **Component props** must be documented via TypeScript interfaces

```typescript
/**
 * Performance monitoring component that tracks Core Web Vitals
 * and custom performance metrics.
 *
 * @param children - Child components to monitor
 * @param trackingId - Unique identifier for this monitoring instance
 */
interface PerformanceMonitorProps {
  /** Child components to render and monitor */
  children: React.ReactNode
  /** Unique identifier for tracking this component's performance */
  trackingId?: string
}
```

### README Updates

When adding new features:

1. **Update relevant documentation**
2. **Add usage examples**
3. **Include performance considerations**
4. **Document any breaking changes**

### Architecture Documentation

For significant changes:

1. **Update architecture documentation**
2. **Document design decisions**
3. **Include migration guides if needed**

## Getting Help

### Resources

- **[Getting Started Guide](./docs/getting-started.md)** - Complete onboarding tutorial
- **[Architecture Guide](./docs/architecture.md)** - System design and decisions
- **[API Reference](./docs/reference.md)** - Technical specifications
- **[Troubleshooting Guide](./docs/troubleshooting.md)** - Common issues and solutions

### Communication

- **GitHub Discussions** - For questions and feature discussions
- **GitHub Issues** - For bug reports and feature requests
- **Pull Request Comments** - For code-specific discussions

### Mentorship

New contributors are welcome! If you're new to:

- **Next.js** - Check the getting started guide
- **TypeScript** - Review existing code patterns
- **Testing** - Look at existing test files for examples
- **Performance optimization** - Review the architecture guide

## Recognition

Contributors who follow these guidelines and make meaningful contributions will be:

- **Acknowledged** in commit messages and PR descriptions
- **Credited** in project documentation
- **Invited** to participate in project decisions
- **Considered** for maintainer roles based on ongoing contributions

## Questions?

If you have questions about contributing:

1. **Check existing documentation** first
2. **Search closed issues** for similar questions
3. **Create a GitHub discussion** for general questions
4. **Create a GitHub issue** for specific problems

Thank you for contributing to Bidwell Consulting! Your contributions help demonstrate modern web development best practices and create value for the community.

---

**Remember:** Quality over quantity. We prefer well-tested, secure, performant contributions that follow our established patterns over quick fixes that compromise our standards.
