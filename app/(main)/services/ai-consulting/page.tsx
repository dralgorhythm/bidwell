import { faqSchema, serviceSchema } from 'lib/structured-data'
import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import Breadcrumb from '../../../components/breadcrumb'
import JsonLd from '../../../components/structured-data'

export const metadata: Metadata = {
  title: 'AI Consulting in Minneapolis',
  description:
    'AI consulting in Minneapolis: LLM integration, AI agent development, and coding-agent workflows for Twin Cities teams. Book a free discovery call.',
  keywords: [
    'ai consulting minneapolis',
    'ai implementation consultant',
    'ai agent development',
    'llm integration consultant',
    'ai consulting twin cities',
  ],
  alternates: { canonical: '/services/ai-consulting' },
  openGraph: {
    title: 'AI Consulting & Agent Engineering - Minneapolis',
    description:
      'LLM integration, AI agent development, and coding-agent workflows from a consultant who works this way daily.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What does an AI implementation consultant do?',
    answer:
      'Turns "we should be doing something with AI" into a working system: picking the use cases worth automating, integrating LLMs into your product or workflow, building the evaluation and guardrails around them, and getting your team comfortable operating it all.',
  },
  {
    question: 'How do we start using AI in our business?',
    answer:
      "Start with one workflow that's high-volume, low-risk, and measurable, not a moonshot. We scope it in a discovery call, ship a working pilot, measure honestly, and only then widen. Most failed AI projects skipped the measuring.",
  },
  {
    question: 'Do we need custom AI or can we use off-the-shelf tools?',
    answer:
      "Usually off-the-shelf models with custom integration. The value is rarely in training your own model and almost always in how well the model is wired into your data, your process, and your guardrails. I'll tell you plainly when a SaaS tool already solves your problem.",
  },
  {
    question: 'Can you build custom AI agents for our workflows?',
    answer:
      'Yes. I architected the agentic pipelines and multimodal ingestion backend for an AI-native platform that went from empty repository to public beta in six months, and I publish how I coordinate my own coding agents so you can inspect the approach before you hire it.',
  },
  {
    question: 'Is our data safe when we use AI tools?',
    answer:
      "It can be, if you choose deliberately: which providers see what data, what gets retained, what stays local, and what never leaves your systems. I've contributed production LLM patterns inside a regulated financial-services environment, so compliance-grade data boundaries are familiar ground.",
  },
  {
    question: 'Can you train our engineering team on AI coding tools?',
    answer:
      'Yes. I help teams adopt Copilot- and Claude-class tools with the practices that make them safe: review discipline, quality gates, and workflows that amplify judgment instead of replacing it.',
  },
]

export default function AiConsultingPage(): React.JSX.Element {
  return (
    <section>
      <JsonLd
        data={serviceSchema({
          name: 'AI Consulting',
          description:
            'AI consulting: LLM integration, AI agent development, and coding-agent workflows.',
          path: '/services/ai-consulting',
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: 'AI Consulting', href: '/services/ai-consulting' },
        ]}
      />

      <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>
        AI Consulting &amp; Agent Engineering
      </h1>
      <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
        Plenty of consultants advise on AI. I build with it daily, including the multi-agent
        workflows that produce my own work, and I publish{' '}
        <Link href='/blog/agent-coordination' className='underline'>
          how I coordinate AI coding agents
        </Link>{' '}
        so you can judge the approach before you pay for it. Most recently I took an AI-native
        platform from empty repository to public beta in six months, with a cost architecture that
        held 90% gross margin on AI-heavy workloads.
      </p>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>
          AI Implementation &amp; LLM Integration
        </h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Wiring large language models into products and workflows that already exist: document
          processing, support triage, search and retrieval over your own data, drafting and
          summarization inside the tools your team lives in. Scoped around evaluation and unit
          economics from day one, so you know whether it works in production and what it costs per
          request - not just whether it demos.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>AI Agent Development</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Agents earn their keep on multi-step work: triaging queues, reconciling records, turning
          documents and images into structured, queryable data. I design them with explicit
          boundaries and human checkpoints wherever a mistake would actually cost you something.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>AI-Native Engineering Teams</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Coding agents are the biggest change to software delivery in a decade, and most teams get
          mixed results because they adopted the tool without the practice. I help engineering teams
          put the structure around Copilot- and Claude-class tools - review discipline, quality
          gates, coordination patterns - so agents raise your team&apos;s output instead of your
          incident count. Building that structure is what I do: I&apos;ve founded an enterprise
          Observability practice and stood up the delivery engine for a founding team, then handed
          both off running.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>How I Approach AI Projects</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          I approach AI projects pragmatically. It&apos;s spectacular at some jobs and confidently
          wrong at others, and the expensive failures come from not knowing which is which. I start
          small, measure real outcomes, design the data boundaries deliberately, and tell you when
          the right answer is &ldquo;don&apos;t use AI for this.&rdquo;
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>AI Work From the Twin Cities</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Twin Cities companies are past the demo phase. The question now is what AI actually
          changes for their business. I meet Minneapolis-St. Paul clients in person for working
          sessions and leadership briefings; the engineering itself runs remote, same as any modern
          delivery.
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
          Making AI adoption stick is a practice problem - see{' '}
          <Link href='/services/engineering-practice-improvement' className='underline'>
            engineering practice improvement
          </Link>
          . If the system around the model needs building too, see{' '}
          <Link href='/services/software-consulting' className='underline'>
            software consulting
          </Link>
          .
        </p>
      </div>

      <div id='contact'>
        <h2 className='mb-4 text-xl font-semibold tracking-tight'>Start a Conversation</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          Tell me about the workflow you think AI could carry.{' '}
          <Link href='/contact' className='underline'>
            Book a free discovery call
          </Link>{' '}
          - 30 minutes, no commitment.
        </p>
      </div>
    </section>
  )
}
