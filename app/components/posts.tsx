import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-neutral-600 dark:text-neutral-400 mb-4">
        <svg
          className="mx-auto h-12 w-12 mb-4"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         aria-hidden="true"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
         />
       </svg>
     </div>
     <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
       No blog posts yet
     </h3>
     <p className="text-neutral-600 dark:text-neutral-400 mb-6">
       New content is coming soon! Check back later for insights and updates.
     </p>
   </div>
 )
}

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  if (allBlogs.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
