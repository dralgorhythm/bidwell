/** @type {import('next').NextConfig} */
const nextConfig = {
  // Moved from experimental to top level
  serverExternalPackages: ['sharp', 'web-vitals'],

  // Enable experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
      'lodash-es',
      'framer-motion',
    ],
  },

  // Configure for static export (GitHub Pages)
  output: 'export',
  trailingSlash: false,

  // Fix cross-origin warning for development
  allowedDevOrigins: ['192.168.50.126'],

  // Disable image optimization for static export
  images: {
    unoptimized: true,
    // Enable modern formats
    formats: ['image/webp', 'image/avif'],

    // Configure image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Remote patterns for more flexible image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],

    // Optimize image loading
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Enable image optimization
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: true,
    // Enable SWC minification
    styledComponents: false,
  },

  // Enable compression
  compress: true,

  // Enable React strict mode for better error detection
  reactStrictMode: true,
}

// Bundle analyzer configuration
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
  module.exports = withBundleAnalyzer(nextConfig)
} else {
  module.exports = nextConfig
}
