import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import ContactPage from './page'

describe('Contact Page', () => {
  it('renders the heading with email-primary and LinkedIn CTAs', () => {
    render(<ContactPage />)

    expect(screen.getByRole('heading', { level: 1, name: /contact/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^email me$/i })).toHaveAttribute(
      'href',
      'mailto:jordan@bidwell.info'
    )
    const cta = screen.getByRole('link', { name: /message me on linkedin/i })
    expect(cta).toHaveAttribute('href', 'https://www.linkedin.com/in/wintersjordan/')
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('explains the free discovery call honestly', () => {
    render(<ContactPage />)

    expect(screen.getByRole('heading', { name: /free discovery call/i })).toBeInTheDocument()
    expect(screen.getByText(/no commitment, no pitch/i)).toBeInTheDocument()
  })

  it('tells prospects what to include', () => {
    render(<ContactPage />)

    expect(screen.getByRole('heading', { name: /what to include/i })).toBeInTheDocument()
    expect(screen.getByText(/rough timeline/i)).toBeInTheDocument()
  })

  it('shows the NAP line exactly once', () => {
    render(<ContactPage />)

    expect(
      screen.getAllByText(/bidwell consulting · minneapolis, mn · serving the twin cities metro/i)
    ).toHaveLength(1)
  })

  it('has exactly one h1 and a coherent h2 set', () => {
    render(<ContactPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3)
  })

  it('is accessible', async () => {
    const { container } = render(<ContactPage />)
    await axeTest(container)
  })

  it('has navigational metadata with the local line', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('Contact')
    expect(metadata.description).toContain('Minneapolis')
    expect(metadata.alternates?.canonical).toBe('/contact')
  })
})
