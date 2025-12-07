import Link from 'next/link'
import type React from 'react'

import StructuredData from './structured-data'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps): React.JSX.Element {
  const breadcrumbData = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.href,
  }))

  return (
    <>
      <StructuredData type='breadcrumb' data={breadcrumbData} />
      <nav aria-label='Breadcrumb' className='mb-4'>
        <ol className='flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400'>
          {items.map((item, index) => (
            <li key={item.href} className='flex items-center'>
              {index > 0 && (
                <span className='mx-2 text-neutral-400' aria-hidden='true'>
                  /
                </span>
              )}
              {index === items.length - 1 ? (
                <span className='text-neutral-900 dark:text-neutral-100' aria-current='page'>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className='hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
