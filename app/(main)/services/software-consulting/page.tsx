import { faqSchema, serviceSchema } from 'lib/structured-data'
import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import Breadcrumb from '../../../components/breadcrumb'
import JsonLd from '../../../components/structured-data'

export const metadata: Metadata = {
  title: 'Software Consulting in Minneapolis',
  description:
    'Hands-on software consulting in Minneapolis — architecture, custom software development, and legacy rescue for Twin Cities teams. Free discovery call.',
  keywords: [
    'software consultant minneapolis',
    'software consulting twin cities',
    'custom software development',
    'software architecture consultant',
    'legacy software modernization',
  ],
  alternates: { canonical: '/services/software-consulting' },
  openGraph: {
    title: 'Software Consulting in Minneapolis — Bidwell Consulting',
    description:
      'Hands-on software consulting — architecture, custom development, and legacy rescue for Twin Cities teams.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What does a software consultant actually do?',
    answer:
      'Whatever moves your software forward: designing systems, writing code, reviewing architecture, untangling legacy projects, or advising your team on hard technical decisions. Unlike an agency, you work directly with me — the person doing the thinking is the person doing the work.',
  },
  {
    question: 'How much does a software consultant cost in Minneapolis?',
    answer:
      'Independent consultants in the Twin Cities typically run from the low hundreds per hour, with fixed-scope projects priced by outcome rather than time. The honest answer depends on scope and urgency — the free discovery call exists so I can give you a real number instead of a range.',
  },
  {
    question: 'Can you take over an existing or legacy codebase?',
    answer:
      "Yes — rescue work is a specialty. I start with an assessment of what's actually there, stabilize the riskiest parts, and lay out a modernization path you can execute incrementally instead of betting on a rewrite.",
  },
  {
    question: 'Do you write the code yourself or just advise?',
    answer:
      'Both, and you choose the mix. Some clients want working software delivered; others want architecture reviews and a sounding board for their team. Either way I stay hands-on enough that my advice survives contact with a compiler.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes. Small teams are where a single experienced consultant beats an agency: no account managers, no handoffs, and scope shaped to what you can actually maintain after I leave.',
  },
  {
    question: 'Do you work onsite in the Twin Cities?',
    answer:
      'For architecture sessions, whiteboarding, and workshops — gladly, anywhere in the metro. Day-to-day build work usually runs remote, which keeps it efficient for both of us.',
  },
]

export default function SoftwareConsultingPage(): React.JSX.Element {
  return (
    <section>
      <JsonLd
        data={serviceSchema({
          name: 'Software Consulting',
          description:
            'Hands-on software consulting — architecture, custom software development, and legacy rescue.',
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
        I&apos;m Jordan Winters, an independent software consultant with nearly 20 years of building
        and leading. I work hands-on: I design systems, write code, and leave your team with
        software — and decisions — that hold up. No account managers, no junior handoffs.
      </p>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Custom Software Development</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Prototypes that prove an idea, internal tools that remove a bottleneck, integrations that
          make two systems finally talk, MVPs scoped to learn something real. I build custom
          software sized for a solo expert to deliver well — which is exactly the size where an
          agency&apos;s overhead stops making sense.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>
          Architecture &amp; Technical Strategy
        </h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Architecture reviews before you commit a year of budget. Build-versus-buy calls with the
          trade-offs stated plainly. Technical due diligence when you&apos;re acquiring or
          investing. System design that starts from your constraints — team size, budget, and what
          you can operate at 2 a.m. — instead of whatever is trending.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Rescue &amp; Modernization</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Inherited a codebase nobody understands? Watched a project stall past its second deadline?
          I take over troubled and legacy systems, stabilize what&apos;s risky, and chart an
          incremental modernization path — because &ldquo;rewrite it&rdquo; is usually the most
          expensive sentence in software.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>How Engagements Work</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Three shapes: a fixed-scope <strong>assessment</strong> when you need clarity before
          committing, a <strong>project</strong> when you need something built, or an ongoing{' '}
          <strong>advisory</strong> arrangement when your team needs a senior technical voice on
          call. Every engagement starts with a free 30-minute discovery call and a written scope —
          you&apos;ll always know what you&apos;re paying for and what done looks like.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>
          Working Together in the Twin Cities
        </h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          I&apos;m based in Minneapolis. For the parts of software work that go better in a room —
          architecture sessions, whiteboarding, team workshops — I&apos;ll come to you anywhere in
          the Minneapolis–St. Paul metro. The day-to-day build work runs remote, so distance never
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
          Building with LLMs or coding agents? See{' '}
          <Link href='/services/ai-consulting' className='underline'>
            AI &amp; agent engineering
          </Link>
          . Team shipping slower than it should? See{' '}
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
          — 30 minutes, no commitment.
        </p>
      </div>
    </section>
  )
}
