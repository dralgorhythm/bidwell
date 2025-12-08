import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import CareerGuidancePage from './page'

describe('Career Guidance Page', () => {
  it('renders the hero section with main heading', () => {
    render(<CareerGuidancePage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /transform your career with expert guidance/i })
    ).toBeInTheDocument()
  })

  it('displays call-to-action buttons in hero', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByText(/schedule free consultation/i)).toBeInTheDocument()
    expect(screen.getByText(/view services/i)).toBeInTheDocument()
  })

  it('includes professional bio and credentials', () => {
    render(<CareerGuidancePage />)

    expect(
      screen.getByRole('heading', { name: /expert career guidance from a seasoned professional/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/10\+/)).toBeInTheDocument()
    expect(screen.getByText(/years experience/i)).toBeInTheDocument()
  })

  it('displays all service offerings', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /1-on-1 career coaching/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /resume & linkedin optimization/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /interview preparation/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /career transition strategy/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /leadership development/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /salary negotiation/i })).toBeInTheDocument()
  })

  it('renders the process section', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /how it works/i })).toBeInTheDocument()
    expect(screen.getByText(/book consultation/i)).toBeInTheDocument()
    expect(screen.getByText(/create strategy/i)).toBeInTheDocument()
    expect(screen.getByText(/take action/i)).toBeInTheDocument()
    expect(screen.getByText(/achieve goals/i)).toBeInTheDocument()
  })

  it('includes client testimonials', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /client success stories/i })).toBeInTheDocument()
    expect(
      screen.getByText(/working with bidwell consulting transformed my career trajectory/i)
    ).toBeInTheDocument()
  })

  it('displays pricing tiers', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /pricing & packages/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /discovery session/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^single session$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /career accelerator/i })).toBeInTheDocument()
    expect(screen.getByText(/most popular/i)).toBeInTheDocument()
  })

  it('includes FAQ section', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument()
    expect(screen.getByText(/how long are the coaching sessions\?/i)).toBeInTheDocument()
    expect(screen.getByText(/what if i'm not sure which service i need\?/i)).toBeInTheDocument()
  })

  it('renders contact section', () => {
    render(<CareerGuidancePage />)

    expect(
      screen.getByRole('heading', { name: /ready to transform your career\?/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/multiple ways to connect/i)).toBeInTheDocument()
  })

  it('includes LinkedIn links', () => {
    render(<CareerGuidancePage />)

    const linkedinLink = screen.getByRole('link', { name: /connect on linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/wintersjordan/')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('displays trust building section', () => {
    render(<CareerGuidancePage />)

    expect(
      screen.getByRole('heading', { name: /why choose bidwell consulting/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /real-world experience/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /proven methodologies/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ongoing support/i })).toBeInTheDocument()
  })

  it('has proper heading hierarchy', () => {
    render(<CareerGuidancePage />)

    // Should have exactly one h1
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)

    // Should have multiple h2 headings for main sections
    const h2Elements = screen.getAllByRole('heading', { level: 2 })
    expect(h2Elements.length).toBeGreaterThan(5)
  })

  it('includes anchor links for navigation', () => {
    render(<CareerGuidancePage />)

    const servicesLinks = screen.getAllByRole('link', { name: /view services/i })
    expect(servicesLinks[0]).toHaveAttribute('href', '#services')

    const contactLinks = screen.getAllByRole('link', { name: /schedule free consultation/i })
    expect(contactLinks[0]).toHaveAttribute('href', '#contact')
  })

  it('displays service benefits with checkmarks', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByText(/customized career roadmap/i)).toBeInTheDocument()
    expect(screen.getByText(/ats-optimized resume writing/i)).toBeInTheDocument()
    expect(screen.getByText(/mock interview sessions/i)).toBeInTheDocument()
  })

  it('shows statistics in about section', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByText(/100\+/)).toBeInTheDocument()
    expect(screen.getByText(/clients helped/i)).toBeInTheDocument()
    expect(screen.getByText(/95%/)).toBeInTheDocument()
    expect(screen.getByText(/success rate/i)).toBeInTheDocument()
  })

  it('is accessible', async () => {
    const { container } = render(<CareerGuidancePage />)
    await axeTest(container)
  })

  it('has proper metadata', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('Career Guidance & Coaching Services')
    expect(metadata.description).toContain('Professional career coaching')
    expect(metadata.keywords).toContain('career coach')
    expect(metadata.keywords).toContain('career guidance')
  })

  it('displays all FAQ questions', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByText(/how long are the coaching sessions\?/i)).toBeInTheDocument()
    expect(screen.getByText(/what if i'm not sure which service i need\?/i)).toBeInTheDocument()
    expect(screen.getByText(/do you offer packages or subscriptions\?/i)).toBeInTheDocument()
    expect(screen.getByText(/how quickly can i expect results\?/i)).toBeInTheDocument()
    expect(screen.getByText(/do you specialize in any particular industry\?/i)).toBeInTheDocument()
    expect(screen.getByText(/can you help with remote job searches\?/i)).toBeInTheDocument()
  })

  it('includes all pricing tier features', () => {
    render(<CareerGuidancePage />)

    expect(screen.getByText(/initial assessment/i)).toBeInTheDocument()
    expect(screen.getByText(/no commitment required/i)).toBeInTheDocument()
    expect(screen.getByText(/dedicated 1-on-1 time/i)).toBeInTheDocument()
    expect(screen.getByText(/weekly coaching sessions/i)).toBeInTheDocument()
    expect(screen.getByText(/priority scheduling/i)).toBeInTheDocument()
  })

  it('has multiple CTA buttons throughout the page', () => {
    render(<CareerGuidancePage />)

    const getStartedButtons = screen.getAllByRole('link', { name: /get started/i })
    expect(getStartedButtons.length).toBeGreaterThan(0)
  })
})
