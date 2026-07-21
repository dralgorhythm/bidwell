import type { Metadata } from 'next'
import Link from 'next/link'

import { formatPostDate, posts } from './posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Updates and insights from the Bidwell Consulting team.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  return (
    <section>
      <h1 className='font-semibold text-2xl mb-8 tracking-tighter'>Blog</h1>
      <div>
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className='flex flex-col space-y-1 mb-4'
          >
            <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-2'>
              <p className='text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums'>
                {formatPostDate(post.publishedAt, 'short')}
              </p>
              <p className='text-neutral-900 dark:text-neutral-100 tracking-tight'>{post.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
