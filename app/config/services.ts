/** The four consulting offerings - single source for home cards, the services hub, and the footer. */
export interface ServiceEntry {
  title: string
  href: string
  description: string
}

export const serviceEntries: ServiceEntry[] = [
  {
    title: 'Software Consulting',
    href: '/services/software-consulting',
    description: 'Architecture, cloud infrastructure, and 0-to-1 platform builds - hands-on.',
  },
  {
    title: 'AI & Agent Engineering',
    href: '/services/ai-consulting',
    description: 'Pragmatic AI adoption: LLM integration, custom agents, coding-agent workflows.',
  },
  {
    title: 'Engineering Practice Improvement',
    href: '/services/engineering-practice-improvement',
    description: 'Ship faster with healthier DevOps, agile delivery, and review culture.',
  },
  {
    title: 'Career Coaching',
    href: '/services/career-coaching',
    description: '1-on-1 coaching for engineers and tech leaders: resumes, interviews, moves.',
  },
]
