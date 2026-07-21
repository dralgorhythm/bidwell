import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { serviceEntries } from '../../config/services'

export const metadata: Metadata = {
  title: 'Software & AI Consulting Services',
  description:
    'Software consulting, AI & agent engineering, engineering practice improvement, and tech career coaching from a Minneapolis consultant. Free discovery call.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage(): React.JSX.Element {
  return (
    <section>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
      />

      <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>Consulting Services</h1>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>How I Can Help</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          I&apos;m Jordan Winters — an independent consultant with nearly 20 years in software.
          Every engagement is with me directly: the person you talk to on the discovery call is the
          person who does the work. I&apos;m based in Minneapolis and work with companies across the
          Twin Cities metro, and remotely everywhere else.
        </p>
        <div className='grid gap-6 md:grid-cols-2'>
          {serviceEntries.map(service => (
            <Link
              key={service.href}
              href={service.href}
              className='group block p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg transition-all duration-300 bg-white dark:bg-neutral-950'
            >
              <h3 className='mb-2 text-lg font-semibold'>{service.title}</h3>
              <p className='mb-3 text-sm text-neutral-600 dark:text-neutral-400'>
                {service.description}
              </p>
              <span className='text-sm underline group-hover:text-neutral-600 dark:group-hover:text-neutral-300'>
                Learn more
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Who I Work With</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Founders and CTOs of small-to-mid companies who need senior software judgment without an
          agency&apos;s overhead. Engineering leaders at larger organizations who want delivery to
          feel less stuck. And individual engineers working on their own careers. I&apos;m one
          person by design — which means honest scope, direct communication, and no handoffs.
        </p>
      </div>

      <div id='contact'>
        <h2 className='mb-4 text-xl font-semibold tracking-tight'>Start With a Conversation</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Not sure which of these fits? That&apos;s what the{' '}
          <Link href='/contact' className='underline'>
            free 30-minute discovery call
          </Link>{' '}
          is for.
        </p>
      </div>
    </section>
  )
}
