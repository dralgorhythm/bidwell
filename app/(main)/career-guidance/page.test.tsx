import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import CareerGuidancePage from './page'

const LINKEDIN_URL = 'https://www.linkedin.com/in/wintersjordan/'

describe('Career Guidance Page', () => {
  it('renders the hero section with main heading', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { level: 1, name: /career guidance/i })).toBeInTheDocument()
    expect(screen.getByText(/career coaching/i)).toBeInTheDocument()
  })

  it('displays the hero call-to-action', () => {
    render(<CareerGuidancePage />)

    const heroCta = screen.getByRole('link', { name: /get in touch on linkedin/i })
    expect(heroCta).toHaveAttribute('href', LINKEDIN_URL)
  })

  it('displays all service offerings', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /services offered/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /1-on-1 coaching/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /resume & linkedin review/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /interview prep/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /career transitions/i })).toBeInTheDocument()
  })

  it('displays service benefits', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByText(/personalized advice/i)).toBeInTheDocument()
    expect(screen.getByText(/ats optimization/i)).toBeInTheDocument()
    expect(screen.getByText(/mock interviews/i)).toBeInTheDocument()
    expect(screen.getByText(/transition planning/i)).toBeInTheDocument()
  })

  it('displays engagement options with durations', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /ways to work together/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /discovery call/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^single session$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ongoing mentorship/i })).toBeInTheDocument()
    expect(screen.getByText('30 minutes')).toBeInTheDocument()
    expect(screen.getByText('60 minutes')).toBeInTheDocument()
    expect(screen.getByText('3 months')).toBeInTheDocument()
  })

  it('renders a reach-out link for every engagement option', () => {
    render(<CareerGuidancePage />)

    const reachOutLinks = screen.getAllByRole('link', { name: /reach out/i })
    expect(reachOutLinks).toHaveLength(3)
    for (const link of reachOutLinks) {
      expect(link).toHaveAttribute('href', LINKEDIN_URL)
    }
  })

  it('includes FAQ section with all questions', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument()
    expect(screen.getByText(/how long are sessions\?/i)).toBeInTheDocument()
    expect(screen.getByText(/not sure what you need\?/i)).toBeInTheDocument()
    expect(screen.getByText(/packages available\?/i)).toBeInTheDocument()
    expect(screen.getByText(/industry focus\?/i)).toBeInTheDocument()
    expect(screen.getByText(/remote work\?/i)).toBeInTheDocument()
  })

  it('renders contact section', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /connect on linkedin/i })).toBeInTheDocument()
  })

  it('opens all external links safely in a new tab', () => {
    render(<CareerGuidancePage />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link).toHaveAttribute('href', LINKEDIN_URL)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('has proper heading hierarchy', () => {
    render(<CareerGuidancePage />)

    // Should have exactly one h1
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)

    // One h2 per main section: services, engagement, FAQ, contact
    const h2Elements = screen.getAllByRole('heading', { level: 2 })
    expect(h2Elements).toHaveLength(4)
  })

  it('exposes anchor targets for deep links', () => {
    const { container } = render(<CareerGuidancePage />)

    expect(container.querySelector('#services')).toBeInTheDocument()
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('is accessible', async () => {
    const { container } = render(<CareerGuidancePage />)
    await axeTest(container)
  })

  it('has proper metadata', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('Career Guidance')
    expect(metadata.description).toContain('career coaching')
    expect(metadata.keywords).toContain('career coach')
    expect(metadata.keywords).toContain('career guidance')
  })
})
