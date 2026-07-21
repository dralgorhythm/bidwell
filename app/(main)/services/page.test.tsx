import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import ServicesPage from './page'

describe('Services Hub Page', () => {
  it('renders the hub heading and the solo local intro', () => {
    render(<ServicesPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /consulting services/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/based in minneapolis/i)).toBeInTheDocument()
    expect(screen.getByText(/twin cities metro/i)).toBeInTheDocument()
  })

  it('links all four offerings as cards', () => {
    render(<ServicesPage />)

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
  })

  it('describes who the practice serves and offers the discovery call', () => {
    render(<ServicesPage />)

    expect(screen.getByRole('heading', { name: /who i work with/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /free 30-minute discovery call/i })).toHaveAttribute(
      'href',
      '/contact'
    )
  })

  it('has exactly one h1 and a coherent h2 set', () => {
    render(<ServicesPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3)
  })

  it('is accessible', async () => {
    const { container } = render(<ServicesPage />)
    await axeTest(container)
  })

  it('has hub metadata with a self-canonical', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('Software & AI Consulting Services')
    expect(metadata.description).toContain('Minneapolis')
    expect(metadata.alternates?.canonical).toBe('/services')
  })
})
