import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'
import { type Experiment, experiments } from './config'

export const metadata: Metadata = {
  title: 'Experiments',
  description: 'Explore interactive experiments and prototypes built by Bidwell Consulting.',
}

function ExperimentCard({ experiment }: { experiment: Experiment }): React.JSX.Element {
  const isActive = experiment.status === 'active'
  const href = isActive ? `/experiments/${experiment.slug}` : '#'

  return (
    <Link
      href={href}
      className={`
        group block p-6 rounded-xl border transition-all duration-300
        ${
          isActive
            ? 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg cursor-pointer'
            : 'border-neutral-100 dark:border-neutral-900 opacity-60 cursor-not-allowed'
        }
        bg-white dark:bg-neutral-950
      `}
      aria-disabled={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      <div className='flex items-start justify-between mb-3'>
        <span
          className={`
          inline-block px-2 py-1 text-xs font-medium rounded-full
          ${
            experiment.status === 'active'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : experiment.status === 'coming-soon'
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
          }
        `}
        >
          {experiment.status === 'active'
            ? 'Active'
            : experiment.status === 'coming-soon'
              ? 'Coming Soon'
              : 'Archived'}
        </span>
        {experiment.category && (
          <span className='text-xs text-neutral-500 dark:text-neutral-400'>
            {experiment.category}
          </span>
        )}
      </div>

      <h2
        className={`
        text-xl font-semibold mb-2 transition-colors
        ${isActive ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400' : ''}
        text-neutral-900 dark:text-neutral-100
      `}
      >
        {experiment.title}
      </h2>

      <p className='text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed'>
        {experiment.description}
      </p>

      {isActive && (
        <div className='mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform'>
          Explore
          <svg
            className='ml-1 w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </div>
      )}
    </Link>
  )
}

export default function ExperimentsPage(): React.JSX.Element {
  return (
    <section>
      <h1 className='font-semibold text-2xl mb-4 tracking-tighter'>Experiments</h1>

      <p className='text-neutral-600 dark:text-neutral-400 mb-8'>
        A collection of interactive experiments, prototypes, and explorations. Each experiment has
        its own dedicated space to showcase ideas without constraints.
      </p>

      {experiments.length === 0 ? (
        <div className='text-center py-12 text-neutral-500 dark:text-neutral-400'>
          <p className='text-lg mb-2'>No experiments yet</p>
          <p className='text-sm'>Check back soon for new explorations.</p>
        </div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2'>
          {experiments.map(experiment => (
            <ExperimentCard key={experiment.slug} experiment={experiment} />
          ))}
        </div>
      )}
    </section>
  )
}
