/** @type {import('next').NextConfig} */
const nextConfig = {
  // Moved from experimental to top level
  serverExternalPackages: ['sharp', 'web-vitals'],

  // Enable experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'date-fns', 'lodash-es'],
  },

  // Configure for static export (GitHub Pages)
  output: process.env.GITHUB_ACTIONS ? 'export' : 'standalone',

  // Fix cross-origin warning for development
  allowedDevOrigins: ['192.168.50.126'],

  // Disable image optimization for static export, enable for development
  images: {
    unoptimized: process.env.GITHUB_ACTIONS ? true : false,
    // Enable modern formats
    formats: ['image/webp', 'image/avif'],

    // Configure image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Image domains (add your CDN domains here)
    domains: ['images.unsplash.com', 'via.placeholder.com', 'picsum.photos'],

    // Remote patterns for more flexible image sources
    remotePatterns: [
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
    removeConsole: process.env.NODE_ENV === 'production',

    // Enable SWC minification
    styledComponents: false,
  },

  // Enable compression
  compress: true,

  // Optimize webpack bundle
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      // Enable tree shaking
      config.optimization.usedExports = true

      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }

    // Optimize bundle analyzer (if enabled)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      )
    }

    // SSR fixes merged here
    if (isServer) {
      // Define self as global for server-side rendering
      config.resolve.fallback = {
        ...config.resolve.fallback,
        self: false,
      }

      // Add global polyfill for server-side
      config.plugins.push(
        new (require('webpack').DefinePlugin)({
          self: 'undefined',
        })
      )
    }

    return config
  },

  // Headers for better performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
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
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        // Cache static assets
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Rewrites for better SEO and performance
  async rewrites() {
    return [
      // Add any custom rewrites here
    ]
  },

  // Enable modern JavaScript output
  // output: 'standalone', // Removed - using 'export' for GitHub Pages

  // Environment variables
  env: {
    ENABLE_PERFORMANCE_MONITORING: process.env.NODE_ENV === 'production' ? 'true' : 'false',
    NEXT_PUBLIC_STATIC_EXPORT: process.env.GITHUB_ACTIONS ? 'true' : 'false',
  },

  // Optimize static generation
  trailingSlash: false,

  // Configure build output
  distDir: '.next',

  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Webpack configuration to fix SSR issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Define self as global for server-side rendering
      config.resolve.fallback = {
        ...config.resolve.fallback,
        self: false,
      }

      // Add global polyfill for server-side
      config.plugins.push(
        new (require('webpack').DefinePlugin)({
          self: 'undefined',
        })
      )
    }

    return config
  },
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
