import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Bidwell Consulting',
  description:
    'Expert software engineering and organizational consulting firm - solving problems, designing systems, and optimizing processes.',
  keywords: [
    'bidwell consulting',
    'software engineering services',
    'organizational consulting',
    'portfolio',
    'technical consulting',
    'system architecture',
    'business optimization',
    'full-stack development',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Bidwell Consulting',
    description:
      'Expert software engineer and organizational consultant, specializing in problem solving, system design, and process optimization. This portfolio site showcases innovative technical solutions and demonstrates our approach to complex problem solving.',
    type: 'website',
  },
}

export default function Page(): React.JSX.Element {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>Bidwell Consulting</h1>

      <div className='mb-6'>
        <p className='mb-4'>
          Welcome to Bidwell Consulting, I look forward to working with you! Here, you can find my
          thoughts on problem solving.
        </p>

        <h2 className='mb-3 text-xl font-medium tracking-tight'>Expertise & Services</h2>
        <ul className='mb-4 ml-6 list-disc space-y-2'>
          <li>Software engineering and system architecture</li>
          <li>Organizational consulting and process optimization</li>
          <li>Full-stack problem solving and solution design</li>
          <li>
            <a
              href='/career-guidance'
              className='underline hover:text-neutral-600 dark:hover:text-neutral-300'
            >
              Career coaching and development
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
