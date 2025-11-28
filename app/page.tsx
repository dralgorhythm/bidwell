import type { Metadata } from 'next'

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
  openGraph: {
    title: 'Bidwell Consulting',
    description:
      "Expert software engineer and organizational consultant, specializing in problem solving, system design, and process optimization. This portfolio site showcases innovative technical solutions and demonstrates our approach to complex problem solving.",
    type: 'website',
    images: [
      {
        url: '/og?title=Bidwell%20Consulting',
        width: 1200,
        height: 630,
        alt: 'Bidwell Consulting',
      },
    ],
  },
}

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>
        Bidwell Consulting
      </h1>

      <div className='mb-6'>
        <p className='mb-4'>
          Welcome to Bidwell Consulting, I look forward to working with you! Here, you can find my experiments and thoughts on problem solving.
        </p>

        <h2 className='mb-3 text-xl font-medium tracking-tight'>Expertise & Services</h2>
        <ul className='mb-4 ml-6 list-disc space-y-2'>
          <li>Software engineering and system architecture</li>
          <li>Organizational consulting and process optimization</li>
          <li>Full-stack problem solving and solution design</li>
          <li>Career coaching and development</li>
        </ul>
      </div>
    </section>
  )
}
