import { faqSchema, serviceSchema } from 'lib/structured-data'
import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import Breadcrumb from '../../../components/breadcrumb'
import JsonLd from '../../../components/structured-data'

export const metadata: Metadata = {
  title: 'Software Consulting in Minneapolis',
  description:
    'Hands-on software consulting in Minneapolis: architecture, cloud infrastructure, and 0-to-1 platform builds for Twin Cities teams. Free discovery call.',
  keywords: [
    'software consultant minneapolis',
    'software consulting twin cities',
    'cloud infrastructure consultant',
    'devops consulting',
    'software architecture consultant',
  ],
  alternates: { canonical: '/services/software-consulting' },
  openGraph: {
    title: 'Software Consulting in Minneapolis - Bidwell Consulting',
    description:
      'Hands-on software consulting: architecture, cloud infrastructure, and 0-to-1 platform builds for Twin Cities teams.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What does a software consultant actually do?',
    answer:
      'Whatever moves your software forward: designing systems, building infrastructure, writing code, and advising your team on hard technical decisions. You work directly with me, so the person doing the thinking is the person doing the work.',
  },
  {
    question: 'How much does a software consultant cost in Minneapolis?',
    answer:
      'Independent consultants in the Twin Cities typically run from the low hundreds per hour, with fixed-scope projects priced by outcome rather than time. The honest answer depends on scope and urgency. The free discovery call exists so I can give you a real number instead of a range.',
  },
  {
    question: 'Can you modernize our legacy infrastructure?',
    answer:
      "Yes, and I have the track record: I've cut legacy application costs 70% by moving brittle hand-run deployments onto a self-scaling container platform, and cut build and deploy times by more than 75% on core products. Incremental modernization, not a risky rewrite.",
  },
  {
    question: 'Do you write the code yourself or just advise?',
    answer:
      'Both, and you choose the mix. Some clients want the platform built and handed over; others want architecture reviews and a senior sounding board. Either way I stay hands-on with the tools.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes. I spent 2026 as a founding engineer taking a startup from empty repository to public beta in six months. Small teams are where one experienced consultant beats an agency: no account managers, no handoffs, and scope shaped to what you can maintain after I leave.',
  },
  {
    question: 'Do you work onsite in the Twin Cities?',
    answer:
      'For architecture sessions, whiteboarding, and workshops - gladly, anywhere in the metro. Day-to-day build work usually runs remote, which keeps it efficient for both of us.',
  },
]

export default function SoftwareConsultingPage(): React.JSX.Element {
  return (
    <section>
      <JsonLd
        data={serviceSchema({
          name: 'Software Consulting',
          description:
            'Hands-on software consulting: architecture, cloud infrastructure, and 0-to-1 platform builds.',
          path: '/services/software-consulting',
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: 'Software Consulting', href: '/services/software-consulting' },
        ]}
      />

      <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>
        Software Consulting in Minneapolis
      </h1>
      <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
        I&apos;m Jordan Winters, an independent software consultant with over a decade of building
        and leading: staff-level DevOps at a national fintech, platform builds from scratch, and
        cloud architecture that holds up under real traffic and real budgets. I design systems and I
        write the code.
      </p>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Zero-to-One Foundations</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          If you&apos;re going from 0 to 1, I build the core infrastructure and development
          environment for rapid iteration: cloud architecture on AWS or GCP, Terraform-managed with
          environment isolation, CI/CD, observability, and cost models from day one. Most recently I
          did exactly this as a founding engineer - empty repository to public beta in six months.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>
          Architecture &amp; Technical Strategy
        </h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Architecture reviews before you commit a year of budget. Build-versus-buy calls with the
          trade-offs stated plainly. System design that starts from your constraints: team size,
          budget, and what you can operate at 2 a.m. Not whatever&apos;s trending.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>
          Infrastructure Modernization &amp; Cost
        </h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Brittle deploys, sprawling cloud bills, legacy systems everyone is afraid to touch - this
          is home turf. I&apos;ve commodified compute hosting onto self-scaling container platforms
          (cutting legacy costs 70%), shrunk build and deploy times by more than 75%, and steered a
          multi-year cloud cost journey that took over $1.5M out of yearly spend. Modernization pays
          for itself when you sequence it right.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>How Engagements Work</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Three shapes: a fixed-scope <strong>assessment</strong> when you need clarity before
          committing, a <strong>project</strong> when you need something built, or an ongoing{' '}
          <strong>advisory</strong> arrangement when your team needs a senior technical voice on
          call. Every engagement starts with a free 30-minute discovery call and a written scope.
          You&apos;ll always know what you&apos;re paying for and what done looks like.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>
          Working Together in the Twin Cities
        </h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          I&apos;m based in Minneapolis. For the parts of software work that go better in a room,
          I&apos;ll come to you anywhere in the Minneapolis-St. Paul metro: architecture sessions,
          whiteboarding, team workshops. The day-to-day build work runs remote, so distance never
          slows a project down.
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
          For LLM and coding-agent work, see{' '}
          <Link href='/services/ai-consulting' className='underline'>
            AI &amp; agent engineering
          </Link>
          . If the team is shipping slower than it should, see{' '}
          <Link href='/services/engineering-practice-improvement' className='underline'>
            engineering practice improvement
          </Link>
          .
        </p>
      </div>

      <div id='contact'>
        <h2 className='mb-4 text-xl font-semibold tracking-tight'>Start a Conversation</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Tell me what you&apos;re building or what&apos;s stuck.{' '}
          <Link href='/contact' className='underline'>
            Book a free discovery call
          </Link>{' '}
          - 30 minutes, no commitment.
        </p>
      </div>
    </section>
  )
}
