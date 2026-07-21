import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import CareerCoachingPage from './page'

const LINKEDIN_URL = 'https://www.linkedin.com/in/wintersjordan/'

describe('Career Coaching Page', () => {
  it('renders the hero section with main heading', () => {
    render(<CareerCoachingPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /tech career coaching/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/coach engineers and tech professionals/i)).toBeInTheDocument()
  })

  it('states the Minneapolis base without making location a blocker', () => {
    render(<CareerCoachingPage />)

    expect(screen.getAllByText(/based in minneapolis/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/location never gets in the way/i)).toBeInTheDocument()
  })

  it('displays the hero call-to-action with a discovery-call alternative', () => {
    render(<CareerCoachingPage />)

    const heroCta = screen.getByRole('link', { name: /get in touch on linkedin/i })
    expect(heroCta).toHaveAttribute('href', LINKEDIN_URL)

    const discoveryLinks = screen.getAllByRole('link', { name: /book a free discovery call/i })
    expect(discoveryLinks.length).toBeGreaterThanOrEqual(1)
    for (const link of discoveryLinks) {
      expect(link).toHaveAttribute('href', '/contact')
    }
  })

  it('displays all service offerings', () => {
    render(<CareerCoachingPage />)

    expect(screen.getByRole('heading', { name: /services offered/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /1-on-1 coaching/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /resume & linkedin review/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /interview prep/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /career transitions/i })).toBeInTheDocument()
  })

  it('displays engagement options with durations', () => {
    render(<CareerCoachingPage />)

    expect(screen.getByRole('heading', { name: /ways to work together/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /discovery call/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^single session$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ongoing mentorship/i })).toBeInTheDocument()
    expect(screen.getByText('30 minutes')).toBeInTheDocument()
    expect(screen.getByText('60 minutes')).toBeInTheDocument()
    expect(screen.getByText('3 months')).toBeInTheDocument()
  })

  it('includes FAQ section with the Twin Cities question', () => {
    render(<CareerCoachingPage />)

    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument()
    expect(screen.getByText(/how long are sessions\?/i)).toBeInTheDocument()
    expect(
      screen.getByText(/do you offer career coaching in the twin cities\?/i)
    ).toBeInTheDocument()
  })

  it('renders contact section with LinkedIn and an about link', () => {
    render(<CareerCoachingPage />)

    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /connect on linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /more about my background/i })).toHaveAttribute(
      'href',
      '/about'
    )
  })

  it('opens external links safely in a new tab', () => {
    render(<CareerCoachingPage />)

    const externalLinks = screen
      .getAllByRole('link')
      .filter(link => (link.getAttribute('href') ?? '').startsWith('http'))
    expect(externalLinks.length).toBeGreaterThan(0)
    for (const link of externalLinks) {
      expect(link).toHaveAttribute('href', LINKEDIN_URL)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('renders breadcrumb navigation to the services hub', () => {
    render(<CareerCoachingPage />)

    const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i })
    expect(breadcrumb).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
  })

  it('emits Service and FAQPage structured data', () => {
    const { container } = render(<CareerCoachingPage />)

    const schemas = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]')
    ).map(script => JSON.parse(script.textContent || '{}'))
    const types = schemas.map(schema => schema['@type'])
    expect(types).toContain('Service')
    expect(types).toContain('FAQPage')
    expect(types).toContain('BreadcrumbList')
  })

  it('has proper heading hierarchy', () => {
    render(<CareerCoachingPage />)

    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)

    const h2Elements = screen.getAllByRole('heading', { level: 2 })
    expect(h2Elements).toHaveLength(4)
  })

  it('exposes anchor targets for deep links', () => {
    const { container } = render(<CareerCoachingPage />)

    expect(container.querySelector('#services')).toBeInTheDocument()
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('is accessible', async () => {
    const { container } = render(<CareerCoachingPage />)
    await axeTest(container)
  })

  it('has locally-targeted metadata in the solo voice', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('Tech Career Coaching in Minneapolis')
    expect(metadata.description).toContain('Career coaching for software engineers')
    expect(metadata.description).toContain('Minneapolis')
    expect(metadata.description).not.toMatch(/\bwe\b/i)
    expect(metadata.alternates?.canonical).toBe('/services/career-coaching')
    expect(metadata.keywords).toContain('tech career coach')
  })
})
