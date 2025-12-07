import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Career Guidance & Coaching Services',
  description:
    'Professional career coaching and guidance services. Get expert help with career transitions, resume optimization, interview preparation, and leadership development.',
  keywords: [
    'career coach',
    'career guidance',
    'career mentoring',
    'professional development',
    'career transition',
    'resume optimization',
    'interview preparation',
    'leadership development',
    'salary negotiation',
    'career counseling',
    'executive coaching',
    'career strategy',
  ],
  openGraph: {
    title: 'Career Guidance & Coaching Services | Bidwell Consulting',
    description:
      'Transform your career with expert guidance. Professional coaching for career transitions, leadership development, and professional growth.',
    type: 'website',
    images: [
      {
        url: '/og?title=Career%20Guidance%20%26%20Coaching',
        width: 1200,
        height: 630,
        alt: 'Career Guidance & Coaching Services',
      },
    ],
  },
}

const services = [
  {
    title: '1-on-1 Career Coaching',
    description:
      'Personalized guidance sessions tailored to your unique career goals and challenges. Work directly with an experienced professional to unlock your full potential.',
    benefits: [
      'Customized career roadmap',
      'Goal setting and accountability',
      'Strategic career planning',
      'Ongoing support and feedback',
    ],
  },
  {
    title: 'Resume & LinkedIn Optimization',
    description:
      'Transform your professional profile to stand out in competitive markets. Get expert review and optimization of your resume and LinkedIn presence.',
    benefits: [
      'ATS-optimized resume writing',
      'LinkedIn profile enhancement',
      'Personal branding strategy',
      'Industry-specific optimization',
    ],
  },
  {
    title: 'Interview Preparation',
    description:
      'Build confidence and master interview techniques through mock interviews and detailed feedback. Prepare for any interview scenario.',
    benefits: [
      'Mock interview sessions',
      'Behavioral question coaching',
      'Technical interview prep',
      'Negotiation tactics',
    ],
  },
  {
    title: 'Career Transition Strategy',
    description:
      'Navigate industry or role changes with expert guidance. Whether switching careers or advancing in your field, get the strategic support you need.',
    benefits: [
      'Skills gap analysis',
      'Transition planning',
      'Industry insights',
      'Network building strategies',
    ],
  },
  {
    title: 'Leadership Development',
    description:
      'Develop the leadership skills needed to excel in management roles. Build your capabilities as a leader and advance your career.',
    benefits: [
      'Leadership skill assessment',
      'Executive presence coaching',
      'Team management strategies',
      'Communication excellence',
    ],
  },
]

const testimonials = [
  {
    quote:
      'Working with Bidwell Consulting transformed my career trajectory. The personalized guidance helped me transition from individual contributor to engineering manager.',
    author: 'Senior Engineering Manager',
    company: 'Tech Company',
  },
  {
    quote:
      'The interview preparation was invaluable. I felt confident and prepared, which led to multiple offers. Highly recommend!',
    author: 'Software Engineer',
    company: 'Fortune 500',
  },
  {
    quote:
      'The career coaching helped me identify my strengths and create a clear path forward. I achieved a 40% salary increase in my new role.',
    author: 'Product Manager',
    company: 'Startup',
  },
]

const faqs = [
  {
    question: 'How long are the coaching sessions?',
    answer:
      'Standard coaching sessions are 60 minutes, allowing enough time for deep discussion while respecting your schedule. Sessions can be customized based on your needs.',
  },
  {
    question: "What if I'm not sure which service I need?",
    answer:
      "Book a free 30-minute consultation to discuss your goals and challenges. We'll recommend the best approach for your situation.",
  },
  {
    question: 'Do you offer packages or subscriptions?',
    answer:
      'Yes, we offer both single sessions and package deals. Packages provide better value for ongoing coaching relationships. Contact us to discuss options.',
  },
  {
    question: 'Do you specialize in any particular industry?',
    answer:
      'We specialize in technology and software engineering careers, but our methodologies apply across industries. Our expertise in technical roles provides unique insights for tech professionals.',
  },
  {
    question: 'Can you help with remote job searches?',
    answer:
      'Absolutely! Remote work expertise is one of our specialties. We help clients navigate remote job markets, optimize for distributed teams, and succeed in virtual interviews.',
  },
]

