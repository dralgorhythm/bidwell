import { siteConfig } from 'lib/site-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import { serviceEntries } from '../config/services'

export const metadata: Metadata = {
  title: 'Twin Cities Software Consulting',
  description:
    'Independent software consultant in Minneapolis - infrastructure, AI engineering, and practice improvement for Twin Cities teams. Book a free discovery call.',
  keywords: [
    'software consulting twin cities',
    'software consultant minneapolis',
    'technology consulting minneapolis',
    'independent software consultant',
    'bidwell consulting',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Bidwell Consulting - Software Consulting in the Twin Cities',
    description:
      'Independent software consultant in Minneapolis - infrastructure, AI engineering, and practice improvement for Twin Cities teams.',
    type: 'website',
  },
}

export default function Page(): React.JSX.Element {
  return (
    <section>
      <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>
        Software Consulting in the Twin Cities
      </h1>

      <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
        I&apos;m{' '}
        <Link href='/about' className='underline'>
          Jordan Winters
        </Link>
        , an independent software consultant in Minneapolis. I help companies design systems, ship
        software, and build engineering practices that hold up - over a decade of building and
        leading behind it.
      </p>

      <div className='mb-12'>
        <Link
          href='/contact'
          className='inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors'
        >
          Book a free discovery call
        </Link>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>What I Do</h2>
        <div className='grid gap-6 md:grid-cols-2 mb-4'>
          {serviceEntries.map(service => (
            <Link
              key={service.href}
              href={service.href}
              className='group block p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg transition-all duration-300 bg-white dark:bg-neutral-950'
            >
              <h3 className='mb-2 text-lg font-semibold'>{service.title}</h3>
              <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                {service.description}
              </p>
            </Link>
          ))}
        </div>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          Or browse{' '}
          <Link href='/services' className='underline'>
            all services
          </Link>
          .
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>AI-Native Consulting</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          I coordinate coding agents to ship real software every day, not just advise on it, and I
          publish{' '}
          <Link href='/blog/agent-coordination' className='underline'>
            how I coordinate AI coding agents
          </Link>
          . Bring AI into your engineering practice with someone who has already made it work in his
          own.
        </p>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Based in Minneapolis and serving the Twin Cities metro - in person when it helps, remote
          when it doesn&apos;t.
        </p>
      </div>

      <div>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Start a Conversation</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Tell me what you&apos;re building, what&apos;s stuck, or where you want to be.{' '}
          <Link href='/contact' className='underline'>
            Book a free discovery call
          </Link>
          , email{' '}
          <a href={`mailto:${siteConfig.email}`} className='underline'>
            {siteConfig.email}
          </a>
          , or reach out on{' '}
          <a
            href='https://www.linkedin.com/in/wintersjordan/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </section>
  )
}
