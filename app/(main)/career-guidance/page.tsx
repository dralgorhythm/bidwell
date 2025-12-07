import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Career Guidance',
  description:
    'We provide career coaching and guidance for tech professionals. Help with career transitions, resume reviews, interview prep, and leadership development.',
  keywords: [
    'career coach',
    'career guidance',
    'career mentoring',
    'professional development',
    'career transition',
    'resume optimization',
    'interview preparation',
    'leadership development',
  ],
  openGraph: {
    title: 'Career Guidance | Bidwell Consulting',
    description:
      'We provide career coaching and guidance for tech professionals.',
    type: 'website',
    images: [
      {
        url: '/og?title=Career%20Guidance',
        width: 1200,
        height: 630,
        alt: 'Career Guidance',
      },
    ],
  },
}

const services = [
  {
    title: '1-on-1 Coaching',
    description: 'Dedicated time to work through your career questions and challenges.',
    benefits: [
      'Personalized advice',
      'Goal setting',
      'Accountability check-ins',
    ],
  },
  {
    title: 'Resume & LinkedIn Review',
    description: 'Honest feedback on your professional materials.',
    benefits: [
      'ATS optimization',
      'Profile improvements',
      'Positioning strategy',
    ],
  },
  {
    title: 'Interview Prep',
    description: 'Practice interviews with real feedback.',
    benefits: [
      'Mock interviews',
      'Behavioral coaching',
      'Technical prep',
    ],
  },
  {
    title: 'Career Transitions',
    description: 'Guidance for changing roles or industries.',
    benefits: [
      'Skills assessment',
      'Transition planning',
      'Network strategy',
    ],
  },
]

const faqs = [
  {
    question: 'How long are sessions?',
    answer: '60 minutes. Long enough to dig in, short enough to respect your time.',
  },
  {
    question: "Not sure what you need?",
    answer: "Start with a free 30-minute call. We'll figure it out together.",
  },
  {
    question: 'Packages available?',
    answer: 'Yes. Single sessions or ongoing engagements. Reach out to discuss.',
  },
  {
    question: 'Industry focus?',
    answer: 'I specialize in tech and software, but the principles apply broadly.',
  },
  {
    question: 'Remote work?',
    answer: 'Definitely. I can help with remote job searches and distributed team dynamics.',
  },
]

const engagementOptions = [
  {
    name: 'Discovery Call',
    duration: '30 minutes',
    description: "Let's talk about what you're working on. No commitment, just a conversation.",
    features: [
      'Initial conversation',
      'Goal discussion',
      "See if we're a good fit",
    ],
  },
  {
    name: 'Single Session',
    duration: '60 minutes',
    description: 'Focused time on a specific challenge or question.',
    features: ['1-on-1 time', 'Targeted guidance', 'Action items'],
  },
  {
    name: 'Ongoing Mentorship',
    duration: '3 months',
    description: 'Regular check-ins for those who want sustained support.',
    features: [
      'Weekly sessions',
      'Resume review',
      'Interview prep',
      'Email support',
    ],
  },
]

export default function CareerGuidancePage(): React.JSX.Element {
  return (
    <section>
      {/* Hero Section */}
      <div className='mb-12'>
        <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>Career Guidance</h1>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          With nearly 20 years of experience in professional development, I offer career coaching for
          people navigating transitions, preparing for interviews, or figuring out their next move.
          If you're in tech, I can speak to that directly. If not, the fundamentals still apply.
        </p>
        <div className='mt-6 text-center'>
          <a
            href='https://www.linkedin.com/in/wintersjordan/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors'
          >
            Get In Touch On LinkedIn
          </a>
        </div>
      </div>

      {/* Services Section */}
      <div
        id='services'
        className='mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800'
      >
        <h2 className='mb-8 text-2xl font-semibold tracking-tight'>Services Offered</h2>
        <div className='grid gap-8 md:grid-cols-2'>
          {services.map(service => (
            <div
              key={service.title}
              className='p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors'
            >
              <h3 className='mb-3 text-xl font-semibold'>{service.title}</h3>
              <p className='mb-4 text-neutral-700 dark:text-neutral-300'>{service.description}</p>
              <ul className='space-y-2'>
                {service.benefits.map(benefit => (
                  <li
                    key={benefit}
                    className='flex items-start text-sm text-neutral-600 dark:text-neutral-400'
                  >
                    <svg
                      className='w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <title>Checkmark</title>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>



      {/* Engagement Options */}
      <div className='mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800'>
        <h2 className='mb-8 text-2xl font-semibold tracking-tight'>Ways to Work Together</h2>
        <div className='grid gap-6 md:grid-cols-3'>
          {engagementOptions.map(option => (
            <div
              key={option.name}
              className='p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg'
            >
              <h3 className='mb-2 text-xl font-semibold'>{option.name}</h3>
              <div className='mb-4 text-sm text-neutral-600 dark:text-neutral-400'>
                {option.duration}
              </div>
              <p className='mb-6 text-neutral-700 dark:text-neutral-300'>{option.description}</p>
              <ul className='space-y-2 mb-6'>
                {option.features.map(feature => (
                  <li
                    key={feature}
                    className='flex items-start text-sm text-neutral-600 dark:text-neutral-400'
                  >
                    <svg
                      className='w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <title>Checkmark</title>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href='https://www.linkedin.com/in/wintersjordan/'
                target='_blank'
                rel='noopener noreferrer'
                className='block w-full text-center px-4 py-2 rounded font-semibold transition-colors border border-black dark:border-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
              >
                Reach Out
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className='mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800'>
        <h2 className='mb-8 text-2xl font-semibold tracking-tight'>Frequently Asked Questions</h2>
        <div className='space-y-6'>
          {faqs.map(faq => (
            <div
              key={faq.question}
              className='pb-6 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0 last:pb-0'
            >
              <h3 className='mb-2 text-lg font-semibold'>{faq.question}</h3>
              <p className='text-neutral-700 dark:text-neutral-300'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div id='contact'>
        <h2 className='mb-4 text-xl font-semibold tracking-tight'>Get in Touch</h2>
        <p className='mb-4 text-neutral-700 dark:text-neutral-300'>
          The best way to reach me is through LinkedIn. Send a message and we can set up a time to talk.
        </p>
        <a
          href='https://www.linkedin.com/in/wintersjordan/'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors'
        >
          Connect on LinkedIn
        </a>
      </div>
    </section>
  )
}