const pricingTiers = [
  {
    name: 'Discovery Session',
    price: 'Free',
    duration: '30 minutes',
    description: 'Get started with a complimentary consultation',
    features: [
      'Initial assessment',
      'Goal discussion',
      'Service recommendations',
      'No commitment required',
    ],
  },
  {
    name: 'Single Session',
    price: 'Contact for pricing',
    duration: '60 minutes',
    description: 'One-time focused coaching session.',
    features: ['Dedicated 1-on-1 time', 'Targeted guidance', 'Action plan', 'Follow-up resources'],
  },
  {
    name: 'Career Conversation',
    price: 'Contact for pricing',
    duration: '3 months',
    description:
      'A quarterly mentorship, a comprehensive engagement reviewing resume and approach.',
    features: [
      'Weekly coaching sessions',
      'Resume & LinkedIn optimization',
      'Interview preparation',
      'Ongoing email support',
      'Priority scheduling',
    ],
    featured: true,
  },
]

export default function CareerGuidancePage(): React.JSX.Element {
  return (
    <section>
      {/* Hero Section */}
      <div className='mb-12'>
        <h1 className='mb-4 text-3xl font-bold tracking-tighter'>
          Transform Your Career with Expert Guidance
        </h1>
        <p className='mb-4 text-lg text-neutral-700 dark:text-neutral-300'>
          Unlock your professional potential with personalized career coaching and mentorship.
          Navigate career transitions, optimize your professional presence, and achieve your goals
          with proven strategies and expert support.
        </p>
        <div className='flex flex-wrap gap-4 mt-6'>
          <a
            href='#contact'
            className='px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors'
          >
            Schedule Free Consultation
          </a>
          <a
            href='#services'
            className='px-6 py-3 border border-black dark:border-white font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors'
          >
            View Services
          </a>
        </div>
      </div>

      {/* About Section */}
      <div className='mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800'>
        <h2 className='mb-4 text-2xl font-semibold tracking-tight'>
          Expert Career Guidance from a Seasoned Professional
        </h2>
        <div className='space-y-4 text-neutral-700 dark:text-neutral-300'>
          <p>
            With years of experience in software engineering, technical leadership, and
            organizational consulting, I bring a unique perspective to career coaching. Having
            navigated complex career transitions and built successful teams, I understand the
            challenges professionals face at every career stage.
          </p>
          <p>
            My approach combines technical expertise with practical coaching methodologies. Whether
            you're transitioning into tech, advancing to leadership roles, or optimizing your career
            trajectory, I provide the guidance and support you need to succeed.
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800'>
            <div>
              <div className='text-3xl font-bold mb-1'>10+</div>
              <div className='text-sm text-neutral-600 dark:text-neutral-400'>Years Experience</div>
            </div>
            <div>
              <div className='text-3xl font-bold mb-1'>100+</div>
              <div className='text-sm text-neutral-600 dark:text-neutral-400'>Clients Helped</div>
            </div>
            <div>
              <div className='text-3xl font-bold mb-1'>95%</div>
              <div className='text-sm text-neutral-600 dark:text-neutral-400'>Success Rate</div>
            </div>
            <div>
              <div className='text-3xl font-bold mb-1'>4.9/5</div>
              <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                Client Satisfaction
              </div>
            </div>
          </div>
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

      {/* Process Section */}
      <div className='mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800'>
        <h2 className='mb-8 text-2xl font-semibold tracking-tight'>How It Works</h2>
        <div className='grid gap-6 md:grid-cols-4'>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xl'>
              1
            </div>
            <h3 className='mb-2 font-semibold'>Book Consultation</h3>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              Schedule your free 30-minute discovery call to discuss your goals
            </p>
          </div>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xl'>
              2
            </div>
            <h3 className='mb-2 font-semibold'>Create Strategy</h3>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              Develop a customized plan based on your unique situation and objectives
            </p>
          </div>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xl'>
              3
            </div>
            <h3 className='mb-2 font-semibold'>Take Action</h3>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              Implement strategies with ongoing guidance and support throughout your journey
            </p>
          </div>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xl'>
              4
            </div>
            <h3 className='mb-2 font-semibold'>Achieve Goals</h3>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              Reach your career milestones and continue growing with expert mentorship
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className='mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800'>
        <h2 className='mb-8 text-2xl font-semibold tracking-tight'>Client Success Stories</h2>
        <div className='grid gap-6 md:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.author}-${index}`}
              className='p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg'
            >
              <p className='mb-4 text-neutral-700 dark:text-neutral-300 italic'>
                "{testimonial.quote}"
              </p>
              <div className='text-sm'>
                <div className='font-semibold'>{testimonial.author}</div>
                <div className='text-neutral-600 dark:text-neutral-400'>{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className='mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800'>
        <h2 className='mb-8 text-2xl font-semibold tracking-tight'>Pricing & Packages</h2>
        <div className='grid gap-6 md:grid-cols-3'>
          {pricingTiers.map(tier => (
            <div
              key={tier.name}
              className={`p-6 border rounded-lg ${
                tier.featured
                  ? 'border-black dark:border-white bg-neutral-50 dark:bg-neutral-900'
                  : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {tier.featured && (
                <div className='mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400'>
                  Most Popular
                </div>
              )}
              <h3 className='mb-2 text-xl font-semibold'>{tier.name}</h3>
              <div className='mb-2'>
                <span className='text-3xl font-bold'>{tier.price}</span>
              </div>
              <div className='mb-4 text-sm text-neutral-600 dark:text-neutral-400'>
                {tier.duration}
              </div>
              <p className='mb-6 text-neutral-700 dark:text-neutral-300'>{tier.description}</p>
              <ul className='space-y-2 mb-6'>
                {tier.features.map(feature => (
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
                href='#contact'
                className={`block w-full text-center px-4 py-2 rounded font-semibold transition-colors ${
                  tier.featured
                    ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200'
                    : 'border border-black dark:border-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                Get Started
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
      <div id='contact' className='mb-12'>
        <h2 className='mb-4 text-2xl font-semibold tracking-tight'>
          Ready to Transform Your Career?
        </h2>
        <p className='mb-6 text-neutral-700 dark:text-neutral-300'>
          Take the first step towards your career goals. Schedule a free consultation to discuss how
          we can help you achieve your professional aspirations.
        </p>
        <div className='p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg'>
          <h3 className='mb-4 text-xl font-semibold'>Multiple Ways to Connect</h3>
          <div className='space-y-3 text-neutral-700 dark:text-neutral-300'>
            <p>
              <strong>Email:</strong> Schedule a consultation or ask questions via{' '}
              <a
                href='https://www.linkedin.com/in/wintersjordan/'
                className='underline hover:text-neutral-900 dark:hover:text-neutral-100'
                target='_blank'
                rel='noopener noreferrer'
              >
                LinkedIn
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong> Connect and message me directly for career guidance
              inquiries
            </p>
            <p>
              <strong>Free Resources:</strong> Subscribe for career tips, industry insights, and
              professional development content
            </p>
          </div>
          <div className='mt-6'>
            <a
              href='https://www.linkedin.com/in/wintersjordan/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors'
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Trust Building */}
      <div className='mb-12'>
        <h2 className='mb-6 text-2xl font-semibold tracking-tight'>
          Why Choose Bidwell Consulting
        </h2>
        <div className='grid gap-6 md:grid-cols-3'>
          <div>
            <h3 className='mb-2 font-semibold'>Real-World Experience</h3>
            <p className='text-sm text-neutral-700 dark:text-neutral-300'>
              Insights from years of navigating complex technical organizations and leading
              successful teams
            </p>
          </div>
          <div>
            <h3 className='mb-2 font-semibold'>Proven Methodologies</h3>
            <p className='text-sm text-neutral-700 dark:text-neutral-300'>
              Data-driven approaches combined with personalized strategies that deliver measurable
              results
            </p>
          </div>
          <div>
            <h3 className='mb-2 font-semibold'>Ongoing Support</h3>
            <p className='text-sm text-neutral-700 dark:text-neutral-300'>
              Continuous guidance and accountability to ensure you stay on track and achieve your
              goals
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
