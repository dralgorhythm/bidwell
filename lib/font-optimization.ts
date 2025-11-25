/**
 * Font optimization utilities for better Core Web Vitals
 * Focuses on reducing Cumulative Layout Shift (CLS) and improving loading performance
 */

/**
 * Preload critical fonts to improve performance
 * Should be called in the document head
 */
export function preloadFonts(
  fonts: Array<{
    href: string
    crossOrigin?: 'anonymous' | 'use-credentials'
    type?: string
  }>
) {
  for (const font of fonts) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.href = font.href
    link.type = font.type || 'font/woff2'
    if (font.crossOrigin) {
      link.crossOrigin = font.crossOrigin
    }
    document.head.appendChild(link)
  }
}

/**
 * Apply font display strategy to prevent layout shift
 * Adds font-display CSS property for better loading behavior
 */
export function optimizeFontDisplay() {
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-family: 'GeistSans';
      font-display: swap;
    }
    
    @font-face {
      font-family: 'GeistMono';
      font-display: swap;
    }
    
    /* Fallback fonts to prevent layout shift */
    .font-sans {
      font-family: 'GeistSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    .font-mono {
      font-family: 'GeistMono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    }
  `
  document.head.appendChild(style)
}

/**
 * Detect font loading completion
 * Useful for preventing layout shifts during font swapping
 */
export function waitForFontsReady(): Promise<void> {
  if (!document.fonts) {
    return Promise.resolve()
  }

  return document.fonts.ready
    .then(() => {
      // All fonts loaded successfully
    })
    .catch(() => {
      // Font loading failed - silent fail to avoid impacting UX
    })
}

/**
 * Apply size-adjust to minimize layout shift between font fallbacks
 * This helps maintain consistent text metrics during font loading
 */
export function addFontSizeAdjustments() {
  const style = document.createElement('style')
  style.textContent = `
    /* Size adjustments to match font metrics */
    @font-face {
      font-family: 'GeistSans-fallback';
      src: local('Arial'), local('Helvetica'), local('sans-serif');
      size-adjust: 105%;
      ascent-override: 90%;
      descent-override: 22%;
      line-gap-override: 0%;
    }
    
    @font-face {
      font-family: 'GeistMono-fallback';
      src: local('Courier New'), local('Monaco'), local('monospace');
      size-adjust: 98%;
      ascent-override: 85%;
      descent-override: 20%;
      line-gap-override: 0%;
    }
  `
  document.head.appendChild(style)
}

/**
 * Get optimal font loading strategy based on connection type
 */
export function getFontLoadingStrategy(): 'swap' | 'block' | 'fallback' | 'optional' {
  // Check for slow connection
  const connection = (navigator as { connection?: { effectiveType?: string } }).connection
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'optional' // Don't block rendering on slow connections
    }
    if (connection.effectiveType === '3g') {
      return 'fallback' // Short block period for medium connections
    }
  }

  // Default to swap for fast connections
  return 'swap'
}

/**
 * Optimize font loading for Core Web Vitals
 * Call this during application initialization
 */
export function initializeFontOptimization() {
  // Apply font display strategy
  optimizeFontDisplay()

  // Add size adjustments to prevent layout shift
  addFontSizeAdjustments()

  // Wait for fonts and track loading performance
  waitForFontsReady().then(() => {
    // Track font loading completion
    if (typeof window !== 'undefined' && window.performance) {
      // Font loading time could be tracked for performance monitoring
    }
  })
}

/**
 * Critical font subset for above-the-fold content
 * Contains most common characters to reduce initial font size
 */
export const CRITICAL_FONT_SUBSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?-–—()[]{}:;"\''

/**
 * Preload font subset for critical above-the-fold text
 */
export function preloadCriticalFontSubset(fontUrl: string) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'font'
  link.type = 'font/woff2'
  link.href = `${fontUrl}?subset=${encodeURIComponent(CRITICAL_FONT_SUBSET)}`
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}
