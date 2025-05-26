export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>
        Bidwell Consulting - Software Engineering & Organizational Consulting
      </h1>

      <div className='mb-6'>
        <p className='mb-4'>
          Welcome to Bidwell Consulting, your trusted partner for expert software engineering and
          organizational consulting services. This portfolio site showcases innovative technical
          solutions and demonstrates our approach to complex problem solving.
        </p>

        <h2 className='mb-3 text-xl font-medium tracking-tight'>Expertise & Services</h2>
        <p className='mb-4'>
          As a seasoned software engineer and organizational consultant, I specialize in:
        </p>

        <ul className='mb-4 ml-6 list-disc space-y-2'>
          <li>Software engineering and system architecture</li>
          <li>Organizational consulting and business optimization</li>
          <li>Technical problem solving and solution design</li>
          <li>Full-stack development and modern web technologies</li>
        </ul>

        <h2 className='mb-3 text-xl font-medium tracking-tight'>Creative Pursuits</h2>
        <p className='mb-4'>
          Beyond technical expertise, I'm also passionate about creative expression as a writer and
          musician, bringing a unique perspective that combines analytical thinking with creative
          innovation.
        </p>
      </div>

      <div className='my-8 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg'>
        <h2 className='mb-3 text-xl font-medium tracking-tight'>Explore My Work</h2>
        <p className='text-neutral-600 dark:text-neutral-400'>
          Check out my projects and technical solutions above, or try the
          <a href='/comparison' className='ml-1 text-blue-600 dark:text-blue-400 hover:underline'>
            number comparison tool
          </a>{' '}
          to see my approach to building intuitive, user-friendly applications.
        </p>
      </div>
    </section>
  )
}
