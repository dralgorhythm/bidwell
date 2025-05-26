# Bidwell Consulting

A modern portfolio and consulting website built with Next.js 15, showcasing software engineering expertise and organizational consulting services.

**Live Site:** [bidwell.info](https://bidwell.info)

## Overview

This is a high-performance portfolio website featuring:
- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Performance Optimized**: Core Web Vitals focused, dynamic OG images, optimized fonts
- **Fully Tested**: Comprehensive test suite with unit, integration, accessibility, and performance tests
- **SEO Ready**: Sitemap, robots.txt, JSON-LD schema, OpenGraph metadata
- **Monitoring**: Vercel Speed Insights and Web Analytics integration

## Quick Start

```bash
# Clone and install dependencies
git clone <repository-url>
cd bidwell
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Font**: [Geist](https://vercel.com/font) (Vercel's design system font)
- **Testing**: [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Monitoring**: Vercel Speed Insights & Web Analytics

## Documentation

- **[BUILD.md](./BUILD.md)** - Build system, dependencies, and development setup
- **[TESTING.md](./TESTING.md)** - Testing strategy, coverage, and test execution
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guides for various platforms

## Key Features

### Performance & SEO
- Server-side rendering with Next.js App Router
- Optimized images and fonts
- Dynamic OpenGraph image generation
- Structured data (JSON-LD schema)
- Comprehensive sitemap and robots.txt

### Developer Experience
- TypeScript strict mode
- ESLint + Prettier configuration
- Pre-commit hooks
- Comprehensive test coverage
- CI/CD pipeline with GitHub Actions

### Accessibility
- WCAG 2.1 AA compliance
- Automated accessibility testing
- Semantic HTML structure
- Proper ARIA labels and keyboard navigation

## Project Structure

```
app/                    # Next.js App Router pages and layouts
├── components/         # Reusable UI components
├── comparison/         # Comparison tool feature
└── api/               # API routes
lib/                   # Utility libraries and configurations
types/                 # TypeScript type definitions
__tests__/             # Test suites (unit, integration, e2e)
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the test suite
5. Submit a pull request

## License

MIT License - see [LICENSE](./LICENSE) file for details.

---

Built with ❤️ by [Bidwell Consulting](https://bidwell.info)
