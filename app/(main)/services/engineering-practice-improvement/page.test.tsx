import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import EngineeringPracticeImprovementPage from './page'

describe('Engineering Practice Improvement Page', () => {
  it('leads with the consulting h1 and the day-job credential', () => {
    render(<EngineeringPracticeImprovementPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /engineering practice improvement consulting/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/lead engineering practice\s+improvement for a living/i)
    ).toBeInTheDocument()
  })

  it('covers scope, engagement shape, and measurement', () => {
    render(<EngineeringPracticeImprovementPage />)

    expect(
      screen.getByRole('heading', { name: /what practice improvement covers/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /how an engagement runs/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /measuring what matters/i })).toBeInTheDocument()
  })

  it('has a distinct Twin Cities paragraph about embedded on-site time', () => {
    render(<EngineeringPracticeImprovementPage />)

    expect(
      screen.getByRole('heading', { name: /working with twin cities teams/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/embed on-site/i)).toBeInTheDocument()
  })

  it('answers agile-vs-practice and measurement questions in the FAQ', () => {
    render(<EngineeringPracticeImprovementPage />)

    expect(screen.getByText(/is this the same as agile coaching\?/i)).toBeInTheDocument()
    expect(screen.getByText(/how do you measure developer productivity\?/i)).toBeInTheDocument()
    expect(screen.getByText(/can you help us adopt ai coding tools safely\?/i)).toBeInTheDocument()
  })

  it('links the related services and the contact CTA', () => {
    render(<EngineeringPracticeImprovementPage />)

    expect(screen.getByRole('link', { name: /ai & agent engineering/i })).toHaveAttribute(
      'href',
      '/services/ai-consulting'
    )
    expect(screen.getByRole('link', { name: /career coaching/i })).toHaveAttribute(
      'href',
      '/services/career-coaching'
    )
    expect(screen.getByRole('link', { name: /book a free discovery call/i })).toHaveAttribute(
      'href',
      '/contact'
    )
  })

  it('emits Service, FAQPage, and breadcrumb structured data', () => {
    const { container } = render(<EngineeringPracticeImprovementPage />)

    const types = Array.from(container.querySelectorAll('script[type="application/ld+json"]')).map(
      script => JSON.parse(script.textContent || '{}')['@type']
    )
    expect(types).toContain('Service')
    expect(types).toContain('FAQPage')
    expect(types).toContain('BreadcrumbList')
  })

  it('has exactly one h1 and a coherent h2 set', () => {
    render(<EngineeringPracticeImprovementPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(7)
  })

  it('is accessible', async () => {
    const { container } = render(<EngineeringPracticeImprovementPage />)
    await axeTest(container)
  })

  it('targets "engineering process improvement consultant" in metadata', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('Engineering Practice Improvement')
    expect(metadata.description).toContain('process improvement')
    expect(metadata.description).toContain('Twin Cities')
    expect(metadata.alternates?.canonical).toBe('/services/engineering-practice-improvement')
  })
})
