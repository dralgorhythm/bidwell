import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import { serviceEntries } from '../../config/services'

export const metadata: Metadata = {
  title: 'About Jordan Winters',
  description:
    'Jordan Winters is a Minneapolis-based software consultant with over a decade in engineering, infrastructure, and practice improvement. Serving the Twin Cities.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Jordan Winters - Software Consultant, Minneapolis',
    description:
      'Over a decade in engineering, infrastructure, and practice improvement. Based in Minneapolis, serving the Twin Cities.',
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
          I live and work in Minneapolis, and I&apos;ve spent over a decade building software and
          building the teams that build software. The short version: I led operations through an
          organizational doubling at an ad-tech startup, spent five and a half years as a Staff
          DevOps Engineer at NerdWallet (including steering a cloud cost journey that took over
          $1.5M out of yearly spend), founded an Observability practice as an Engineering Manager at
          a Fortune 500 financial services company, and took an AI-native startup from empty
          repository to public beta in six months as its founding engineer. Bidwell Consulting is
          where I now do that work directly for companies across the Twin Cities metro, and remotely
          everywhere else.
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
            Customer-focused solutions are easier to deliver when following the Product Operating
            Model - teams do their best work when they can run real experiments and watch the
            results land with customers.
          </li>
          <li>
            Agile practice helps teams rapidly deliver value and execute more experiments - and
            speed and stability reinforce each other along the way.
          </li>
          <li>
            Writing and owning our code, in the tradition of DevOps, helps teams build better
            software - you build it, you own it, and it stays healthy after launch.
          </li>
        </ul>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>How I Work</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Solo by design - the person you meet on the discovery call designs the system, writes the
          code, and answers the hard questions himself. No juniors to hand you off to.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Beyond Work</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          When I&apos;m not shipping software I&apos;m usually making music - you can hear what that
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
          - the discovery call is free.
        </p>
      </div>
    </section>
  )
}
