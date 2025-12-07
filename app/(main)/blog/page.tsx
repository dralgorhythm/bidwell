import Link from 'next/link'

export const metadata = {
  title: 'Blog',
  description: 'Updates and insights from the Bidwell Consulting team.',
}

export default function BlogPage() {
  return (
    <section>
      <h1 className='font-semibold text-2xl mb-8 tracking-tighter'>Blog</h1>
      <div>
        <Link href='/blog/agent-coordination' className='flex flex-col space-y-1 mb-4'>
          <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-2'>
            <p className='text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums'>
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <p className='text-neutral-900 dark:text-neutral-100 tracking-tight'>
              Agent Coordination Structure
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}
