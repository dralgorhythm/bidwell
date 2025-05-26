import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import StructuredData from './components/structured-data'
import ClientPerformanceWrapper from './components/client-performance-wrapper'
import { baseUrl } from './sitemap'

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
    images: [
      {
        url: `${baseUrl}/og`,
        width: 1200,
        height: 630,
        alt: 'Bidwell Consulting - Software Engineering & Organizational Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bidwell Consulting - Software Engineering & Organizational Consulting',
    description:
      'Expert software engineering and organizational consulting services. Portfolio showcasing innovative solutions.',
    images: [`${baseUrl}/og`],
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
  verification: {
    google: 'google-site-verification',
    yandex: 'yandex-verification',
    yahoo: 'yahoo-site-verification',
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <StructuredData type='website' />
        <StructuredData type='organization' />
        <StructuredData type='person' />
        {/* Preconnect to external domains for faster loading */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        {/* DNS prefetch for performance */}
        <link rel='dns-prefetch' href='//vercel.com' />
        <link rel='dns-prefetch' href='//vitals.vercel-analytics.com' />
        {/* Resource hints for better performance */}
        <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      </head>
      <body className='antialiased max-w-xl mx-4 mt-8 lg:mx-auto'>
        <main className='flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0'>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
          <ClientPerformanceWrapper
            enableMonitoring={process.env.NODE_ENV === 'production'}
            showDashboard={process.env.NODE_ENV === 'development'}
            debug={process.env.NODE_ENV === 'development'}
          />
          {/* Temporarily disabled performance monitoring to fix SSR issue */}
          {/* <ClientPerformanceWrapper 
            enableMonitoring={process.env.NODE_ENV === 'production'} 
            showDashboard={process.env.NODE_ENV === 'development'}
            debug={process.env.NODE_ENV === 'development'}
          /> */}
        </main>
      </body>
    </html>
  )
}
