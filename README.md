# Bidwell Consulting

A modern, high-performance portfolio website built with Next.js 15, showcasing software engineering expertise and organizational consulting services.

**🌐 Live Site:** [bidwell.info](https://bidwell.info)

## Overview

This is a **production-ready, enterprise-level Next.js 15 application** demonstrating modern web development best practices. It serves as both a functional business website and a showcase of advanced technical expertise.

### Key Features

- **⚡ Performance Optimized**: Core Web Vitals focused with dynamic OG images and optimized fonts
- **🔒 Security Hardened**: Multi-layered security with CSP, HSTS, and rate limiting
- **🧪 Fully Tested**: Comprehensive test suite (70% coverage) with unit, integration, accessibility, and performance tests
- **♿ Accessible**: WCAG 2.1 AA compliant with automated accessibility testing
- **📱 Responsive**: Mobile-first design with perfect cross-device experience
- **🚀 SEO Ready**: Sitemap, robots.txt, JSON-LD schema, and OpenGraph metadata

## Quick Start

```bash
# Clone and install
git clone <repository-url>
cd bidwell
npm install

# Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Documentation

### 📚 For New Contributors

- **[Getting Started Guide](./docs/getting-started.md)** - Complete onboarding tutorial for new developers
- **[Contributing Guidelines](./CONTRIBUTING.md)** - How to contribute effectively to this project

### 🏗️ For Developers

- **[Development Guide](./DEVELOPMENT.md)** - Complete development workflow, build system, and CI/CD
- **[Architecture Guide](./docs/architecture.md)** - System design, decisions, and technical philosophy
- **[API Reference](./docs/reference.md)** - Technical reference for components, utilities, and patterns

### 🔧 For Operations

- **[Testing Documentation](./TESTING.md)** - Testing strategy, coverage requirements, and execution
- **[Deployment Guide](./DEPLOYMENT.md)** - Deployment strategies for various platforms and environments
- **[Troubleshooting Guide](./docs/troubleshooting.md)** - Common issues, debugging, and solutions

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Font**: [Geist](https://vercel.com/font) (Vercel's design system)
- **Testing**: [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)
- **Deployment**: [Vercel](https://vercel.com/) (primary) + GitHub Pages (static)
- **Monitoring**: Vercel Speed Insights & Web Analytics

## Project Structure

```text
app/                    # Next.js App Router pages and layouts
├── components/         # Reusable UI components
├── comparison/         # Interactive comparison tool feature
└── api/               # API routes with security and validation

lib/                   # Utility libraries and configurations
├── performance.ts     # Core Web Vitals optimization
├── security.ts        # Security utilities and headers
├── validation.ts      # Input validation with Zod schemas
└── font-optimization.ts # Advanced font loading strategies

__tests__/             # Comprehensive test suite
├── components/        # Component unit tests
├── integration/       # Integration and user journey tests
└── lib/              # Library and utility tests

docs/                  # Detailed documentation
├── getting-started.md # Complete onboarding tutorial
├── architecture.md    # System design and decisions
├── reference.md       # Technical API reference
└── troubleshooting.md # Common issues and solutions
```

## Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Quality Assurance
npm run test             # Run test suite
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run type-check       # TypeScript type checking
npm run lint             # Check code style
npm run lint:fix         # Fix code style issues

# Deployment
npm run build:static     # Build for static export (GitHub Pages)
```

## Quality Standards

### Performance Targets

- **LCP (Largest Contentful Paint)**: ≤ 2.5s
- **INP (Interaction to Next Paint)**: ≤ 200ms
- **CLS (Cumulative Layout Shift)**: ≤ 0.1
- **Lighthouse Score**: ≥ 90

### Code Quality

- **Test Coverage**: ≥ 70% (branches, functions, lines, statements)
- **TypeScript**: Strict mode, no `any` types
- **Accessibility**: WCAG 2.1 AA compliant
- **Security**: Input validation, rate limiting, security headers

## Key Innovations

### 🚀 Performance System

- **Advanced Font Optimization**: Critical subset preloading with adaptive strategies
- **Core Web Vitals Monitoring**: Real-time performance tracking and optimization
- **Image Optimization**: Modern formats with responsive loading strategies

### 🔒 Security Framework

- **Multi-layered Security**: CSP, HSTS, rate limiting, input validation
- **API Security**: Rate limiting and proper error handling on all endpoints
- **Security Headers**: Comprehensive security header implementation

### 🧪 Testing Excellence

- **Test-Driven Development**: 70% coverage requirement with multiple test types
- **Accessibility Testing**: Automated WCAG compliance with jest-axe
- **Performance Testing**: Render performance and memory usage validation

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for:

- Code standards and architecture patterns
- Testing requirements and strategies
- Performance and security guidelines
- Pull request process and review criteria

### Quick Contribution Steps

1. **Read** the [Getting Started Guide](./docs/getting-started.md)
2. **Follow** the [Contributing Guidelines](./CONTRIBUTING.md)
3. **Use** the [Development Guide](./DEVELOPMENT.md) for workflow
4. **Test** thoroughly with `npm run test:coverage`
5. **Submit** a pull request with proper documentation

## License

MIT License - see [LICENSE](./LICENSE) file for details.

---

**Built with ❤️ by [Bidwell Consulting](https://bidwell.info)**

_This codebase demonstrates production-ready, enterprise-level web development practices and serves as an excellent reference for modern Next.js applications._
