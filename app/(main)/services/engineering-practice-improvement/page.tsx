import { faqSchema, serviceSchema } from 'lib/structured-data'
import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import Breadcrumb from '../../../components/breadcrumb'
import JsonLd from '../../../components/structured-data'

export const metadata: Metadata = {
  title: 'Engineering Practice Improvement',
  description:
    'Engineering process improvement consulting in Minneapolis — DevOps, agile delivery, and developer productivity for Twin Cities teams. Free discovery call.',
  keywords: [
    'engineering process improvement consultant',
    'devops consulting twin cities',
    'agile consulting minneapolis',
    'developer productivity consultant',
    'engineering effectiveness',
  ],
  alternates: { canonical: '/services/engineering-practice-improvement' },
  openGraph: {
    title: 'Engineering Practice Improvement — Minneapolis',
    description:
      'DevOps, agile delivery, and developer productivity consulting from a practitioner who leads this work for a living.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is engineering practice improvement?',
    answer:
      "Making the way your team builds software measurably better: how work flows from idea to production, how quality is enforced, how ownership is shared, and how fast you can safely ship. It's the discipline of removing the friction your engineers complain about in private.",
  },
  {
    question: 'Is this the same as agile coaching?',
    answer:
      "It overlaps, but no. I'm an engineer first — the recommendations come from shipping software, not from a certification deck. Ceremony that doesn't serve delivery gets cut, not added. If a standup isn't earning its fifteen minutes, we kill the standup.",
  },
  {
    question: 'How do you measure developer productivity?',
    answer:
      'Flow and outcome metrics — lead time, deploy frequency, change-failure rate, recovery time — plus the qualitative signal your engineers already have. What I refuse to do is rank humans by lines of code or ticket counts; vanity metrics rot trust and change nothing.',
  },
  {
    question: 'How long does a process improvement engagement take?',
    answer:
      'An assessment runs a couple of weeks. Real practice change sticks over one to three months of embedded work — long enough to change habits, short enough to stay honest. You should see the first measurable improvement inside the first month.',
  },
  {
    question: 'Can you help us adopt AI coding tools safely?',
    answer:
      "Yes — it's become the most common reason teams call. Coding agents amplify whatever discipline you already have, so the practices come first: review standards, quality gates, and coordination patterns. I publish how I run my own agent workflows.",
  },
  {
    question: 'Do you work with distributed or remote teams?',
    answer:
      'Constantly. Practice improvement is mostly about how work and decisions flow, and that flows through the same tools whether your team sits in one room or five time zones.',
  },
]

export default function EngineeringPracticeImprovementPage(): React.JSX.Element {
  return (
    <section>
      <JsonLd
        data={serviceSchema({
          name: 'Engineering Practice Improvement',
          description:
            'Engineering process improvement consulting — DevOps, agile delivery, and developer productivity.',
          path: '/services/engineering-practice-improvement',
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          {
            name: 'Engineering Practice Improvement',
            href: '/services/engineering-practice-improvement',
          },
        ]}
      />

      <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>
        Engineering Practice Improvement Consulting
      </h1>
      <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
        Helping engineering teams ship faster is my day job — I lead Engineering Practice
        Improvement for a living, and I consult on the same craft. If your team is busy but delivery
        feels slow, the problem is rarely effort. It&apos;s friction, and friction can be found and
        removed.
      </p>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>
          What Practice Improvement Covers
        </h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          The whole path from idea to production: DevOps practices and pipeline health, agile
          delivery that serves outcomes instead of ceremony, code ownership and review culture, and
          the product operating model that connects engineering work to things customers notice.
          Teams should run experiments, own what they ship, and see their work matter.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>How an Engagement Runs</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          <strong>Assess</strong>: a few weeks watching how work actually flows — not how the wiki
          says it flows. <strong>Recommend</strong>: a short, ranked list of changes with the
          reasoning attached, never a hundred-page deck. <strong>Embed</strong>: I work alongside
          the team while the changes take hold, because practice change that arrives by memo
          doesn&apos;t survive the quarter.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Measuring What Matters</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Lead time, deploy frequency, change-failure rate, time to recover — measured before and
          after, so improvement is a fact rather than a feeling. And the AI-era addition: teams that
          get their practices right can adopt coding agents safely and go genuinely faster; teams
          that don&apos;t just produce defects at higher velocity.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Working With Twin Cities Teams</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Practice change sticks when someone is in the room. For Minneapolis–St. Paul teams I embed
          on-site for the moments that matter — working sessions, retros, delivery reviews — and run
          the rest remotely. Fully distributed org? The whole engagement runs remote just as well.
        </p>
      </div>

      <div className='mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800'>
        <h2 className='mb-8 text-2xl font-semibold tracking-tight'>Frequently Asked Questions</h2>
        <div className='space-y-6'>
          {faqs.map(faq => (
            <div
              key={faq.question}
              className='pb-6 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0 last:pb-0'
            >
              <h3 className='mb-2 text-lg font-semibold'>{faq.question}</h3>
              <p className='text-neutral-700 dark:text-neutral-300'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Related Services</h2>
        <p className='text-neutral-700 dark:text-neutral-300'>
          Adopting AI as part of the change? See{' '}
          <Link href='/services/ai-consulting' className='underline'>
            AI &amp; agent engineering
          </Link>
          . Want growth support for the engineers themselves? See{' '}
          <Link href='/services/career-coaching' className='underline'>
            career coaching
          </Link>
          .
        </p>
      </div>

      <div id='contact'>
        <h2 className='mb-4 text-xl font-semibold tracking-tight'>Start a Conversation</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Curious where your delivery friction actually is?{' '}
          <Link href='/contact' className='underline'>
            Book a free discovery call
          </Link>{' '}
          — 30 minutes, no commitment.
        </p>
      </div>
    </section>
  )
}
