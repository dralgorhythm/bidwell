# Development Guide

This guide covers the complete development workflow, build system, CI/CD processes, and best practices for the Bidwell Consulting codebase.

## Table of Contents

- [Development Environment](#development-environment)
- [Build System](#build-system)
- [Development Workflow](#development-workflow)
- [Testing Strategy](#testing-strategy)
- [Quality Assurance](#quality-assurance)
- [CI/CD Pipeline](#cicd-pipeline)
- [Performance Optimization](#performance-optimization)
- [Deployment Process](#deployment-process)

## Development Environment

### Prerequisites

- **Node.js**: 18.x or 20.x (latest LTS recommended)
- **npm**: 8.x or higher (comes with Node.js)
- **Git**: For version control
- **VS Code**: Recommended editor with extensions

### Initial Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd bidwell
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment configuration:**

   ```bash
   # Create .env.local for development
   echo "NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id" > .env.local
   ```

4. **Verify installation:**
   ```bash
   npm run dev          # Should start on localhost:3000
   npm run test         # Should run tests successfully
   npm run build        # Should build without errors
   ```

### VS Code Configuration

#### Recommended Extensions

Install these extensions for optimal development experience:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-jest"
  ]
}
```

#### Workspace Settings

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

## Build System

### Core Dependencies

#### Production Dependencies

```json
{
  "next": "^15.3.2", // React framework
  "react": "^18.3.1", // UI library
  "react-dom": "^18.3.1", // DOM renderer
  "typescript": "^5.8.3" // Type system
}
```

#### Development Dependencies

```json
{
  "jest": "^29.7.0", // Testing framework
  "@testing-library/react": "^16.1.0", // React testing utilities
  "eslint": "^8.57.1", // Code linting
  "prettier": "^3.4.2", // Code formatting
  "tailwindcss": "^4.1.7" // CSS framework
}
```

### Build Configuration

#### Next.js Configuration (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Conditional output for different deployment targets
  output: process.env.GITHUB_ACTIONS ? 'export' : 'standalone',

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.GITHUB_ACTIONS === 'true',
    dangerouslyAllowSVG: true,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Webpack optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle optimization
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

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  },

  // Remove Next.js branding
  poweredByHeader: false,

  // Enable compression
  compress: true,
}

module.exports = nextConfig
```

#### TypeScript Configuration (`tsconfig.json`)

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
      "@/*": ["./*"],
      "app/*": ["./app/*"],
      "lib/*": ["./lib/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Tailwind Configuration (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        // Custom brand colors if needed
      },
    },
  },
  plugins: [],
}
```

### Build Scripts

#### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:static": "node scripts/build-static.js",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --check \"**/*.{js,jsx,ts,tsx,md,json}\"",
    "format:fix": "prettier --write \"**/*.{js,jsx,ts,tsx,md,json}\""
  }
}
```

#### Static Build Script (`scripts/build-static.js`)

```javascript
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const apiDir = path.join(__dirname, '..', 'app', 'api')
const tempDir = path.join(__dirname, '..', '.temp_api')

try {
  console.log('🧹 Cleaning Next.js cache...')
  execSync('rm -rf .next', { stdio: 'inherit' })

  console.log('📦 Temporarily moving API routes...')
  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, tempDir)
  }

  console.log('🏗️  Building static export...')
  execSync('GITHUB_ACTIONS=true next build', {
    stdio: 'inherit',
    env: { ...process.env, GITHUB_ACTIONS: 'true' },
  })

  console.log('✅ Static build completed successfully!')
} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
} finally {
  console.log('🔄 Restoring API routes...')
  if (fs.existsSync(tempDir)) {
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true })
    }
    fs.renameSync(tempDir, apiDir)
  }
}
```

## Development Workflow

### Daily Development Process

1. **Start development server:**

   ```bash
   npm run dev
   ```

2. **Create feature branch:**

   ```bash
   git checkout -b feature/description
   ```

3. **Development loop:**

   ```bash
   # Make changes
   npm run test:watch      # Run tests continuously
   npm run type-check      # Verify TypeScript
   npm run lint:fix        # Fix style issues
   ```

4. **Pre-commit checklist:**
   ```bash
   npm run test:coverage   # Verify coverage ≥ 70%
   npm run type-check      # No TypeScript errors
   npm run build           # Production build works
   npm run format:fix      # Format code
   ```

### Code Quality Tools

#### ESLint Configuration (`.eslintrc.json`)

```json
{
  "extends": ["next/core-web-vitals", "@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prefer-const": "error",
    "no-var": "error"
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"]
}
```

#### Prettier Configuration (`.prettierrc`)

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

### Git Workflow

#### Commit Message Convention

```bash
# Format: type(scope): description
feat(api): add rate limiting to contact endpoint
fix(components): resolve accessibility issue in navigation
docs(readme): update installation instructions
perf(images): optimize image loading strategy
security(validation): strengthen input validation
test(components): add accessibility tests
```

#### Branch Protection

- **main branch** protected
- **Required checks** must pass:
  - TypeScript compilation
  - ESLint validation
  - Test coverage ≥ 70%
  - Build verification

## Testing Strategy

### Test Configuration

#### Jest Configuration (`jest.config.js`)

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^app/(.*)$': '<rootDir>/app/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testTimeout: 10000,
}

module.exports = createJestConfig(customJestConfig)
```

#### Jest Setup (`jest.setup.js`)

```javascript
import '@testing-library/jest-dom'
import { jest } from '@jest/globals'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
```

### Test Types

#### 1. Unit Tests

Test individual components and functions:

```bash
npm run test                    # Run all tests
npm run test:watch             # Watch mode
npm run test:coverage          # With coverage report
```

#### 2. Integration Tests

Test component interactions and user journeys:

```bash
npm run test -- __tests__/integration/
```

#### 3. Accessibility Tests

Automated accessibility compliance testing:

```bash
npm run test -- --testNamePattern="accessibility"
```

#### 4. Performance Tests

Render performance and memory usage:

```bash
npm run test -- --testNamePattern="performance"
```

## Quality Assurance

### Automated Quality Checks

#### Pre-commit Hooks

Install git hooks for automatic quality checks:

```bash
# .husky/pre-commit
#!/bin/sh
npm run test:coverage
npm run type-check
npm run lint:fix
npm run format:fix
```

#### Quality Metrics

- **Test Coverage**: ≥ 70% (branches, functions, lines, statements)
- **TypeScript**: Strict mode, no errors
- **ESLint**: No errors, warnings addressed
- **Build**: Production build succeeds
- **Performance**: Core Web Vitals thresholds met

### Manual Quality Checks

#### Accessibility Testing

1. **Automated testing** with jest-axe
2. **Manual testing** with screen readers
3. **Keyboard navigation** verification
4. **Color contrast** validation

#### Performance Testing

1. **Lighthouse audits** (score ≥ 90)
2. **Core Web Vitals** monitoring
3. **Bundle size** analysis
4. **Loading performance** testing

#### Security Testing

1. **Dependency audits**: `npm audit`
2. **Security headers** verification
3. **Input validation** testing
4. **Rate limiting** verification

## CI/CD Pipeline

### GitHub Actions Workflows

#### Quality Checks Workflow (`.github/workflows/quality-checks.yml`)

```yaml
name: Quality Checks

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: TypeScript check
        run: npm run type-check

      - name: Lint and format
        run: |
          npm run lint:fix
          npm run format:fix

      - name: Run tests
        run: npm run test:coverage

      - name: Build application
        run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

      - name: Commit fixes
        if: github.event_name == 'pull_request'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A
          git diff --staged --quiet || git commit -m "Auto-fix: lint and format"
          git push
```

#### Deployment Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build for static export
        run: npm run build:static
        env:
          GITHUB_ACTIONS: true

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Automated Workflows

#### What Runs Automatically

1. **On Pull Requests:**
   - TypeScript compilation
   - ESLint validation and auto-fixing
   - Prettier formatting and auto-fixing
   - Test suite execution
   - Coverage verification
   - Build verification
   - Auto-commit of fixes

2. **On Main Branch Push:**
   - All quality checks
   - Static export build
   - Deployment to GitHub Pages
   - Performance monitoring

#### Auto-fixing Behavior

The CI/CD pipeline automatically fixes:

- **ESLint issues** that can be auto-fixed
- **Prettier formatting** inconsistencies
- **Import organization** and unused imports

These fixes are automatically committed back to pull request branches.

## Performance Optimization

### Build Optimization

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

#### Webpack Optimizations

- **Code splitting**: Automatic route-based splitting
- **Tree shaking**: Remove unused code
- **Compression**: Gzip and Brotli compression
- **Caching**: Long-term asset caching

### Runtime Optimization

#### Performance Monitoring

```typescript
// lib/performance.ts integration
import { trackPerformance } from 'lib/performance'

// Track custom metrics
trackPerformance('page-load', loadTime, {
  page: window.location.pathname,
  userAgent: navigator.userAgent,
})
```

#### Core Web Vitals

Monitor and optimize:

- **LCP**: ≤ 2.5s (image optimization, critical resource preloading)
- **INP**: ≤ 200ms (efficient event handlers, code splitting)
- **CLS**: ≤ 0.1 (font optimization, layout shift prevention)

#### Optimization Strategies

1. **Image optimization**: WebP/AVIF formats, responsive images
2. **Font optimization**: Critical subset preloading, font-display strategies
3. **Code splitting**: Route-based and component-based splitting
4. **Resource preloading**: Critical resources loaded first

## Deployment Process

### Development Deployment

1. **Local development:**

   ```bash
   npm run dev        # Development server
   ```

2. **Local production testing:**
   ```bash
   npm run build      # Build for production
   npm run start      # Test production build
   ```

### Staging Deployment

1. **Feature branch deployment:**
   - Automatic preview deployments on Vercel
   - Pull request previews for testing

2. **Integration testing:**
   - Full functionality testing
   - Performance validation
   - Security verification

### Production Deployment

1. **Vercel (Primary):**
   - Automatic deployment on main branch push
   - Zero-downtime deployments
   - Global CDN distribution

2. **GitHub Pages (Secondary):**
   - Static export deployment
   - Fallback hosting option
   - Custom domain support

### Deployment Verification

After deployment:

1. **Functionality testing:**
   - All features work correctly
   - Forms submit successfully
   - Navigation functions properly

2. **Performance verification:**
   - Lighthouse audit score ≥ 90
   - Core Web Vitals within thresholds
   - Loading times acceptable

3. **Security validation:**
   - Security headers present
   - HTTPS working correctly
   - No console errors

### Rollback Procedures

If issues are detected:

1. **Immediate rollback:**

   ```bash
   # Vercel
   vercel --prod rollback

   # Or revert Git commit
   git revert HEAD
   git push origin main
   ```

2. **Issue investigation:**
   - Review error logs
   - Identify root cause
   - Prepare fix

3. **Fix deployment:**
   - Apply fix in feature branch
   - Test thoroughly
   - Deploy when verified

## Troubleshooting

### Common Development Issues

1. **Build failures** - Check [Troubleshooting Guide](./docs/troubleshooting.md)
2. **Test failures** - Review test output and fix failing tests
3. **Type errors** - Use TypeScript strict mode properly
4. **Performance issues** - Use performance profiling tools

### Debug Commands

```bash
# Verbose Next.js debugging
DEBUG=next:* npm run dev

# Test debugging
npm run test:watch -- --verbose

# Build debugging
npm run build -- --debug

# TypeScript debugging
npx tsc --noEmit --listFiles
```

### Getting Help

- **[Troubleshooting Guide](./docs/troubleshooting.md)** - Common issues and solutions
- **[Architecture Guide](./docs/architecture.md)** - System design context
- **[Contributing Guide](./CONTRIBUTING.md)** - Contribution process
- **GitHub Issues** - Report bugs and get help

---

**Remember:** This development workflow prioritizes quality, performance, and security. Every step includes verification to ensure we maintain high standards throughout the development process.
