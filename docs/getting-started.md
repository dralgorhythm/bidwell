# Getting Started with Bidwell Consulting Codebase

Welcome to the Bidwell Consulting project! This guide will walk you through everything you need to know to start contributing effectively to this enterprise-level Next.js application.

## What You'll Learn

By the end of this guide, you'll understand:

- The project architecture and key concepts
- How to set up your development environment
- How to run tests and ensure code quality
- How to contribute following project standards
- Where to find help when you need it

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18.x or 20.x** (LTS recommended) - [Download here](https://nodejs.org/)
- **npm 8.x or higher** (comes with Node.js)
- **Git** for version control
- **VS Code** (recommended editor) with suggested extensions

### Verify Your Setup

```bash
node --version    # Should show v18.x.x or v20.x.x
npm --version     # Should show 8.x.x or higher
git --version     # Any recent version
```

## Step 1: Clone and Initial Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd bidwell
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id" > .env.local
   ```

## Step 2: Understanding the Project

### Project Overview

This is a **production-ready, enterprise-level Next.js 15 portfolio website** for Bidwell Consulting that demonstrates:

- Software engineering expertise
- Organizational consulting services
- Modern web development best practices

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Testing**: Jest + Testing Library
- **Deployment**: Vercel + GitHub Pages

### Architecture Principles

- **Server-First**: Server components by default
- **Performance-First**: Core Web Vitals optimization
- **Security-by-Design**: Input validation, rate limiting, security headers
- **Accessibility-First**: WCAG 2.1 AA compliance
- **Test-Driven**: 70% coverage requirement

## Step 3: Explore the Codebase

### Key Directories

```text
app/                    # Next.js App Router
├── components/         # Reusable UI components
├── comparison/         # Feature: Number comparison tool
├── api/               # API routes with security
└── ...

lib/                   # Utility libraries (CRITICAL)
├── performance.ts     # Core Web Vitals optimization
├── security.ts        # Security utilities
├── validation.ts      # Input validation schemas
└── ...

__tests__/             # Comprehensive test suite
├── components/        # Component tests
├── integration/       # Integration tests
└── ...
```

### Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site running locally.

## Step 4: Development Workflow

### Before Making Changes

Always run the pre-commit checklist:

```bash
npm run test:coverage    # Verify 70% test coverage
npm run type-check       # TypeScript compilation
npm run lint:fix         # Auto-fix linting issues
npm run format:fix       # Format code consistently
npm run build            # Verify production build
```

### Making Your First Change

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Write tests first** (Test-Driven Development):

   ```bash
   # Create test file
   touch __tests__/components/your-component.test.tsx
   npm run test:watch     # Run tests in watch mode
   ```

3. **Implement your feature** following project patterns

4. **Verify quality:**
   ```bash
   npm run test:coverage  # Ensure tests pass and coverage maintained
   npm run type-check     # No TypeScript errors
   npm run build          # Production build works
   ```

## Step 5: Understanding Key Patterns

### Component Development

**Server Components (Default):**

```typescript
// app/components/example.tsx
interface ExampleProps {
  title: string
}

export default function Example({ title }: ExampleProps) {
  return <h1 className="text-2xl font-semibold">{title}</h1>
}
```

**Client Components (When Needed):**

```typescript
// app/components/interactive-example.tsx
'use client'

import { useState } from 'react'

export default function InteractiveExample() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### API Development (Security-First)

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSecurityHeaders, getClientIP } from 'lib/security'
import { createRateLimit, checkRateLimit } from 'lib/validation'

const rateLimit = createRateLimit(10, 60 * 1000) // 10 req/min

export async function POST(request: NextRequest) {
  // Always implement rate limiting
  const clientIP = getClientIP(request)
  const rateLimitResult = checkRateLimit(rateLimit, clientIP)

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: getSecurityHeaders() }
    )
  }

  // Your API logic here
  return NextResponse.json({ success: true }, { headers: getSecurityHeaders() })
}
```

### Testing Patterns

```typescript
// __tests__/components/example.test.tsx
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Example from 'app/components/example'

expect.extend(toHaveNoViolations)

describe('Example Component', () => {
  it('renders correctly', () => {
    render(<Example title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Example title="Test" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Step 6: Common Development Tasks

### Adding a New Page

1. Create in `app/` directory
2. Include comprehensive metadata
3. Use server components by default
4. Add proper TypeScript types
5. Write tests for the page

### Adding a New Component

1. Create in `app/components/`
2. Use TypeScript with proper interfaces
3. Include accessibility features
4. Write comprehensive tests
5. Use Tailwind for styling

### Adding an API Endpoint

1. Create in `app/api/`
2. Implement rate limiting and validation
3. Include security headers
4. Add proper error handling
5. Write API tests

## Step 7: Quality Standards

### Code Quality Requirements

- **TypeScript**: Strict mode, no `any` types
- **Testing**: 70% coverage minimum
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Core Web Vitals optimization
- **Security**: Input validation, rate limiting

### Performance Considerations

- Every change must consider Core Web Vitals impact
- Use `OptimizedImage` component for images
- Implement proper loading states
- Consider bundle size impact

### Security Requirements

- All user inputs must be validated with Zod schemas
- All API endpoints must have rate limiting
- All responses must include security headers
- Never expose internal errors to users

## Step 8: Getting Help

### Documentation Resources

- **[Architecture Guide](./architecture.md)** - System design and decisions
- **[API Reference](./reference.md)** - Technical reference documentation
- **[Troubleshooting](./troubleshooting.md)** - Common issues and solutions
- **[Contributing Guidelines](../CONTRIBUTING.md)** - Contribution process
- **[Development Guide](../DEVELOPMENT.md)** - Development workflows

### When You're Stuck

1. **Check the troubleshooting guide** for common issues
2. **Review existing code** for similar patterns
3. **Run the test suite** to understand expected behavior
4. **Check the architecture guide** for design context
5. **Look at the API reference** for technical details

### Code Quality Tools

```bash
npm run test:watch      # Interactive testing
npm run type-check      # TypeScript validation
npm run lint:fix        # Auto-fix style issues
npm run format:fix      # Auto-format code
```

## Next Steps

Now that you have the basics:

1. **Explore the codebase** - Look at existing components and patterns
2. **Read the architecture guide** - Understand design decisions
3. **Try making a small change** - Follow the workflow above
4. **Review the contributing guidelines** - Understand the full process
5. **Join the development workflow** - Start contributing!

### Recommended Reading Order

1. This getting started guide (you're here!)
2. [Architecture Guide](./architecture.md) - Understand the system
3. [API Reference](./reference.md) - Learn the technical details
4. [Contributing Guidelines](../CONTRIBUTING.md) - Understand the process
5. [Development Guide](../DEVELOPMENT.md) - Master the workflows

## Welcome to the Team! 🎉

You're now ready to contribute to the Bidwell Consulting codebase. Remember:

- **Ask questions** when you're unsure
- **Follow the patterns** established in the codebase
- **Write tests first** using Test-Driven Development
- **Prioritize user experience** in every change
- **Maintain high quality standards** throughout

Happy coding!
