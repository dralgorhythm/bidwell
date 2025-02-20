import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Bidwell Consulting
      </h1>
      <p className="mb-4">
        {
          `Welcome to the erstwhile home of Bidwell Consulting. This is a small blog and portfolio site.
          I'm a software engineer and organizational consultant. I'm also a writer and a musician.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
