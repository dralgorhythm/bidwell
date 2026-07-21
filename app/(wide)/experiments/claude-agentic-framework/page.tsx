import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'

const githubUrl = 'https://github.com/dralgorhythm/claude-agentic-framework'

export const metadata: Metadata = {
  title: 'Claude Agentic Framework',
  description:
    'The Governed Swarm — a drop-in operating system for Claude Code that turns one AI assistant into a coordinated, quality-gated engineering team.',
  keywords: [
    'claude agentic framework',
    'claude code',
    'multi-agent swarm',
    'agentic engineering',
    'ai coding agents',
    'quality gates',
  ],
  openGraph: {
    title: 'Claude Agentic Framework',
    description:
      'A drop-in template for Claude Code: coordinated multi-agent swarms, workflow skills, layered rules, and safety hooks.',
    type: 'website',
    images: [
      {
        url: '/og?title=Claude%20Agentic%20Framework',
        width: 1200,
        height: 630,
        alt: 'Claude Agentic Framework',
      },
    ],
  },
}

const terminalLines = [
  {
    prompt: '/swarm-plan "add an experiments page"',
    result: 'plan approved · 7 tasks · artifacts written',
  },
  { prompt: '/swarm-execute', result: '5 workers finished · quality gates green' },
  { prompt: '/swarm-review', result: 'security · architecture · tests · approved' },
  { prompt: 'git push', result: "shipped — work isn't done until it's pushed" },
]

const principles = [
  {
    title: 'Speed and stability reinforce each other',
    body: "Quality gates aren't a tax on velocity — they're what makes sustained velocity possible. Every change passes tests, lint, types, and build before it lands, so the next change starts on solid ground.",
  },
  {
    title: 'AI amplifies existing discipline',
    body: 'An agent with no process amplifies chaos. Given golden paths, layered rules, and mandatory review, it amplifies engineering judgment instead. The framework supplies that structure as versioned files in your repo.',
  },
  {
    title: 'Small changesets, many reviewers',
    body: 'The failure mode of agentic coding is the 2,000-line pull request nobody actually read. Swarm orchestration decomposes work into focused tasks and puts every diff through multi-perspective review.',
  },
]

const cycle = [
  {
    step: '01',
    name: 'Think',
    commands: ['/architect', '/swarm-plan'],
    body: 'One planning agent studies the goal, records decisions as durable artifacts — PRDs, ADRs, plans — and decomposes the work into small, parallelizable tasks.',
  },
  {
    step: '02',
    name: 'Build',
    commands: ['/swarm-execute'],
    body: 'Focused workers implement in parallel. Each gets a self-contained prompt, a bounded turn budget, and a model tier matched to its job — and no worker can spawn workers of its own.',
  },
  {
    step: '03',
    name: 'Review',
    commands: ['/swarm-review'],
    body: "Adversarial reviewers attack the diff from independent angles — correctness, security, architecture, tests. Run it more than once; it's cheaper than an incident.",
  },
  {
    step: '04',
    name: 'Ship',
    commands: ['git push'],
    body: 'Tests, linter, type checker, and build must pass before every commit — and the work is not done until the push succeeds.',
  },
]

const inTheBox = [
  {
    title: '10 commands',
    body: 'Six single-agent expert modes — architect, builder, QA engineer, security auditor, UI/UX designer, code auditor — plus four swarm orchestrators for planning, execution, review, and research.',
  },
  {
    title: '5 worker types',
    body: 'Explorer, builder, reviewer, researcher, and architect workers. Model tiers are pinned in each agent’s frontmatter — premium reasoning where judgment matters, cheaper models for mechanical work.',
  },
  {
    title: '24 skills',
    body: '14 knowledge skills spanning architecture, engineering, design, operations, product, and security, plus 10 gated workflow skills. The full listing costs about 1.4k tokens of context.',
  },
  {
    title: 'Layered rules',
    body: 'Golden-path tech strategy, code-quality standards, a debugging protocol, and security requirements — roughly 5k tokens, loaded into every session automatically.',
  },
  {
    title: 'Fail-soft safety hooks',
    body: 'Secret detection, protected-file guards, push blocking on main, dangerous-command warnings, and file locking so concurrent workers never trample each other.',
  },
  {
    title: '4 MCP servers',
    body: 'Sequential Thinking for hard trade-offs, Chrome DevTools for in-browser verification, Context7 for current library docs, and Filesystem for controlled file operations.',
  },
]

