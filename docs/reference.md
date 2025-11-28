# API Reference

## Component Library

### Core Components

#### `OptimizedImage`
Enhanced image component with performance optimizations.
```tsx
<OptimizedImage src="/img.jpg" alt="Alt" width={800} height={600} />
```

#### `PerformanceMonitor`
Client-side performance monitoring.
```tsx
<PerformanceMonitor trackingId="homepage">...</PerformanceMonitor>
```

### Layout Components
- `Nav`: Primary navigation.
- `Footer`: Site footer.

## Utility Libraries

### Performance (`lib/performance.ts`)
- `trackPerformance(metric, value)`: Track Core Web Vitals.

### Security (`lib/security.ts`)
- `getSecurityHeaders()`: Returns security headers for responses.

### Validation (`lib/validation.ts`)
- `createRateLimit(requests, windowMs)`: Create a rate limiter.
- `checkRateLimit(limiter, id)`: Check against limit.

## Configuration

### Next.js (`next.config.js`)
Configured for static export (`output: 'export'`) with unoptimized images for GitHub Actions compatibility.
