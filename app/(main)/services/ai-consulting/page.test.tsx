import { axeTest, render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import AiConsultingPage from './page'

describe('AI Consulting Page', () => {
  it('leads with the agent-engineering h1 and practices-what-it-sells proof', () => {
    render(<AiConsultingPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /ai consulting & agent engineering/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /how i coordinate ai coding agents/i })
    ).toHaveAttribute('href', '/blog/agent-coordination')
  })

  it('covers implementation, agents, and AI-native teams', () => {
    render(<AiConsultingPage />)

    expect(
      screen.getByRole('heading', { name: /ai implementation & llm integration/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ai agent development/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /ai-native engineering teams/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /how i approach ai projects/i })).toBeInTheDocument()
  })

  it('has a distinct Twin Cities paragraph about the local adoption moment', () => {
    render(<AiConsultingPage />)

    expect(
      screen.getByRole('heading', { name: /ai work from the twin cities/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/past the demo phase/i)).toBeInTheDocument()
  })

  it('answers real AI-adoption questions in the FAQ', () => {
    render(<AiConsultingPage />)

    expect(
      screen.getByText(/can you build custom ai agents for our workflows\?/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/is our data safe when we use ai tools\?/i)).toBeInTheDocument()
    expect(
      screen.getByText(/do we need custom ai or can we use off-the-shelf tools\?/i)
    ).toBeInTheDocument()
  })

  it('links the related-services triangle and the contact CTA', () => {
    render(<AiConsultingPage />)

    expect(screen.getByRole('link', { name: /engineering practice improvement/i })).toHaveAttribute(
      'href',
      '/services/engineering-practice-improvement'
    )
    expect(screen.getByRole('link', { name: /software consulting/i })).toHaveAttribute(
      'href',
      '/services/software-consulting'
    )
    expect(screen.getByRole('link', { name: /book a free discovery call/i })).toHaveAttribute(
      'href',
      '/contact'
    )
  })

  it('emits Service, FAQPage, and breadcrumb structured data', () => {
    const { container } = render(<AiConsultingPage />)

    const types = Array.from(container.querySelectorAll('script[type="application/ld+json"]')).map(
      script => JSON.parse(script.textContent || '{}')['@type']
    )
    expect(types).toContain('Service')
    expect(types).toContain('FAQPage')
    expect(types).toContain('BreadcrumbList')
  })

  it('has exactly one h1 and a coherent h2 set', () => {
    render(<AiConsultingPage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(8)
  })

  it('is accessible', async () => {
    const { container } = render(<AiConsultingPage />)
    await axeTest(container)
  })

  it('targets "ai consulting minneapolis" in metadata', async () => {
    const { metadata } = await import('./page')
    expect(metadata.title).toBe('AI Consulting in Minneapolis')
    expect(metadata.description).toContain('LLM integration')
    expect(metadata.description).toContain('Minneapolis')
    expect(metadata.alternates?.canonical).toBe('/services/ai-consulting')
  })
})
