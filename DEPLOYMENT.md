# Deployment Guide

This document covers deployment strategies and platform-specific configurations for the Bidwell Consulting website.

## Quick Deploy

### Vercel (Recommended)

The fastest way to deploy this Next.js application:

1. **Connect Repository**

   - Import your Git repository to [Vercel](https://vercel.com)
   - Vercel auto-detects Next.js configuration

2. **Configure Domain**

   - Set custom domain to point to [bidwell.info](https://bidwell.info)
   - SSL certificates are automatically provisioned

3. **Environment Variables**

   ```env
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
   ```

4. **Deploy**
   - Every push to `main` branch triggers automatic deployment
   - Preview deployments for pull requests

## Platform Deployment Options

### 1. Vercel (Recommended)

**Pros:**

- Zero configuration deployment
- Automatic optimizations
- Built-in analytics and monitoring
- Global edge network
- Preview deployments

**Setup:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from command line
vercel --prod
```

**Configuration (`vercel.json`):**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### 2. Netlify

**Setup:**

```bash
# Build command
npm run build && npm run export

# Publish directory
out/
```

**Configuration (`netlify.toml`):**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NEXT_PRIVATE_TARGET = "server"
```

### 3. AWS Amplify

**Setup:**

1. Connect GitHub repository
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### 4. Digital Ocean App Platform

**Configuration (`app.yaml`):**

```yaml
name: bidwell-consulting
services:
  - name: web
    source_dir: /
    github:
      repo: your-username/bidwell
      branch: main
    run_command: npm start
    build_command: npm run build
    instance_count: 1
    instance_size_slug: basic-xxs
    routes:
      - path: /
```

### 5. Railway

**Setup:**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

### 6. Render

**Configuration:**

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18.x or 20.x

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Deploy Commands

```bash
# Build image
docker build -t bidwell-consulting .

# Run container
docker run -p 3000:3000 bidwell-consulting

# Deploy with docker-compose
docker-compose up -d
```

## CDN and Performance

### Cloudflare Integration

1. **DNS Configuration**

   - Point domain to hosting provider
   - Enable Cloudflare proxy

2. **Performance Settings**

   - Enable Brotli compression
   - Minification for CSS/JS/HTML
   - Browser cache TTL: 4 hours

3. **Security Settings**
   - Always Use HTTPS
   - SSL/TLS: Full (strict)
   - Security level: Medium

### Custom CDN Setup

For static assets optimization:

```javascript
// next.config.js
const nextConfig = {
  assetPrefix: process.env.CDN_URL || '',
  images: {
    loader: 'custom',
    domains: ['your-cdn-domain.com'],
  },
}
```

## Monitoring and Analytics

### Vercel Analytics

```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Performance Monitoring

- **Core Web Vitals**: Automatic tracking with Vercel
- **Error Tracking**: Built-in error boundaries
- **Custom Metrics**: Performance API integration

## Domain Configuration

### DNS Records

```
Type    Name            Value
A       @               vercel-ip-address
CNAME   www             cname.vercel-dns.com
```

### SSL/HTTPS

- Automatic SSL certificates with Vercel
- HSTS headers configured
- Redirect HTTP to HTTPS

## Environment Management

### Development

```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Staging

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://staging.bidwell.info
```

### Production

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://bidwell.info
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_id
```

## Backup and Recovery

### Database Backup

- Static site - no database required
- Content versioned in Git repository

### Disaster Recovery

- Multiple deployment targets
- Git-based recovery
- Automated backups of environment configurations

## Security Considerations

### Headers Configuration

```javascript
// next.config.js
const securityHeaders = [
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
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

### Content Security Policy

Implemented in `middleware.ts` for enhanced security.

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**

   ```bash
   # Check build locally first
   npm run build
   ```

2. **Environment Variables**

   - Ensure all required variables are set
   - Check variable naming (NEXT*PUBLIC* prefix for client-side)

3. **Memory Issues**

   - Increase Node.js memory limit
   - Optimize bundle size

4. **Domain Issues**
   - Verify DNS propagation
   - Check SSL certificate status

### Debug Deployment

```bash
# Verbose build output
npm run build -- --debug

# Check deployment logs
vercel logs <deployment-url>
```

---

**Related Documentation:**

- [← Back to README](./README.md) - Project overview and navigation
- [Development Guide](./DEVELOPMENT.md) - Build system and development workflows
- [Testing Guide](./TESTING.md) - Testing strategy and execution
- [Troubleshooting Guide](./docs/troubleshooting.md) - Common deployment issues
- [Architecture Guide](./docs/architecture.md) - System design and deployment considerations
