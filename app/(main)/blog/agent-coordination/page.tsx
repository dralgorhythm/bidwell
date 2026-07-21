import { siteConfig } from 'lib/site-config'
import { blogPostingSchema } from 'lib/structured-data'
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '../../../components/breadcrumb'
import JsonLd from '../../../components/structured-data'
import { formatPostDate, agentCoordinationPost as post } from '../posts'

export const metadata: Metadata = {
  title: post.seoTitle,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    type: 'article',
    publishedTime: post.publishedAt,
    authors: [siteConfig.founder.name],
    url: `/blog/${post.slug}`,
  },
}

export default function AgentCoordinationPost() {
  return (
    <section>
      <JsonLd data={blogPostingSchema(post)} />
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <h1 className='title font-semibold text-2xl tracking-tighter'>{post.title}</h1>
      <div className='flex justify-between items-center mt-2 mb-8 text-sm'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          <Link href='/about' className='underline'>
            Jordan Winters
          </Link>{' '}
          · {formatPostDate(post.publishedAt)}
        </p>
      </div>
      <article className='prose'>
        <p>
          In my day-job, I'm a leader of{' '}
          <Link href='/services/engineering-practice-improvement'>
            Engineering Practice Improvement
          </Link>
          . I help teams build better software - faster. We can talk more about my feelings on all
          of that soon
          <a href='#fn1' id='ref1'>
            <sup>1</sup>
          </a>
          .
        </p>
        <div className='my-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800'>
          <p className='font-medium text-lg mb-4 text-neutral-900 dark:text-neutral-100 !mt-0'>
            I believe that:
          </p>
          <ul className='space-y-3 list-none !pl-0 !my-0'>
            <li className='flex gap-3 items-start'>
              <span className='text-neutral-400 font-mono text-sm mt-1'>01</span>
              <span>
                Customer-focused solutions are easier to deliver when following the Product
                Operating Model.
              </span>
            </li>
            <li className='flex gap-3 items-start'>
              <span className='text-neutral-400 font-mono text-sm mt-1'>02</span>
              <span>
                Agile practice helps teams rapidly deliver value and execute more experiments.
              </span>
            </li>
            <li className='flex gap-3 items-start'>
              <span className='text-neutral-400 font-mono text-sm mt-1'>03</span>
              <span>
                Writing and owning our code, in the tradition of DevOps, helps teams build better
                software.
              </span>
            </li>
          </ul>
        </div>
        <p>
          I've also been vibe-coding since{' '}
          <a
            href='https://www.anthropic.com/news/claude-3-family'
            target='_blank'
            rel='noopener noreferrer'
          >
            March
          </a>{' '}
          with the rest of you.
        </p>
        <p>
          I'm impatiently waiting for tools and workflows to catch up to the new pace of
          development.
        </p>
        <h2>So What Are We Gonna Do About It?</h2>
        <p>We are going to organize a system of work that allows us to:</p>
        <ul>
          <li>give feedback at the right moment.</li>
          <li>trust our agents at the right moment.</li>
          <li>build faster and better.</li>
        </ul>
        <p>
          In{' '}
          <strong>
            {' '}
            <a
              href='https://github.com/dralgorhythm/copilot-personas'
              target='_blank'
              rel='noopener noreferrer'
            >
              copilot-personas
            </a>
          </strong>
          , I leverage three mechanisms to coordinate -{' '}
          <a href='https://teamtopologies.com/book' target='_blank' rel='noopener noreferrer'>
            reducing cognitive load
          </a>{' '}
          for myself and our agents.
        </p>
        <p>
          A familiar challenge in this framework is the balance of constraint and autonomy. Each
          token adds direction - but may incur noise and cost.
          <a
            href='https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            Effective Context Engineering
          </a>{' '}
          leaves processing space to solve the problem.
        </p>
        <p>
          We want to ensure{' '}
          <a
            href='https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview'
            target='_blank'
            rel='noopener noreferrer'
          >
            Just-In-Time (JIT) knowledge acquisition
          </a>{' '}
          with clear process and artifacts.
        </p>
        <div className='my-8 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800'>
          <table className='w-full text-sm text-left'>
            <thead className='bg-neutral-50 dark:bg-neutral-900 font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800'>
              <tr>
                <th className='p-4'>Mechanism</th>
                <th className='p-4'>Impact</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-neutral-200 dark:divide-neutral-800'>
              <tr>
                <td className='p-4 font-medium'>Critical Directives</td>
                <td className='p-4 text-neutral-600 dark:text-neutral-400'>
                  Tightly scoped universals reduce ambiguity.
                </td>
              </tr>
              <tr>
                <td className='p-4 font-medium'>Artifact Handoffs</td>
                <td className='p-4 text-neutral-600 dark:text-neutral-400'>
                  Required artifacts encapsulate context.
                </td>
              </tr>
              <tr>
                <td className='p-4 font-medium'>Agentic Purpose</td>
                <td className='p-4 text-neutral-600 dark:text-neutral-400'>
                  Specialized personas ensure reliable output.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Critical Directives</h3>
        <p>
          Tightly scoped universals reduce ambiguity. By defining clear boundaries, we stop the
          agent from guessing and let it focus on execution.
        </p>
        <ul>
          <li>
            <strong>Context-Aware Guidance</strong>: Instructions that auto-activate based on the{' '}
            <a href='https://agents.md/' target='_blank' rel='noopener noreferrer'>
              file type you're working on
            </a>
            .
          </li>
          <li>
            <strong>Narrow Tech Standards</strong>: Explicitly define versions and libraries (e.g.,
            "React 18 with TypeScript") to{' '}
            <a
              href='https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/'
              target='_blank'
              rel='noopener noreferrer'
            >
              prevent hallucinated dependencies
            </a>
            .
          </li>
          <li>
            <strong>Golden Paths</strong>:{' '}
            <a
              href='https://github.com/dralgorhythm/copilot-personas'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pre-defined architectural patterns
            </a>{' '}
            that guide the agent down the "happy path" of our codebase.
          </li>
        </ul>

        <h3>Artifact Handoffs</h3>
        <p>
          Required artifacts encapsulate context. Recent tooling leans into Plan and Execute modes
          facilitated by{' '}
          <a href='https://antigravity.google/' target='_blank' rel='noopener noreferrer'>
            document-based handoffs
          </a>
          .
        </p>
        <ul>
          <li>
            <strong>Encapsulated Context</strong>:{' '}
            <a
              href='https://github.com/dralgorhythm/copilot-personas'
              target='_blank'
              rel='noopener noreferrer'
            >
              Specific artifacts
            </a>{' '}
            (like a <code>PRD_[feat].md</code>) that contain everything needed to define our next
            step.
          </li>
          <li>
            <strong>Structured Transitions</strong>: Moving from Persona A to Persona B using{' '}
            <a
              href='https://code.visualstudio.com/docs/copilot/customization/custom-agents#_handoffs'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
            >
              VS Code Handoffs
            </a>{' '}
            to guide the workflow.
          </li>
          <li>
            <strong>Standardized Naming</strong>: Using{' '}
            <a
              href='https://github.com/dralgorhythm/copilot-personas'
              target='_blank'
              rel='noopener noreferrer'
            >
              consistent paths
            </a>{' '}
            like <code>./artifacts/</code> so every agent knows exactly where to look.
          </li>
        </ul>

        <h3>Agentic Purpose</h3>
        <p>
          Specialized personas ensure reliable output. One agent can't hold all of our context, so
          we run a team of specialists.
        </p>
        <ul>
          <li>
            <strong>Specialized Personas</strong>: Agents with archetypal roles (Architect, Builder,
            QA) rather than a{' '}
            <a
              href='https://github.com/dralgorhythm/copilot-personas'
              target='_blank'
              rel='noopener noreferrer'
            >
              generic "Assistant"
            </a>
            .
          </li>
          <li>
            <strong>Modular Skills</strong>:{' '}
            <a
              href='https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview'
              target='_blank'
              rel='noopener noreferrer'
            >
              Reusable capabilities
            </a>{' '}
            (like "PDF processing") that load on demand, keeping the context light.
          </li>
          <li>
            <strong>Context Economy</strong>: Treating context as a scarce resource. We only load
            what's needed for the specific task to{' '}
            <a
              href='https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/'
              target='_blank'
              rel='noopener noreferrer'
            >
              prevent confusion
            </a>
            .
          </li>
        </ul>

        <h2>But why?</h2>
        <p>
          Soon, industry tooling standards and model capabilities will catch up. I already told you
          that I'm impatient.
        </p>
        <p>
          Fortunately, this has been an exercise in context and philosophy. What do I care about,
          and how do I deliver that message efficiently?
        </p>

        <div className='mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800'>
          <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
            Footnotes
          </h3>
          <ol className='list-none pl-0 space-y-2 text-sm text-neutral-500 dark:text-neutral-400'>
            <li id='fn8'>
              <sup className='mr-1'>8</sup> As shorthand, I refer you to{' '}
              <a
                href='https://itrevolution.com/product/accelerate/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                Accelerate
              </a>
              ,{' '}
              <a
                href='https://www.chelseagreen.com/product/thinking-in-systems/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                Thinking In Systems
              </a>
              ,{' '}
              <a
                href='https://press.stripe.com/an-elegant-puzzle'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                An Elegant Puzzle
              </a>
              ,{' '}
              <a
                href='https://teamtopologies.com/book'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                Team Topologies
              </a>
              ,{' '}
              <a
                href='https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                Extreme Programming Explained
              </a>
              ,{' '}
              <a
                href='https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                The Pragmatic Programmer
              </a>
              ,{' '}
              <a
                href='https://itrevolution.com/product/the-phoenix-project/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                The Phoenix Project
              </a>
              ,{' '}
              <a
                href='https://itrevolution.com/product/flow-engineering/'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                Flow Engineering
              </a>
              , and{' '}
              <a
                href='https://anneandfrances.com/fix-things'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-neutral-300 underline-offset-2'
              >
                Move Fast and Fix Things
              </a>
              .{' '}
              <a href='#ref8' aria-label='Back to text'>
                ↩
              </a>
            </li>
          </ol>
        </div>
      </article>
      <p className='mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400'>
        I help teams put this into practice - see{' '}
        <Link href='/services/ai-consulting' className='underline'>
          AI &amp; agent engineering consulting
        </Link>
        .
      </p>
    </section>
  )
}
