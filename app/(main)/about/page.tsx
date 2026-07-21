import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import { serviceEntries } from '../../config/services'

export const metadata: Metadata = {
  title: 'About Jordan Winters',
  description:
    'Jordan Winters is a Minneapolis-based software consultant with nearly 20 years in engineering, architecture, and practice improvement. Serving the Twin Cities.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Jordan Winters — Software Consultant, Minneapolis',
    description:
      'Nearly 20 years in engineering, architecture, and practice improvement. Based in Minneapolis, serving the Twin Cities.',
    type: 'profile',
  },
}

export default function AboutPage(): React.JSX.Element {
  return (
    <section>
      <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>About Jordan Winters</h1>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Hi, I&apos;m Jordan</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          I live and work in Minneapolis and I&apos;ve spent nearly 20 years building software and
          building the teams that build software — as an engineer, an architect, and a leader of
          Engineering Practice Improvement. Bidwell Consulting is where I do that work directly for
          companies across the Twin Cities metro, and remotely everywhere else.
        </p>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          You can verify most of this the same way I would:{' '}
          <a
            href='https://www.linkedin.com/in/wintersjordan/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            LinkedIn
          </a>{' '}
          for the career,{' '}
          <a
            href='https://github.com/dralgorhythm'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            GitHub
          </a>{' '}
          for the code, and my essay on{' '}
          <Link href='/blog/agent-coordination' className='underline'>
            coordinating AI coding agents
          </Link>{' '}
          for how I think.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>What I Believe</h2>
        <ul className='mb-4 ml-6 list-disc space-y-2 text-neutral-700 dark:text-neutral-300'>
          <li>
            Engineering exists to serve outcomes — teams do their best work when they can run real
            experiments and see the results land with customers.
          </li>
          <li>
            Speed and stability reinforce each other. Quality gates aren&apos;t a tax on velocity;
            they&apos;re what makes sustained velocity possible.
          </li>
          <li>
            You build it, you own it. Ownership — not process theater — is what keeps software
            healthy after the launch party.
          </li>
        </ul>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>How I Work</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Solo, by design. The person you meet on the discovery call is the person who designs the
          system, writes the code, and answers the hard questions — there are no juniors to hand you
          off to. That keeps scope honest, communication direct, and quality personal.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Beyond Work</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          When I&apos;m not shipping software I&apos;m usually making music — you can hear what that
          sounds like on{' '}
          <a
            href='https://soundcloud.com/dralgorhythm'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            SoundCloud
          </a>
          . Minneapolis is home, and the coffee-meeting offer is real.
        </p>
      </div>

      <div>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Work With Me</h2>
        <ul className='mb-4 ml-6 list-disc space-y-2'>
          {serviceEntries.map(service => (
            <li key={service.href}>
              <Link href={service.href} className='underline'>
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className='text-neutral-700 dark:text-neutral-300'>
          Or just{' '}
          <Link href='/contact' className='underline'>
            get in touch
          </Link>{' '}
          — the discovery call is free.
        </p>
      </div>
    </section>
  )
}
