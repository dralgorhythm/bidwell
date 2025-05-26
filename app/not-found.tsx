import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found - 404 Error',
  description:
    'The page you are looking for could not be found. Return to Bidwell Consulting homepage or explore our services.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <section className='flex flex-col items-center justify-center min-h-[400px] text-center'>
      <h1 className='mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100'>
        404 - Page Not Found
      </h1>

      <div className='mb-6 max-w-md'>
        <p className='mb-4 text-neutral-600 dark:text-neutral-400'>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <p className='text-sm text-neutral-500 dark:text-neutral-500'>
          This might be because the URL was typed incorrectly, the page was removed, or you followed
          an outdated link.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-3'>
        <Link
          href='/'
          className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
        >
          Return Home
        </Link>

        <Link
          href='/comparison'
          className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900 transition-colors'
        >
          Try Comparison Tool
        </Link>
      </div>

      <div className='mt-8 text-xs text-neutral-400'>
        <p>If you believe this is an error, please check the URL or contact us.</p>
      </div>
    </section>
  )
}
