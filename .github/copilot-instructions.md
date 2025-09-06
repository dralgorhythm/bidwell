# Copilot Instructions for Bidwell Consulting Development

## 📚 Documentation Reference

**IMPORTANT**: Before making any changes, consult these comprehensive guides organized by purpose:

### 📋 Essential Entry Points

- **[README.md](../README.md)** - Project overview and navigation hub to all documentation
- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Comprehensive contribution guidelines and standards

### 🎓 Learning & Onboarding

- **[docs/getting-started.md](../docs/getting-started.md)** - Complete step-by-step onboarding tutorial for new developers
- **[docs/architecture.md](../docs/architecture.md)** - System design, decisions, and technical philosophy

### 🔧 Development & Operations

- **[DEVELOPMENT.md](../DEVELOPMENT.md)** - Complete development workflows, build system, and CI/CD processes
- **[TESTING.md](../TESTING.md)** - Testing strategy, coverage requirements, and execution guide
- **[DEPLOYMENT.md](../DEPLOYMENT.md)** - Deployment strategies and platform-specific configurations

### 📖 Reference & Troubleshooting

- **[docs/reference.md](../docs/reference.md)** - Complete API reference, technical specifications, and development patterns
- **[docs/troubleshooting.md](../docs/troubleshooting.md)** - Common issues, debugging techniques, and solutions

## Project Context

This is a **production-ready, enterprise-level Next.js 15 application** demonstrating modern web development best practices. It serves as both a functional business website and a showcase of advanced technical expertise.

### Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript 5.8.3 (strict mode)
- **Styling**: Tailwind CSS v4.1.7
- **Font**: Geist Sans & Mono (Vercel's design system)
- **Testing**: Jest 29.7.0 + Testing Library (70% coverage requirement)
- **Package Manager**: npm
- **Deployment**: Vercel (primary) + GitHub Pages (static export)

### Code Standards & Architecture

- **TypeScript Strict Mode**: Use TypeScript for all new files with strict type checking
- **Server-First Architecture**: Use server components by default, only add 'use client' when necessary for interactivity, state, or browser APIs
- **Performance-First**: Every decision must consider Core Web Vitals impact (LCP, INP, CLS, FCP, TTFB)
- **Security-by-Design**: Implement input validation, security headers, and rate limiting for all user-facing features
- **Accessibility-First**: Ensure WCAG 2.1 AA compliance with semantic HTML and proper ARIA labels
- **Test-Driven Development**: Write tests before implementing features (70% coverage requirement)

### Critical File Structure Conventions

```text
app/                          # Next.js App Router
├── components/               # Reusable UI components
├── comparison/               # Feature: Number comparison tool
├── api/                      # API routes with security & validation
│   ├── health/              # Health check endpoint
│   └── analytics/           # Performance metrics collection
├── layout.tsx               # Root layout with comprehensive metadata
├── page.tsx                 # Homepage with SEO optimization
└── global.css               # Global styles + Tailwind

lib/                         # Utility libraries (CRITICAL)
├── performance.ts           # Core Web Vitals optimization
├── font-optimization.ts     # Advanced font loading strategies
├── security.ts              # Security utilities & headers
├── validation.ts            # Zod schemas for input validation
└── env.ts                   # Environment validation

__tests__/                   # Comprehensive test suite
├── components/              # Component unit tests
├── integration/             # Integration tests
├── lib/                     # Library tests
└── utils/                   # Test utilities
```

### Next.js 15 Advanced Patterns

1. **Performance & Core Web Vitals**
   - Use `OptimizedImage` component from `app/components/optimized-image.tsx`
   - Implement font optimization with `lib/font-optimization.ts` utilities
   - Leverage performance monitoring with `lib/performance.ts`
   - Preload critical resources using performance utilities
   - Consider layout shift prevention in all UI changes

2. **Security Implementation**
   - **All API routes MUST**: Include rate limiting using `lib/validation.ts`
   - **All user inputs MUST**: Be validated with Zod schemas from `lib/validation.ts`
   - **All API responses MUST**: Include security headers from `lib/security.ts`
   - **Example secure API pattern**:

   ```typescript
   import { getSecurityHeaders, getClientIP } from 'lib/security'
   import { createRateLimit, checkRateLimit } from 'lib/validation'

   const rateLimit = createRateLimit(10, 60 * 1000) // 10 req/min

   export async function POST(request: NextRequest) {
     const clientIP = getClientIP(request)
     const rateLimitResult = checkRateLimit(rateLimit, clientIP)

     if (!rateLimitResult.allowed) {
       return NextResponse.json(
         { error: 'Too many requests' },
         { status: 429, headers: getSecurityHeaders() }
       )
     }
     // ... rest of implementation
   }
   ```

3. **SEO & Metadata Excellence**
   - **Every page MUST** include comprehensive metadata using `generateMetadata`
   - Include OpenGraph images using `/og` dynamic route
   - Implement structured data with `StructuredData` component
   - Follow the metadata pattern from existing pages

4. **Component Architecture**
   - **Server Components**: Default choice for all new components
   - **Client Components**: Only when using hooks, state, or browser APIs
   - **Accessibility**: Use semantic HTML, ARIA labels, keyboard navigation
   - **Performance**: Consider render performance and bundle size impact

### Advanced Component Patterns

- **Performance Components**: Use `PerformanceMonitor` and `PerformanceDashboard` for monitoring
- **Font Loading**: Initialize with `initializeFontOptimization()` from `lib/font-optimization.ts`
- **Image Optimization**: Always use `OptimizedImage` component instead of Next.js Image directly
- **Error Boundaries**: Implement comprehensive error handling with proper user feedback
- **Loading States**: Use React Suspense and loading.tsx for optimal UX
- **Accessibility**: Every interactive element must be keyboard accessible and screen reader friendly

### API Development Excellence

- **Security-First**: Every API route must implement rate limiting and input validation
- **Type Safety**: Use TypeScript interfaces for all request/response types
- **Error Handling**: Implement proper HTTP status codes and error messages
- **Performance**: Monitor API response times and implement caching where appropriate
- **Testing**: Write comprehensive tests for all API endpoints

### Advanced Testing Strategy

- **Test-Driven Development**: Write tests BEFORE implementing features
- **Coverage Requirements**: Maintain 70% coverage across all metrics
- **Test Types Required**:
  - **Unit Tests**: Component functionality and business logic
  - **Integration Tests**: Full user journeys and component interactions
  - **Accessibility Tests**: Automated WCAG compliance with jest-axe
  - **Performance Tests**: Render performance and memory usage
  - **Security Tests**: Input validation and vulnerability testing

### Performance Optimization Workflow

1. **Before Any Change**: Consider Core Web Vitals impact
2. **Font Loading**: Use critical font subset loading for above-the-fold content
3. **Image Optimization**: Implement responsive images with proper aspect ratios
4. **Bundle Analysis**: Monitor JavaScript bundle size and loading performance
5. **Monitoring**: Track real-user performance metrics with analytics

### Development Workflow & Quality Assurance

- **Documentation First**: Consult reference docs before making changes
- **Test-Driven**: Write tests before implementing features
- **Security Conscious**: Every user input must be validated, every API must have rate limiting
- **Performance Aware**: Consider Core Web Vitals impact of every change
- **Accessibility Priority**: Test with screen readers and keyboard navigation
- **Type Safety**: Use TypeScript strict mode, no `any` types allowed
- **Code Quality**: Run `npm run lint:fix` and `npm run format:fix` before committing
- **Coverage Validation**: Ensure `npm run test:coverage` meets 70% threshold
- **Build Verification**: Always run `npm run build` to verify production compatibility

### Pager Usage Guidelines

- **Exit less properly**: When you see `(END)` or the less prompt, press `q` to quit.
- **Use `--no-pager` flag**: For GitHub CLI commands, add `--no-pager` to avoid the pager entirely.
- **Be more aware**: Watch for pager indicators and exit them promptly.

### Pre-Commit Quality Checklist

```bash
# Required checks before any commit
npm run test:coverage    # Verify 70% test coverage
npm run type-check       # TypeScript compilation check
npm run lint:fix         # Auto-fix linting issues
npm run format:fix       # Format code consistently
npm run build            # Verify production build
```

### Security Implementation Requirements

- **Input Validation**: All user inputs must use Zod schemas from `lib/validation.ts`
- **Rate Limiting**: All API endpoints must implement rate limiting
- **Security Headers**: All responses must include headers from `lib/security.ts`
- **Content Security Policy**: Maintained in `middleware.ts` - consult before changes
- **Environment Variables**: Use `lib/env.ts` for environment validation
- **Error Handling**: Never expose internal errors to users

### Common Development Tasks

When asked to:

- **Add a new page**: Create in `app/` with comprehensive metadata following existing patterns
- **Add an API endpoint**: Create in `app/api/` with security, validation, and proper types
- **Create components**: Use TypeScript, proper naming, accessibility, and reusability
- **Style components**: Use Tailwind CSS v4 with consistent design patterns
- **Optimize performance**: Leverage performance utilities and monitoring
- **Add tests**: Follow TDD approach with comprehensive test coverage
- **Handle forms**: Implement with Zod validation and proper error handling
- **Add images**: Use `OptimizedImage` component with proper aspect ratios

### Advanced Performance Patterns

- **Font Loading**: Use `initializeFontOptimization()` in client components
- **Image Preloading**: Use `preloadCriticalResources()` for above-the-fold content
- **Code Splitting**: Dynamic imports for heavy components with loading states
- **Caching**: Implement proper cache headers and revalidation strategies
- **Bundle Analysis**: Monitor bundle size impact of new dependencies

### Security Best Practices

- **API Routes**: Always include rate limiting and input validation
- **Client Components**: Validate all props and user interactions
- **Environment Variables**: Use `lib/env.ts` for validation and type safety
- **Error Handling**: Implement graceful failures without information leakage
- **Dependencies**: Regular security audits and updates

### Accessibility Excellence

- **WCAG 2.1 AA Compliance**: Test all new features with screen readers
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **ARIA Labels**: Provide proper ARIA labels and roles for dynamic content
- **Color Contrast**: Maintain proper contrast ratios for all text
- **Focus Management**: Implement proper focus states and management
- **Semantic HTML**: Use appropriate HTML elements for their intended purpose

### Testing Excellence

- **Test-First Development**: Write tests before implementation
- **Coverage Requirements**: Maintain 70% coverage across all test types
- **Test Categories**: Unit, integration, accessibility, performance, security
- **Mocking Strategy**: Proper mocking of external dependencies and APIs
- **Async Testing**: Proper handling of async operations in tests
- **Test Utilities**: Use shared test utilities from `__tests__/utils/`

### Continuous Integration

- **Automated Quality**: All PRs must pass quality checks
- **Performance Monitoring**: Track Core Web Vitals in production
- **Security Scanning**: Regular dependency and vulnerability scans
- **Accessibility Auditing**: Automated accessibility testing in CI
- **Type Safety**: Strict TypeScript compilation in CI pipeline

### 📝 Communication & Response Style

**DO:**

- Focus on immediate action and implementation
- Provide direct solutions and code changes
- Use PRs for collaboration and iteration
- Give brief, action-oriented responses
- Move quickly from analysis to implementation

**AVOID:**

- Lengthy summaries of work completed
- Extensive documentation of changes made
- Over-explaining obvious implementations
- Waiting for confirmation before taking standard development actions
- Verbose progress reports

## 🎯 Development Philosophy & Workflow

This codebase prioritizes:

1. **User Experience**: Performance, accessibility, and usability
2. **Developer Experience**: Clear patterns, comprehensive testing, good documentation
3. **Security**: Defense in depth with multiple security layers
4. **Performance**: Core Web Vitals optimization at every level
5. **Maintainability**: Clean code, proper typing, comprehensive tests

### 🚀 Rapid Development Workflow

**PREFERRED APPROACH: Pull Request Workflow**

- **Create feature branches** for all changes, no matter how small
- **Submit PRs immediately** for rapid iteration and feedback
- **Use draft PRs** for work-in-progress to enable early collaboration
- **Leverage automated workflows** for instant validation and deployment previews
- **Prefer multiple small PRs** over large monolithic changes

**AVOID:**

- Direct commits to main branch (except for urgent hotfixes)
- Large work summaries or extensive documentation of completed work
- Waiting for "perfect" solutions before submitting PRs

**DO:**

- Create PRs early and often for faster feedback cycles
- Use the optimized Development Pipeline for rapid validation
- Leverage automated quality checks and preview deployments
- Focus on incremental improvements and continuous delivery

Always prioritize rapid iteration, user experience, performance, accessibility, and maintainability in your development approach.

## 🆘 Getting Help & Documentation Navigation

### When You Need Information

**🆕 For New Contributors:**

1. Start with **[docs/getting-started.md](../docs/getting-started.md)** for complete onboarding
2. Review **[CONTRIBUTING.md](../CONTRIBUTING.md)** for contribution guidelines
3. Follow the recommended reading order in the getting started guide

**🏗️ For Development Work:**

1. **[DEVELOPMENT.md](../DEVELOPMENT.md)** - Development workflows and build system
2. **[docs/architecture.md](../docs/architecture.md)** - System design and technical decisions
3. **[docs/reference.md](../docs/reference.md)** - API reference and code patterns

**🔧 For Operations & Troubleshooting:**

1. **[TESTING.md](../TESTING.md)** - Testing strategy and requirements
2. **[DEPLOYMENT.md](../DEPLOYMENT.md)** - Deployment processes and configurations
3. **[docs/troubleshooting.md](../docs/troubleshooting.md)** - Common issues and solutions

### Problem-Solving Workflow

1. **Check [docs/troubleshooting.md](../docs/troubleshooting.md)** first for common issues
2. **Review [docs/architecture.md](../docs/architecture.md)** for design context
3. **Consult [docs/reference.md](../docs/reference.md)** for technical implementation details
4. **Follow [DEVELOPMENT.md](../DEVELOPMENT.md)** for build and workflow issues

### Quality Assurance Reminders

Always run before making suggestions:

```bash
npm run test:coverage    # Verify 70% test coverage
npm run type-check       # TypeScript compilation check
npm run lint:fix         # Auto-fix linting issues
npm run format:fix       # Format code consistently
npm run build            # Verify production build
```

Remember: This documentation structure eliminates duplication and provides single sources of truth for all information.
