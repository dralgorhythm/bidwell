# Security Headers for Static Sites

## Overview
This document explains how to configure security headers for the Bidwell static site deployed on GitHub Pages.

## Background
Previously, we used Next.js middleware to add security headers. However, middleware is incompatible with `output: 'export'` (static site generation), which is required for GitHub Pages deployment.

## Solution Options

### Option 1: GitHub Pages Custom Headers (Recommended)
GitHub Pages does not support custom headers configuration directly. However, you can add a `_headers` file for Netlify or Vercel if you migrate to those platforms.

### Option 2: Meta Tags (Partial Solution)
Some security policies can be set via meta tags in the HTML `<head>`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
```

**Note**: Not all headers work via meta tags (e.g., HSTS, X-XSS-Protection).

### Option 3: Cloudflare Pages (Alternative Hosting)
If security headers are critical, consider deploying to Cloudflare Pages instead, which supports custom headers via `_headers` file:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
```

### Option 4: Migrate to Railway/Vercel (Dynamic Hosting)
If you need full middleware support:
1. Remove `output: 'export'` from `next.config.js`
2. Restore the `middleware.ts` file
3. Deploy to Railway, Vercel, or another platform that supports Next.js server features

## Current Implementation
For the GitHub Pages deployment, we've removed middleware and rely on:
1. Browser built-in security features
2. HTTPS enforcement via GitHub Pages settings
3. Content Security Policy via meta tags (to be implemented in `app/layout.tsx`)

## Recommended Next Steps
1. Add CSP meta tags to `app/layout.tsx`
2. Enable HTTPS enforcement in GitHub Pages repository settings
3. Consider migrating to Cloudflare Pages or Vercel if advanced security headers are required

## References
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
