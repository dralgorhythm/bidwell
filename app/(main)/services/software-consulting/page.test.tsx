import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import SoftwareConsultingPage from './page'

describe('Software Consulting Page', () => {
  it('leads with the Minneapolis-targeted h1 and hands-on positioning', () => {
    render(<SoftwareConsultingPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /software consulting in minneapolis/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/nearly 20 years/i)).toBeInTheDocument()
  })

  it('covers development, architecture, and rescue offerings', () => {
    render(<SoftwareConsultingPage />)

    expect(
      screen.getByRole('heading', { name: /custom software development/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /architecture & technical strategy/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /rescue & modernization/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /how engagements work/i })).toBeInTheDocument()
  })

  it('has a distinct Twin Cities paragraph about onsite collaboration', () => {
    render(<SoftwareConsultingPage />)

    expect(
      screen.getByRole('heading', { name: /working together in the twin cities/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/anywhere in the minneapolis–st\. paul metro/i)).toBeInTheDocument()
  })

  it('answers the cost question honestly in the FAQ', () => {
    render(<SoftwareConsultingPage />)

    expect(
      screen.getByText(/how much does a software consultant cost in minneapolis\?/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/what does a software consultant actually do\?/i)).toBeInTheDocument()
    expect(screen.getByText(/do you work onsite in the twin cities\?/i)).toBeInTheDocument()
  })

  it('links the related-services triangle and the contact CTA', () => {
    render(<SoftwareConsultingPage />)

    expect(screen.getByRole('link', { name: /ai & agent engineering/i })).toHaveAttribute(
      'href',
      '/services/ai-consulting'
    )
    expect(screen.getByRole('link', { name: /engineering practice improvement/i })).toHaveAttribute(
      'href',
      '/services/engineering-practice-improvement'
    )
    expect(screen.getByRole('link', { name: /book a free discovery call/i })).toHaveAttribute(
      'href',
      '/contact'
    )
  })

  it('emits Service, FAQPage, and breadcrumb structured data', () => {
    const { container } = render(<SoftwareConsultingPage />)

    const types = Array.from(container.querySelectorAll('script[type="application/ld+json"]')).map(
      script => JSON.parse(script.textContent || '{}')['@type']
    )
    expect(types).toContain('Service')
    expect(types).toContain('FAQPage')
    expect(types).toContain('BreadcrumbList')
  })

  it('has exactly one h1 and a coherent h2 set', () => {
    render(<SoftwareConsultingPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(8)
  })

  it('is accessible', async () => {
    const { container } = render(<SoftwareConsultingPage />)
    await axeTest(container)
  })

  it('targets "software consultant minneapolis" in metadata', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('Software Consulting in Minneapolis')
    expect(metadata.description).toContain('Minneapolis')
    expect(metadata.description).toContain('Twin Cities')
    expect(metadata.alternates?.canonical).toBe('/services/software-consulting')
  })
})