const ladder = [
  {
    rung: '1',
    level: 'Prose rules',
    strength: 'Advisory',
    accent: 'border-neutral-300 dark:border-neutral-700',
    body: 'CLAUDE.md and the rules directory are read at the start of every session. They set direction — but nothing mechanically checks compliance.',
  },
  {
    rung: '2',
    level: 'Skills',
    strength: 'On demand',
    accent: 'border-blue-300 dark:border-blue-800',
    body: 'Workflow patterns surface automatically when a task matches their description, encoding accumulated practice without permanent context cost.',
  },
  {
    rung: '3',
    level: 'Hooks',
    strength: 'Deterministic',
    accent: 'border-blue-500 dark:border-blue-600',
    body: 'Pre-tool-use scripts catch secrets, protected files, and dangerous commands before they execute. Fail-soft by design: a broken hook never blocks legitimate work.',
  },
  {
    rung: '4',
    level: 'Permission denials + CI',
    strength: 'Binding',
    accent: 'border-blue-700 dark:border-blue-400',
    body: 'permissions.deny cannot be overridden by any allow rule at any scope, and CI runs entirely outside the agent’s control. This rung is a boundary, not a suggestion.',
  },
]

const stats = [
  { value: '10', label: 'Commands' },
  { value: '5', label: 'Worker types' },
  { value: '24', label: 'Skills' },
  { value: '4', label: 'MCP servers' },
]

const qualityGates = [
  'tsc --noEmit — strict type-check',
  'biome check — lint and format',
  'vitest run — unit tests with axe accessibility assertions',
  'next build — full static export',
]

function CommandChip({ children }: { children: string }): React.JSX.Element {
  return (
    <code className='font-mono text-xs px-2 py-1 rounded-md bg-neutral-200/70 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'>
      {children}
    </code>
  )
}

