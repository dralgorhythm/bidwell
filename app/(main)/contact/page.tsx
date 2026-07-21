import { siteConfig } from 'lib/site-config'
import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Bidwell Consulting - email jordan@bidwell.info or message me on LinkedIn. Based in Minneapolis, serving the Twin Cities metro and remote clients.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Bidwell Consulting - Minneapolis, MN',
    description:
      'Email jordan@bidwell.info, message me on LinkedIn, or book a free 30-minute discovery call. Minneapolis-based, remote-friendly.',
    type: 'website',
  },
}

export default function ContactPage(): React.JSX.Element {
  return (
    <section>
      <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>Contact</h1>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Get in Touch</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Email is best:{' '}
          <a href={`mailto:${siteConfig.email}`} className='underline'>
            {siteConfig.email}
          </a>
          . LinkedIn works too - I read everything.
        </p>
        <div className='flex flex-col sm:flex-row gap-3'>
          <a
            href={`mailto:${siteConfig.email}`}
            className='inline-block text-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors'
          >
            Email me
          </a>
          <a
            href='https://www.linkedin.com/in/wintersjordan/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block text-center px-6 py-3 border border-black dark:border-white font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors'
          >
            Message me on LinkedIn
          </a>
        </div>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Free Discovery Call</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Every engagement starts with a free 30-minute conversation - no pitch. We&apos;ll talk
          through what you&apos;re working on and whether I&apos;m the right person to help. If
          I&apos;m not, I&apos;ll say so and point you somewhere better.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>What to Include</h2>
        <ul className='mb-4 ml-6 list-disc space-y-2 text-neutral-700 dark:text-neutral-300'>
          <li>What you&apos;re building or what&apos;s stuck - a few sentences is plenty</li>
          <li>Rough timeline: exploring, this quarter, or on fire</li>
          <li>How you&apos;d like to work: project, assessment, or ongoing advice</li>
        </ul>
      </div>

      <p className='text-sm text-neutral-600 dark:text-neutral-400'>
        Bidwell Consulting · Minneapolis, MN · Serving the Twin Cities metro · Remote-friendly
      </p>
    </section>
  )
}
