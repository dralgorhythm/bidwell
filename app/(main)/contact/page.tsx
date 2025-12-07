import type { Metadata } from 'next'
import type React from 'react'
import ContactForm from './contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Bidwell Consulting for career coaching, consulting services, or general inquiries. We respond to all messages within 24-48 hours.',
  keywords: [
    'contact',
    'get in touch',
    'career coaching',
    'consulting inquiry',
    'business contact',
    'professional services',
  ],
  openGraph: {
    title: 'Contact - Bidwell Consulting',
    description:
      'Reach out for career coaching, consulting services, or any questions. Professional consultation available.',
    type: 'website',
    images: [
      {
        url: '/og?title=Contact',
        width: 1200,
        height: 630,
        alt: 'Contact Bidwell Consulting',
      },
    ],
  },
}

export default function ContactPage(): React.JSX.Element {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>Get in Touch</h1>

      <div className='mb-8'>
        <p className='mb-4'>
          I&apos;d love to hear from you! Whether you&apos;re interested in career coaching,
          consulting services, or just have a question, feel free to reach out using the form below.
        </p>
        <p className='mb-6 text-sm text-gray-600 dark:text-gray-400'>
          I typically respond to all inquiries within 24-48 hours during business days.
        </p>
      </div>

      <ContactForm />
    </section>
  )
}
