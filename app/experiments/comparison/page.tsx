import type { Metadata } from 'next'
import Breadcrumb from '../../components/breadcrumb'
import ComparisonForm from './comparison-form'

export const metadata: Metadata = {
  title: 'Number Comparison Tool - Interactive Math Utility',
  description:
    'Free online number comparison tool. Compare two numbers instantly to determine which is larger, smaller, or equal. Perfect for mathematical calculations, data analysis, and educational purposes.',
  keywords: [
    'number comparison',
    'math tool',
    'calculator',
    'compare numbers',
    'mathematical utility',
    'online tool',
  ],
  openGraph: {
    title: 'Number Comparison Tool - Interactive Math Utility | Bidwell Consulting',
    description:
      'Free online number comparison tool. Compare two numbers instantly to determine which is larger, smaller, or equal.',
    type: 'website',
    images: [
      {
        url: '/og?title=Number%20Comparison%20Tool',
        width: 1200,
        height: 630,
        alt: 'Number Comparison Tool - Interactive Math Utility',
      },
    ],
  },
}

export default function ComparisonPage() {
  return (
    <section>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Experiments', href: '/experiments' },
          { name: 'Number Comparison', href: '/experiments/comparison' },
        ]}
      />

      <h1 className='font-semibold text-2xl mb-8 tracking-tighter'>
        Number Comparison Tool - Interactive Math Utility
      </h1>

      <div className='mb-6'>
        <p className='mb-4 text-neutral-600 dark:text-neutral-400'>
          Use our free online number comparison tool to quickly determine which of two numbers is
          larger, smaller, or if they are equal. Perfect for mathematical calculations, data
          analysis, educational purposes, and quick numerical comparisons.
        </p>

        <h2 className='mb-3 text-lg font-medium tracking-tight'>How to Use</h2>
        <ol className='mb-4 ml-6 list-decimal space-y-1 text-sm text-neutral-600 dark:text-neutral-400'>
          <li>Enter your first number in the input field below</li>
          <li>Enter your second number in the second input field</li>
          <li>Click &quot;Compare&quot; to see the results instantly</li>
          <li>View the comparison result and percentage difference</li>
        </ol>
      </div>

      <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg'>
        <h3 className='mb-2 font-medium text-blue-900 dark:text-blue-100'>Features</h3>
        <ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1'>
          <li>• Supports positive and negative numbers</li>
          <li>• Handles decimal numbers with precision</li>
          <li>• Shows absolute difference calculation</li>
          <li>• Displays percentage difference</li>
          <li>• Instant results with visual indicators</li>
        </ul>
      </div>

      <ComparisonForm />

      <div className='mt-8 text-xs text-neutral-500 dark:text-neutral-400'>
        <p>
          This tool demonstrates clean, accessible web development practices and user-friendly
          interface design. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance
          and accessibility.
        </p>
      </div>
    </section>
  )
}
