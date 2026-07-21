import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import HomePage from './page'

describe('Home Page', () => {
  it('leads with the Twin Cities h1 and the founder hero', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /software consulting in the twin cities/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /jordan winters/i })).toHaveAttribute('href', '/about')
    expect(screen.getByText(/nearly 20 years/i)).toBeInTheDocument()
  })

  it('shows the primary discovery-call CTA', () => {
    render(<HomePage />)

    const ctas = screen.getAllByRole('link', { name: /book a free discovery call/i })
    expect(ctas.length).toBeGreaterThanOrEqual(1)
    for (const cta of ctas) {
      expect(cta).toHaveAttribute('href', '/contact')
    }
  })

  it('links all four service cards plus the hub', () => {
    render(<HomePage />)

    expect(screen.getByRole('link', { name: /software consulting/i })).toHaveAttribute(
      'href',
      '/services/software-consulting'
    )
    expect(screen.getByRole('link', { name: /ai & agent engineering/i })).toHaveAttribute(
      'href',
      '/services/ai-consulting'
    )
    expect(screen.getByRole('link', { name: /engineering practice improvement/i })).toHaveAttribute(
      'href',
      '/services/engineering-practice-improvement'
    )
    expect(screen.getByRole('link', { name: /career coaching/i })).toHaveAttribute(
      'href',
      '/services/career-coaching'
    )
    expect(screen.getByRole('link', { name: /all services/i })).toHaveAttribute('href', '/services')
  })

  it('differentiates with AI-native proof linking the essay', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: /ai-native consulting/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /how i coordinate ai coding agents/i })
    ).toHaveAttribute('href', '/blog/agent-coordination')
  })

  it('carries exactly one local trust line', () => {
    render(<HomePage />)

    expect(
      screen.getByText(/based in minneapolis and serving the twin cities metro/i)
    ).toBeInTheDocument()
  })

  it('keeps the solo first-person voice (no "our team")', () => {
    const { container } = render(<HomePage />)

    expect(container.textContent).not.toMatch(/our team/i)
  })

  it('opens external links safely', () => {
    render(<HomePage />)

    const externalLinks = screen
      .getAllByRole('link')
      .filter(link => (link.getAttribute('href') ?? '').startsWith('http'))
    for (const link of externalLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('has exactly one h1 and a coherent h2 set', () => {
    render(<HomePage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3)
  })

  it('is accessible', async () => {
    const { container } = render(<HomePage />)
    await axeTest(container)
  })

  it('targets "software consulting twin cities" keyword-first', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('Twin Cities Software Consulting')
    expect(metadata.description).toContain('Minneapolis')
    expect(metadata.description).toContain('Twin Cities')
    expect(metadata.alternates?.canonical).toBe('/')
  })
})
