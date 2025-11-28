import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Experiments - Interactive Tools & Utilities',
  description:
    'A collection of experimental tools and utilities. Explore interactive applications demonstrating clean code, modern web development, and user-friendly design.',
  keywords: [
    'experiments',
    'tools',
    'utilities',
    'interactive applications',
    'web development',
    'portfolio',
  ],
  openGraph: {
    title: 'Experiments - Interactive Tools & Utilities | Bidwell Consulting',
    description:
      'A collection of experimental tools and utilities demonstrating modern web development.',
    type: 'website',
    images: [
      {
        url: '/og?title=Experiments',
        width: 1200,
        height: 630,
        alt: 'Experiments - Interactive Tools & Utilities',
      },
    ],
  },
}

const experiments = [
  {
    title: 'Number Comparison',
    description:
      'Instantly compare two numbers to see which is larger, smaller, or if they are equal. Includes difference calculations and percentage analysis.',
    href: '/experiments/comparison',
  },
]

export default function ExperimentsPage() {
  return (
    <section>
      <h1 className='font-semibold text-2xl mb-8 tracking-tighter'>Experiments</h1>

      <div className='mb-6'>
        <p className='mb-4'>
          A collection of experimental tools and utilities built to demonstrate clean code
          practices, modern web development techniques, and user-friendly design. Each experiment
          showcases different aspects of software engineering and interactive application
          development.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {experiments.map(experiment => (
          <Link key={experiment.href} href={experiment.href} className='block group'>
            <div className='border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900'>
              <h3 className='font-medium text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                {experiment.title}
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                {experiment.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
