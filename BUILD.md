# Build Guide

This document covers the build system, dependencies, and development setup for the Bidwell Consulting website.

## Prerequisites

- **Node.js**: 18.x or 20.x (latest LTS recommended)
- **npm**: 8.x or higher (comes with Node.js)
- **Git**: For version control

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bidwell
```

### 2. Install Dependencies

```bash
npm install
```

This installs all production and development dependencies defined in `package.json`.

### 3. Environment Setup

Create a `.env.local` file for local development:

```bash
# Optional: Analytics and monitoring
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

## Development

### Start Development Server

```bash
npm run dev
```

The development server starts at [http://localhost:3000](http://localhost:3000) with:
- Hot module replacement
- TypeScript compilation
- Tailwind CSS processing
- Real-time error reporting

### Development Commands

```bash
npm run dev          # Start development server
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

## Build Process

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `.next` directory with:
- Minified JavaScript and CSS
- Optimized images and fonts
- Static page generation
- Bundle analysis

### Build Output

```
.next/
├── static/           # Static assets with cache headers
├── server/           # Server-side code
└── standalone/       # Self-contained deployment bundle
```

### Start Production Server

```bash
npm run start
```

Serves the production build at [http://localhost:3000](http://localhost:3000).

## Dependencies

### Core Dependencies

- **next**: ^15.0.0 - React framework
- **react**: ^18.0.0 - UI library
- **react-dom**: ^18.0.0 - DOM renderer
- **typescript**: ^5.0.0 - Type system

### Styling

- **tailwindcss**: ^4.0.0 - Utility-first CSS framework
- **postcss**: Latest - CSS processor
- **autoprefixer**: Latest - CSS vendor prefixes

### Development Dependencies

- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions
- **@types/react-dom**: React DOM type definitions
- **eslint**: Code linting
- **eslint-config-next**: Next.js ESLint configuration

### Testing Dependencies

- **jest**: Testing framework
- **@testing-library/react**: React testing utilities
- **@testing-library/jest-dom**: Jest DOM matchers
- **@testing-library/user-event**: User interaction simulation

## Build Configuration

### Next.js Configuration (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx']
    }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig
```

### TypeScript Configuration (`tsconfig.json`)

- Strict mode enabled
- Path aliases configured
- Modern ECMAScript target
- App Router support

### Tailwind Configuration (`tailwind.config.js`)

- Custom design tokens
- Geist font integration
- Dark mode support
- Optimized purging

## Performance Optimization

### Bundle Analysis

```bash
npm run build:analyze
```

Generates bundle analysis reports to identify optimization opportunities.

### Performance Monitoring

- **Vercel Speed Insights**: Real-time performance metrics
- **Web Vitals**: Core performance indicators
- **Lighthouse CI**: Automated performance auditing

## Troubleshooting

### Common Issues

1. **Module Resolution Errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript Errors**
   ```bash
   npm run type-check
   ```

3. **Build Cache Issues**
   ```bash
   rm -rf .next
   npm run build
   ```

### Debug Mode

```bash
DEBUG=next:* npm run dev
```

Enables verbose logging for debugging Next.js issues.

## VS Code Setup

### Recommended Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- ESLint
- Prettier

### Workspace Settings

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## CI/CD Integration

The project includes GitHub Actions workflows for:
- Automated testing
- TypeScript checking
- ESLint validation
- Build verification

See `.github/workflows/` for configuration details.

---

[← Back to README](./README.md) | [Testing Guide →](./TESTING.md)
