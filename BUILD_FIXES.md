# Build Configuration Fixes

## Issue Summary

The GitHub Actions workflow was failing because the Next.js configuration was incompatible with static export for GitHub Pages deployment.

## Root Causes

1. **Duplicate webpack functions** - Two webpack configuration functions were defined in `next.config.js`
2. **API routes incompatible with static export** - API routes use `force-dynamic` which cannot be exported statically
3. **Image optimization conflicts** - Image optimization needs to be disabled for static export
4. **Dynamic OG route** - OpenGraph image generation route was using dynamic parameters

## Solutions Implemented

### 1. Fixed Next.js Configuration (`next.config.js`)

- **Merged duplicate webpack functions** into a single configuration
- **Conditional output mode**: `'export'` for GitHub Actions, `'standalone'` for development
- **Conditional image optimization**: Disabled (`unoptimized: true`) for GitHub Actions
- **Environment variables**: Added `NEXT_PUBLIC_STATIC_EXPORT` flag for client-side detection

### 2. Created Static Build Script (`scripts/build-static.js`)

- **Temporarily moves API routes** out of `/app/api` during static export build
- **Runs the build** with GitHub Actions environment variable set
- **Restores API routes** after successful build
- **Handles errors gracefully** and always restores API routes

### 3. Updated Performance Monitoring (`lib/performance.ts`)

- **Added static export detection** in `sendToAnalytics()` and `trackCustomMetric()`
- **Graceful fallback** when API routes are not available
- **Preserves functionality** in development mode

### 4. Fixed Route Configurations

- **OG Route** (`app/og/route.tsx`): Set to `force-static` with default values
- **Manifest** (`app/manifest.ts`): Added `force-static` export
- **Removed unused parameters** to fix ESLint errors

### 5. Updated GitHub Actions Workflow

- **Changed build command** from `next build` to `build:static`
- **Uses the custom script** that handles API route management

## Usage

### Development Mode (with API routes)

```bash
npm run dev        # Development server
npm run build      # Regular build with API routes
```

### Static Export (for GitHub Pages)

```bash
npm run build:static  # Static export build (removes API routes temporarily)
```

### GitHub Actions

The workflow automatically uses `build:static` when running in CI/CD environment.

## Key Benefits

1. **Dual compatibility**: Works in both development (with server features) and static export modes
2. **Automatic detection**: Uses environment variables to detect build context
3. **Graceful degradation**: Performance monitoring works in both modes
4. **Zero manual intervention**: API routes are automatically managed during builds
5. **Preserves functionality**: All features work in development, essential features work in static export

## Files Modified

- `next.config.js` - Conditional configuration for different build modes
- `lib/performance.ts` - Added static export compatibility
- `app/og/route.tsx` - Fixed for static export compatibility
- `app/manifest.ts` - Added static export configuration
- `scripts/build-static.js` - New build script for static export
- `package.json` - Added `build:static` script
- `.github/workflows/nextjs.yml` - Updated to use static build script

## Testing

✅ Development mode works with all features including API routes
✅ Static export build succeeds and generates `/out` directory
✅ GitHub Actions simulation works (`GITHUB_ACTIONS=true npm run build:static`)
✅ API routes are preserved in development after static build
✅ Performance monitoring gracefully handles both modes
