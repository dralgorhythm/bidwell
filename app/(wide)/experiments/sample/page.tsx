import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Sample Experiment',
  description: 'A demonstration of the experiments framework with full-width layouts.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SampleExperimentPage(): React.JSX.Element {
  return (
    <div className='min-h-screen'>
      {/* Hero Section - Full Width */}
      <section className='relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-4'>
        <div className='absolute inset-0 bg-black/10' />
        <div className='relative max-w-4xl mx-auto text-center'>
          <span className='inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/20 rounded-full backdrop-blur-sm'>
            Experiment Framework Demo
          </span>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 tracking-tight'>Full-Width Layouts</h1>
          <p className='text-xl md:text-2xl text-white/90 max-w-2xl mx-auto'>
            This experiment demonstrates how individual experiments can break free from the base
            site's constrained layout.
          </p>
        </div>

        {/* Decorative elements */}
        <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-black to-transparent' />
      </section>

      {/* Features Grid - Full Width */}
      <section className='py-16 px-4 bg-white dark:bg-black'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-100'>
            What's Different Here?
          </h2>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Full-Width Canvas',
                description:
                  "Unlike the main site's max-w-xl container, experiments span the full browser width.",
                icon: '🖼️',
              },
              {
                title: 'Custom Layouts',
                description:
                  'Each experiment can define its own visual structure, navigation, and styling.',
                icon: '🎨',
              },
              {
                title: 'Isolated Space',
                description: "Experiments are separate from the main site's Navbar and Footer.",
                icon: '🔬',
              },
            ].map(feature => (
              <div
                key={feature.title}
                className='p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow'
              >
                <div className='text-4xl mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                  {feature.title}
                </h3>
                <p className='text-neutral-600 dark:text-neutral-400'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className='py-16 px-4 bg-neutral-100 dark:bg-neutral-900'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100'>
            Interactive Element Demo
          </h2>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'].map((color, index) => (
              <button
                key={color}
                type='button'
                className='aspect-square rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-lg'
                style={{ backgroundColor: color }}
                aria-label={`Interactive tile ${index + 1}`}
              />
            ))}
          </div>

          <p className='mt-8 text-neutral-600 dark:text-neutral-400'>
            Click the tiles above! Experiments can include any interactive elements.
          </p>
        </div>
      </section>

      {/* Stats Section - Full Width */}
      <section className='py-16 px-4 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            {[
              { value: '100%', label: 'Width Available' },
              { value: '0px', label: 'Layout Constraints' },
              { value: '∞', label: 'Possibilities' },
              { value: '1', label: 'Framework' },
            ].map(stat => (
              <div key={stat.label}>
                <div className='text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent'>
                  {stat.value}
                </div>
                <div className='text-neutral-400 text-sm uppercase tracking-wide'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className='py-16 px-4 bg-white dark:bg-black text-center'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100'>
            Ready to Explore More?
          </h2>
          <p className='text-neutral-600 dark:text-neutral-400 mb-8'>
            Check back for new experiments as we continue to build and explore.
          </p>
          <a
            href='/experiments'
            className='inline-flex items-center px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors'
          >
            ← Back to Experiments Hub
          </a>
        </div>
      </section>
    </div>
  )
}
