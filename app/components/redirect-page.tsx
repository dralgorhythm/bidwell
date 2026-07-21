import Link from 'next/link'
import type React from 'react'

import { resolveRedirect } from '../../lib/redirects'

/**
 * Stub body for a moved URL. React hoists the meta refresh into <head>;
 * the visible link covers crawlers and anyone with auto-refresh disabled.
 */
export default function RedirectPage({ from }: { from: string }): React.JSX.Element {
  const to = resolveRedirect(from)
  return (
    <>
      <meta httpEquiv='refresh' content={`0;url=${to}`} />
      <section>
        <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>This page has moved</h1>
        <p className='text-neutral-700 dark:text-neutral-300'>
          If you are not redirected automatically, continue to{' '}
          <Link href={to} className='underline hover:text-neutral-600 dark:hover:text-neutral-300'>
            the new page
          </Link>
          .
        </p>
      </section>
    </>
  )
}
