import { Metadata } from 'next'
import ComparisonForm from './comparison-form'

export const metadata: Metadata = {
  title: 'Number Comparison',
  description: 'Compare two numbers with our simple comparison tool.',
  openGraph: {
    title: 'Number Comparison | Bidwell Consulting',
    description: 'Compare two numbers with our simple comparison tool.',
    type: 'website',
  },
}

export default function ComparisonPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Number Comparison
      </h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        Enter two numbers below to compare them and see which is larger, smaller, or if they're equal.
      </p>
      <ComparisonForm />
    </section>
  )
}

