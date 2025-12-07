import Link from 'next/link'
import type React from 'react'

export default function WideLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className='min-h-screen'>
      {/* Minimal header with back link */}
      <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800'>
        <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
          <Link
            href='/experiments'
            className='text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
          >
            ← Back to Experiments
          </Link>
          <Link
            href='/'
            className='text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors'
          >
            Bidwell Consulting
          </Link>
        </div>
      </header>
      {/* Full-width content area with padding for fixed header */}
      <main className='pt-14'>{children}</main>
    </div>
  )
}