export default function ClaudeAgenticFrameworkPage(): React.JSX.Element {
  return (
    <div className='min-h-screen'>
      {/* Hero - Full Width */}
      <section className='relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-24 px-4'>
        <div className='relative max-w-4xl mx-auto text-center'>
          <span className='inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 border border-white/20 rounded-full backdrop-blur-sm'>
            Active Experiment · Agentic Engineering
          </span>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 tracking-tight'>
            Claude Agentic Framework
          </h1>
          <p className='text-xl md:text-2xl text-blue-200/90 mb-6'>The Governed Swarm</p>
          <p className='text-lg text-neutral-300 max-w-2xl mx-auto mb-10'>
            A drop-in template for Claude Code that turns a single AI assistant into a coordinated
            engineering team — with the guardrails to trust what it ships.
          </p>

          <div className='max-w-2xl mx-auto mb-10 rounded-xl bg-black/60 border border-white/10 p-5 text-left font-mono text-sm leading-relaxed overflow-x-auto'>
            {terminalLines.map(line => (
              <div key={line.prompt} className='mb-2 last:mb-0'>
                <div className='text-cyan-300'>
                  <span className='text-neutral-500 select-none'>$ </span>
                  {line.prompt}
                </div>
                <div className='text-neutral-300'>
                  <span className='text-emerald-400'>✓ </span>
                  {line.result}
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-wrap items-center justify-center gap-4'>
            <a
              href={githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-blue-50 transition-colors'
            >
              View on GitHub
            </a>
            <a
              href='#the-cycle'
              className='inline-flex items-center px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors'
            >
              How it works ↓
            </a>
          </div>
        </div>

        {/* Fade into page background */}
        <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-black to-transparent' />
      </section>

      {/* The Pitch */}
      <section className='py-16 px-4 bg-white dark:bg-black'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100'>
            Why govern an agent at all?
          </h2>
          <p className='text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12'>
            An unsupervised coding agent is a firehose: fast, confident, and indifferent to your
            standards. The interesting problem isn't getting AI to write code — it's making the
            output trustworthy. The framework's bet: treat the agent like an engineering
            organization, not an autocomplete.
          </p>

          <div className='grid md:grid-cols-3 gap-8'>
            {principles.map(principle => (
              <div
                key={principle.title}
                className='p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow'
              >
                <h3 className='text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                  {principle.title}
                </h3>
                <p className='text-neutral-600 dark:text-neutral-400'>{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Cycle */}
      <section id='the-cycle' className='py-16 px-4 bg-neutral-100 dark:bg-neutral-900'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100'>
            One agent thinks. Many agents build. Many agents review.
          </h2>
          <p className='text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12'>
            The full cycle runs in four moves, each owned by a different kind of agent.
          </p>

          <div className='grid md:grid-cols-2 gap-8'>
            {cycle.map(phase => (
              <div
                key={phase.step}
                className='p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800'
              >
                <div className='flex items-center justify-between mb-3'>
                  <span className='font-mono text-sm text-blue-600 dark:text-blue-400'>
                    {phase.step}
                  </span>
                  <div className='flex flex-wrap gap-2'>
                    {phase.commands.map(command => (
                      <CommandChip key={command}>{command}</CommandChip>
                    ))}
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                  {phase.name}
                </h3>
                <p className='text-neutral-600 dark:text-neutral-400'>{phase.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's in the box */}
      <section className='py-16 px-4 bg-white dark:bg-black'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-100'>
            What's in the box
          </h2>

          <div className='grid md:grid-cols-3 gap-8'>
            {inTheBox.map(item => (
              <div
                key={item.title}
                className='p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow'
              >
                <h3 className='text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                  {item.title}
                </h3>
                <p className='text-neutral-600 dark:text-neutral-400'>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enforcement Ladder */}
      <section className='py-16 px-4 bg-neutral-100 dark:bg-neutral-900'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100'>
            The enforcement ladder
          </h2>
          <p className='text-center text-neutral-600 dark:text-neutral-400 mb-12'>
            Prose instructions are suggestions to a language model. The framework's sharpest idea is
            admitting that — and pushing anything that must be true down the ladder until a machine
            checks it.
          </p>

          <div className='space-y-4'>
            {ladder.map(rung => (
              <div
                key={rung.level}
                className={`p-5 rounded-xl border-l-4 ${rung.accent} bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800`}
              >
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
                    <span className='font-mono text-sm text-neutral-400 dark:text-neutral-500 mr-2'>
                      {rung.rung}
                    </span>
                    {rung.level}
                  </h3>
                  <span className='px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'>
                    {rung.strength}
                  </span>
                </div>
                <p className='text-sm text-neutral-600 dark:text-neutral-400'>{rung.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Full Width */}
      <section className='py-16 px-4 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            {stats.map(stat => (
              <div key={stat.label}>
                <div className='text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                  {stat.value}
                </div>
                <div className='text-neutral-400 text-sm uppercase tracking-wide'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dogfooding */}
      <section className='py-16 px-4 bg-white dark:bg-black'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100'>
              This site is the lab
            </h2>
            <p className='text-neutral-600 dark:text-neutral-400 mb-4'>
              bidwell.info runs on the framework it's describing — v3.1.0, checked into this
              repository's <code className='font-mono text-sm'>.claude</code> directory. The
              experiments hub you arrived from was specified in a PRD, architected in an ADR, and
              built and reviewed by the swarm.
            </p>
            <p className='text-neutral-600 dark:text-neutral-400 mb-4'>
              So was the page you're reading.
            </p>
            <Link
              href='/blog/agent-coordination'
              className='text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline'
            >
              Related reading: Agent Coordination Structure →
            </Link>
          </div>
          <div className='p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800'>
            <h3 className='text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100'>
              Every merge to main must pass
            </h3>
            <ul className='space-y-3'>
              {qualityGates.map(gate => (
                <li key={gate} className='flex items-start'>
                  <span className='text-emerald-500 mr-3' aria-hidden='true'>
                    ✓
                  </span>
                  <span className='font-mono text-sm text-neutral-700 dark:text-neutral-300'>
                    {gate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Run it */}
      <section className='py-16 px-4 bg-neutral-100 dark:bg-neutral-900'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100'>
            Run it on your own repo
          </h2>
          <p className='text-neutral-600 dark:text-neutral-400 mb-8'>
            The recommended install is a raw drop-in: clone the framework and run its init script
            against your project. It sets up the <code className='font-mono text-sm'>.claude</code>{' '}
            directory — commands, skills, agents, rules, hooks — and leaves the rest of your repo
            alone.
          </p>

          <pre className='mb-6 rounded-xl bg-neutral-950 border border-neutral-800 p-5 text-left font-mono text-sm text-neutral-200 overflow-x-auto'>
            <code>
              {`git clone https://github.com/dralgorhythm/claude-agentic-framework.git
cd your-project
../claude-agentic-framework/scripts/init-framework.sh .`}
            </code>
          </pre>

          <p className='text-sm text-neutral-500 dark:text-neutral-400 mb-8'>
            Read the init script before you run it — the framework would tell you to do the same.
            Prefer a lighter footprint? Install it as a Claude Code plugin instead:{' '}
            <code className='font-mono'>/plugin install agentic-framework@agentic-framework</code>
          </p>

          <a
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors'
          >
            Explore the repository
          </a>
        </div>
      </section>

      {/* Footer CTA */}
      <section className='py-16 px-4 bg-white dark:bg-black text-center'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100'>
            Keep exploring
          </h2>
          <p className='text-neutral-600 dark:text-neutral-400 mb-8'>
            The framework is one experiment in a growing collection.
          </p>
          <a
            href='/experiments'
            className='inline-flex items-center px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors'
          >
            ← Back to Experiments Hub
          </a>
        </div>
      </section>
    </div>
  )
}
