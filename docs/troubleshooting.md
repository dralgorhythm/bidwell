# Troubleshooting Guide

This guide covers common issues, debugging techniques, and solutions for the Bidwell Consulting codebase.

## Table of Contents

- [Build Issues](#build-issues)
- [Development Environment](#development-environment)
- [Testing Problems](#testing-problems)
- [Performance Issues](#performance-issues)
- [Deployment Problems](#deployment-problems)
- [Security & Validation](#security--validation)
- [TypeScript Errors](#typescript-errors)
- [Debugging Tools](#debugging-tools)

## Build Issues

### Static Export Build Failures

**Problem:** Build fails when trying to create static export for GitHub Pages deployment.

**Symptoms:**

```bash
Error: Page "/api/health" is not compatible with export
Error: Page "/api/analytics" has dynamic imports
```

**Solution:**
Use the specialized build script for static export:

```bash
# Instead of
npm run build

# Use
npm run build:static
```

**Why it works:**

- Temporarily moves API routes during static build
- Automatically restores API routes after build
- Sets proper environment variables for static export

### Next.js Configuration Conflicts

**Problem:** Duplicate webpack configurations or incompatible settings.

**Symptoms:**

```bash
Error: Configuration object is not valid
TypeError: Cannot read property 'splitChunks' of undefined
```

**Solution:**
Check `next.config.js` for:

```javascript
// ❌ Wrong: Multiple webpack functions
module.exports = {
  webpack: config => {
    /* config 1 */
  },
  webpack: config => {
    /* config 2 */
  }, // This overwrites the first one
}

// ✅ Correct: Single consolidated webpack function
module.exports = {
  webpack: config => {
    // Merge all webpack configurations here
    config.optimization.splitChunks = {
      /* settings */
    }
    return config
  },
}
```

### Image Optimization Errors

**Problem:** Image optimization fails during static export.

**Symptoms:**

```bash
Error: Image optimization using Next.js' default loader is not compatible with export
```

**Solution:**
Configure conditional image optimization:

```javascript
// next.config.js
const nextConfig = {
  images: {
    unoptimized: process.env.GITHUB_ACTIONS === 'true',
    formats: ['image/avif', 'image/webp'],
  },
}
```

### API Route Dynamic Export Conflicts

**Problem:** API routes with dynamic exports conflict with static generation.

**Symptoms:**

```bash
Error: export const dynamic = 'force-dynamic' is not compatible with output: 'export'
```

**Solution:**
Remove explicit dynamic exports from API routes:

```typescript
// ❌ Remove this from API routes
export const dynamic = 'force-dynamic'

// ✅ Next.js automatically detects API routes as dynamic
export async function GET() {
  // Your API logic
}
```

## Development Environment

### Node.js Version Issues

**Problem:** Compatibility issues with Node.js versions.

**Symptoms:**

```bash
Error: Unsupported Node.js version
TypeError: fetch is not defined (Node.js < 18)
```

**Solution:**

1. **Check your Node.js version:**

   ```bash
   node --version
   ```

2. **Use Node.js 18.x or 20.x (LTS):**

   ```bash
   # Using nvm
   nvm install 20
   nvm use 20

   # Or download from nodejs.org
   ```

3. **Clear npm cache if switching versions:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Module Resolution Errors

**Problem:** TypeScript can't find modules or path aliases don't work.

**Symptoms:**

```bash
Error: Cannot find module 'lib/performance'
Error: Module not found: Can't resolve '@/components/Header'
```

**Solution:**

1. **Check `tsconfig.json` path mapping:**

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"],
         "app/*": ["./app/*"],
         "lib/*": ["./lib/*"]
       }
     }
   }
   ```

2. **Restart TypeScript server in VS Code:**

   - `Cmd/Ctrl + Shift + P`
   - "TypeScript: Restart TS Server"

3. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

### Environment Variables Not Loading

**Problem:** Environment variables are undefined in application.

**Symptoms:**

```typescript
console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID) // undefined
```

**Solution:**

1. **Check file naming:**

   ```bash
   # ✅ Correct
   .env.local

   # ❌ Wrong
   .env.development
   env.local
   ```

2. **Verify prefix for client-side variables:**

   ```bash
   # ✅ Accessible in browser
   NEXT_PUBLIC_ANALYTICS_ID=value

   # ❌ Server-only
   ANALYTICS_ID=value
   ```

3. **Restart development server:**
   ```bash
   # Stop server (Ctrl+C) then
   npm run dev
   ```

## Testing Problems

### Test Coverage Below Threshold

**Problem:** Test coverage fails to meet 70% requirement.

**Symptoms:**

```bash
Jest: Coverage threshold for branches (70%) not met: 65%
```

**Solution:**

1. **Identify uncovered code:**

   ```bash
   npm run test:coverage
   # Open coverage/lcov-report/index.html in browser
   ```

2. **Add tests for uncovered branches:**

   ```typescript
   // Test both success and error cases
   it('handles API success', async () => {
     // Test success path
   })

   it('handles API error', async () => {
     // Test error path
   })
   ```

3. **Focus on business logic:**
   - Component interactions
   - API route logic
   - Utility functions
   - Error handling

### Jest Configuration Issues

**Problem:** Tests fail to run or can't find modules.

**Symptoms:**

```bash
Error: Cannot find module 'app/components/Header'
SyntaxError: Cannot use import statement outside a module
```

**Solution:**

1. **Check `jest.config.js` module mapping:**

   ```javascript
   module.exports = {
     moduleNameMapping: {
       '^@/(.*)$': '<rootDir>/$1',
       '^app/(.*)$': '<rootDir>/app/$1',
       '^lib/(.*)$': '<rootDir>/lib/$1',
     },
   }
   ```

2. **Verify Jest setup file:**

   ```javascript
   // jest.setup.js
   import '@testing-library/jest-dom'

   // Mock Next.js router
   jest.mock('next/navigation', () => ({
     useRouter: () => ({
       push: jest.fn(),
       replace: jest.fn(),
     }),
   }))
   ```

### Accessibility Test Failures

**Problem:** jest-axe reports accessibility violations.

**Symptoms:**

```bash
Expected no accessibility violations but received 2
- Form elements must have labels
- Images must have alternate text
```

**Solution:**

1. **Add proper labels:**

   ```tsx
   // ❌ Missing label
   <input type="text" />

   // ✅ With label
   <label htmlFor="email">Email</label>
   <input id="email" type="text" />

   // ✅ With aria-label
   <input type="text" aria-label="Search" />
   ```

2. **Add alt text to images:**

   ```tsx
   // ❌ Missing alt
   <img src="/image.jpg" />

   // ✅ With alt text
   <img src="/image.jpg" alt="Description of image" />
   ```

3. **Test interactively:**
   ```bash
   npm run test:watch -- --testNamePattern="accessibility"
   ```

## Performance Issues

### Slow Bundle Size

**Problem:** JavaScript bundle is too large, affecting performance.

**Symptoms:**

- Lighthouse performance score < 90
- First Contentful Paint > 3 seconds
- Large bundle warnings during build

**Solution:**

1. **Analyze bundle:**

   ```bash
   npm run build
   # Check bundle analyzer output
   ```

2. **Use dynamic imports:**

   ```typescript
   // ❌ Static import of heavy component
   import HeavyComponent from './heavy-component'

   // ✅ Dynamic import
   const HeavyComponent = dynamic(() => import('./heavy-component'), {
     loading: () => <div>Loading...</div>
   })
   ```

3. **Optimize dependencies:**

   ```bash
   # Check bundle size impact
   npx bundlephobia <package-name>

   # Consider lighter alternatives
   npm uninstall moment
   npm install date-fns  # Lighter alternative
   ```

### Font Loading Issues

**Problem:** Flash of Unstyled Text (FOUT) or Cumulative Layout Shift.

**Symptoms:**

- Text appears without fonts then snaps to custom font
- Layout Shift score > 0.1 in Lighthouse

**Solution:**

1. **Use font optimization:**

   ```typescript
   // In layout.tsx or component
   import { initializeFontOptimization } from 'lib/font-optimization'

   useEffect(() => {
     initializeFontOptimization()
   }, [])
   ```

2. **Preload critical fonts:**

   ```tsx
   // In layout.tsx
   <link
     rel='preload'
     href='/fonts/geist-sans.woff2'
     as='font'
     type='font/woff2'
     crossOrigin='anonymous'
   />
   ```

3. **Use proper font-display:**
   ```css
   @font-face {
     font-family: 'Geist Sans';
     font-display: swap; /* Prevents invisible text */
     src: url('/fonts/geist-sans.woff2') format('woff2');
   }
   ```

### Memory Leaks

**Problem:** Application memory usage grows over time.

**Symptoms:**

- Browser becomes slow after prolonged use
- React DevTools shows increasing component count

**Solution:**

1. **Clean up effects:**

   ```typescript
   useEffect(() => {
     const timer = setInterval(() => {
       // Some logic
     }, 1000)

     // ✅ Cleanup
     return () => clearInterval(timer)
   }, [])
   ```

2. **Remove event listeners:**

   ```typescript
   useEffect(() => {
     const handleResize = () => {
       // Handle resize
     }

     window.addEventListener('resize', handleResize)

     // ✅ Cleanup
     return () => window.removeEventListener('resize', handleResize)
   }, [])
   ```

## Deployment Problems

### Vercel Deployment Failures

**Problem:** Deployment fails on Vercel platform.

**Symptoms:**

```bash
Error: Command failed with exit code 1
Build failed due to TypeScript errors
```

**Solution:**

1. **Check build locally:**

   ```bash
   npm run build
   npm run type-check
   ```

2. **Verify environment variables:**

   - Check Vercel dashboard settings
   - Ensure all required variables are set

3. **Check Vercel function limits:**
   - API routes must be under size/time limits
   - Consider serverless function optimization

### GitHub Pages Deployment Issues

**Problem:** Static export deployment fails on GitHub Pages.

**Symptoms:**

```bash
Error: The process '/usr/bin/git' failed with exit code 1
Pages deployment failed
```

**Solution:**

1. **Use correct build command:**

   ```yaml
   # .github/workflows/deploy.yml
   - name: Build
     run: npm run build:static
     env:
       GITHUB_ACTIONS: true
   ```

2. **Check GitHub Pages settings:**

   - Source: GitHub Actions
   - Custom domain configured correctly

3. **Verify output directory:**
   ```yaml
   - name: Upload Pages artifact
     uses: actions/upload-pages-artifact@v2
     with:
       path: ./out # Static export directory
   ```

### CORS Issues

**Problem:** API requests fail due to CORS policy.

**Symptoms:**

```bash
Access to fetch at 'https://api.example.com' from origin 'https://bidwell.info' has been blocked by CORS policy
```

**Solution:**

1. **Configure CORS headers:**

   ```typescript
   // In API route
   return NextResponse.json(data, {
     headers: {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type',
     },
   })
   ```

2. **Use Next.js API routes as proxy:**
   ```typescript
   // app/api/proxy/route.ts
   export async function GET() {
     const response = await fetch('https://external-api.com/data')
     const data = await response.json()
     return NextResponse.json(data)
   }
   ```

## Security & Validation

### Rate Limiting Not Working

**Problem:** API endpoints don't enforce rate limits.

**Symptoms:**

- Unlimited requests allowed
- No rate limit headers in response

**Solution:**

1. **Verify rate limit implementation:**

   ```typescript
   import { createRateLimit, checkRateLimit } from 'lib/validation'

   const rateLimit = createRateLimit(10, 60 * 1000)

   export async function POST(request: NextRequest) {
     const clientIP = getClientIP(request)
     const result = checkRateLimit(rateLimit, clientIP)

     if (!result.allowed) {
       return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
     }
     // Continue with request
   }
   ```

2. **Check IP extraction:**
   ```typescript
   // Ensure getClientIP works in your environment
   const clientIP = getClientIP(request)
   console.log('Client IP:', clientIP) // Should not be undefined
   ```

### Input Validation Bypassed

**Problem:** Invalid data reaches API handlers.

**Symptoms:**

- Type errors in API handlers
- Unexpected data formats

**Solution:**

1. **Always validate input:**

   ```typescript
   import { z } from 'zod'

   const RequestSchema = z.object({
     email: z.string().email(),
     message: z.string().min(1).max(1000),
   })

   export async function POST(request: NextRequest) {
     try {
       const body = await request.json()
       const validatedData = RequestSchema.parse(body)
       // Use validatedData safely
     } catch (error) {
       if (error instanceof z.ZodError) {
         return NextResponse.json(
           { error: 'Invalid input', details: error.errors },
           { status: 400 }
         )
       }
     }
   }
   ```

2. **Validate on both client and server:**
   ```typescript
   // Client-side validation (UX)
   const handleSubmit = data => {
     try {
       RequestSchema.parse(data)
       // Submit to API
     } catch (error) {
       // Show validation errors
     }
   }
   ```

### Security Headers Missing

**Problem:** Security headers not applied to responses.

**Symptoms:**

- Security scanners report missing headers
- Browser security warnings

**Solution:**

1. **Use security header utility:**

   ```typescript
   import { getSecurityHeaders } from 'lib/security'

   return NextResponse.json(data, {
     headers: getSecurityHeaders(),
   })
   ```

2. **Verify middleware configuration:**

   ```typescript
   // middleware.ts
   import { NextResponse } from 'next/server'

   export function middleware(request: NextRequest) {
     const response = NextResponse.next()

     // Apply security headers
     response.headers.set('X-Frame-Options', 'DENY')
     response.headers.set('X-Content-Type-Options', 'nosniff')

     return response
   }
   ```

## TypeScript Errors

### Strict Mode Violations

**Problem:** TypeScript strict mode catches type issues.

**Symptoms:**

```bash
Error: Argument of type 'string | undefined' is not assignable to parameter of type 'string'
Error: Object is possibly 'null'
```

**Solution:**

1. **Handle undefined values:**

   ```typescript
   // ❌ Might be undefined
   const value = process.env.SOME_VALUE
   doSomething(value)

   // ✅ Handle undefined
   const value = process.env.SOME_VALUE || 'default'
   doSomething(value)

   // ✅ Or use optional chaining
   if (process.env.SOME_VALUE) {
     doSomething(process.env.SOME_VALUE)
   }
   ```

2. **Handle null values:**

   ```typescript
   // ❌ Might be null
   const element = document.getElementById('my-id')
   element.addEventListener('click', handler)

   // ✅ Handle null
   const element = document.getElementById('my-id')
   if (element) {
     element.addEventListener('click', handler)
   }
   ```

### Type Import Issues

**Problem:** TypeScript can't find type definitions.

**Symptoms:**

```bash
Error: Could not find a declaration file for module 'some-package'
Error: Module '"next"' has no exported member 'Metadata'
```

**Solution:**

1. **Install type definitions:**

   ```bash
   npm install --save-dev @types/node
   npm install --save-dev @types/react
   ```

2. **Use proper imports:**

   ```typescript
   // ✅ Type-only import
   import type { Metadata } from 'next'

   // ✅ Combined import
   import { NextRequest, type NextResponse } from 'next/server'
   ```

## Debugging Tools

### VS Code Debugging

1. **Create debug configuration:**

   ```json
   // .vscode/launch.json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Next.js: debug server-side",
         "type": "node",
         "request": "attach",
         "port": 9229
       }
     ]
   }
   ```

2. **Start debug mode:**
   ```bash
   NODE_OPTIONS='--inspect' npm run dev
   ```

### Browser DevTools

1. **Performance profiling:**

   - Open DevTools → Performance tab
   - Record page interaction
   - Analyze Core Web Vitals

2. **Network analysis:**

   - Check resource loading order
   - Identify slow requests
   - Verify caching headers

3. **Accessibility testing:**
   - DevTools → Lighthouse → Accessibility
   - DevTools → Elements → Accessibility panel

### Command Line Debugging

```bash
# TypeScript debugging
npm run type-check

# Test debugging
npm run test:watch -- --verbose

# Build debugging
DEBUG=next:* npm run build

# Performance debugging
npm run build -- --analyze
```

### Logging Best Practices

```typescript
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// Performance logging
console.time('expensive-operation')
await expensiveOperation()
console.timeEnd('expensive-operation')

// Error logging with context
try {
  await riskyOperation()
} catch (error) {
  console.error('Operation failed:', {
    error: error.message,
    context: { userId, timestamp: Date.now() },
  })
}
```

## Getting More Help

### When to Escalate

1. **Security vulnerabilities** - Report immediately
2. **Data corruption** - Stop and investigate before continuing
3. **Production outages** - Follow incident response procedure
4. **Persistent test failures** - May indicate breaking changes

### Resources

- **[Architecture Guide](./architecture.md)** - Understand system design
- **[API Reference](./reference.md)** - Technical implementation details
- **[Development Guide](../DEVELOPMENT.md)** - Development workflows
- **[GitHub Issues](https://github.com/dralgorhythm/bidwell/issues)** - Report bugs and request features

### Documentation Improvements

If you encountered an issue not covered here:

1. **Document the solution** - Add it to this guide
2. **Update related documentation** - Keep everything in sync
3. **Share with the team** - Help others avoid the same issue

---

Remember: Most issues have been encountered before. Check existing documentation, search error messages, and don't hesitate to ask for help when needed.
