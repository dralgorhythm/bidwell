import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import Footer from './footer'

describe('Footer Component', () => {
  it('links all four services', () => {
    render(<Footer />)

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

  it('links the site pages including experiments', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/blog')
    expect(screen.getByRole('link', { name: /experiments/i })).toHaveAttribute(
      'href',
      '/experiments'
    )
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact')
  })

  it('opens social links safely in a new tab', () => {
    render(<Footer />)

    const socials: [string, string][] = [
      ['linkedin', 'https://www.linkedin.com/in/wintersjordan/'],
      ['github', 'https://github.com/dralgorhythm'],
      ['soundcloud', 'https://soundcloud.com/dralgorhythm'],
    ]
    for (const [name, href] of socials) {
      const link = screen.getByRole('link', { name: new RegExp(name, 'i') })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('shows the NAP line exactly once, plain', () => {
    render(<Footer />)

    expect(
      screen.getAllByText(/bidwell consulting · minneapolis, mn · serving the twin cities metro/i)
    ).toHaveLength(1)
  })

  it('is a labeled footer navigation landmark', () => {
    render(<Footer />)

    expect(screen.getByRole('navigation', { name: /footer/i })).toBeInTheDocument()
  })

  it('is accessible', async () => {
    const { container } = render(<Footer />)
    await axeTest(container)
  })
})
