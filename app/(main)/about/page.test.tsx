import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import AboutPage from './page'

describe('About Page', () => {
  it('names Jordan Winters with the Minneapolis base and experience claim', () => {
    render(<AboutPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /about jordan winters/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/live and work in minneapolis/i)).toBeInTheDocument()
    expect(screen.getByText(/over a decade/i)).toBeInTheDocument()
  })

  it('links the public proof surfaces safely', () => {
    render(<AboutPage />)

    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/wintersjordan/')
    const github = screen.getByRole('link', { name: /github/i })
    expect(github).toHaveAttribute('href', 'https://github.com/dralgorhythm')
    for (const link of [linkedin, github]) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    expect(screen.getByRole('link', { name: /coordinating ai coding agents/i })).toHaveAttribute(
      'href',
      '/blog/agent-coordination'
    )
  })

  it('states beliefs and the solo working model', () => {
    render(<AboutPage />)

    expect(screen.getByRole('heading', { name: /what i believe/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /how i work/i })).toBeInTheDocument()
    expect(screen.getByText(/solo by design/i)).toBeInTheDocument()
  })

  it('links all four services and the contact page from Work With Me', () => {
    render(<AboutPage />)

    expect(screen.getByRole('link', { name: /software consulting/i })).toHaveAttribute(
      'href',
      '/services/software-consulting'
    )
    expect(screen.getByRole('link', { name: /career coaching/i })).toHaveAttribute(
      'href',
      '/services/career-coaching'
    )
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', '/contact')
  })

  it('has exactly one h1 and a coherent h2 set', () => {
    render(<AboutPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5)
  })

  it('is accessible', async () => {
    const { container } = render(<AboutPage />)
    await axeTest(container)
  })

  it('has entity-page metadata', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('About Jordan Winters')
    expect(metadata.description).toContain('Minneapolis-based software consultant')
    expect(metadata.alternates?.canonical).toBe('/about')
  })
})
