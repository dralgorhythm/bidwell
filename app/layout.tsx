import './global.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import type React from 'react'

import { baseUrl } from '../lib/site-config'
import { organizationSchema, personSchema, websiteSchema } from '../lib/structured-data'
import JsonLd from './components/structured-data'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Bidwell Consulting - Software Engineering & Organizational Consulting',
    template: '%s | Bidwell Consulting',
  },
  description:
    'Expert software engineering and organizational consulting services. Specialized in technical problem solving, system architecture, and business optimization. Portfolio showcasing innovative solutions and development expertise.',
  keywords: [
    'software engineering',
    'organizational consulting',
    'technical consulting',
    'system architecture',
    'software development',
    'business optimization',
    'portfolio',
  ],
  authors: [{ name: 'Bidwell Consulting' }],
  creator: 'Bidwell Consulting',
  publisher: 'Bidwell Consulting',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Bidwell Consulting - Software Engineering & Organizational Consulting',
    description:
      'Expert software engineering and organizational consulting services. Specialized in technical problem solving, system architecture, and business optimization.',
    url: baseUrl,
    siteName: 'Bidwell Consulting',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Search Console verification intentionally absent — verify via DNS when set up.
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

import { cx } from '../lib/utils'

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html
      lang='en'
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <JsonLd data={websiteSchema()} />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={personSchema()} />
        {/* Security headers */}
        <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
        <meta httpEquiv='X-Frame-Options' content='DENY' />
        <meta httpEquiv='Referrer-Policy' content='strict-origin-when-cross-origin' />
        <meta
          httpEquiv='Content-Security-Policy'
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';"
        />
      </head>
      <body className='antialiased'>{children}</body>
    </html>
  )
}
