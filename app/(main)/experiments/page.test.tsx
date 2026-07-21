import { axeTest, render, screen } from 'lib/test-utils'
import ExperimentsPage from './page'

describe('Experiments Index Page', () => {
  describe('rendering', () => {
    it('renders the page title', () => {
      render(<ExperimentsPage />)
      expect(screen.getByRole('heading', { level: 1, name: /experiments/i })).toBeInTheDocument()
    })

    it('renders the page description', () => {
      render(<ExperimentsPage />)
      expect(screen.getByText(/collection of interactive experiments/i)).toBeInTheDocument()
    })

    it('renders experiment cards in a grid', () => {
      render(<ExperimentsPage />)
      // Should have multiple experiment links
      const experimentCards = screen.getAllByRole('link')
      expect(experimentCards.length).toBeGreaterThan(0)
    })
  })

  describe('experiment cards', () => {
    it('displays the sample experiment as active', () => {
      render(<ExperimentsPage />)
      expect(screen.getByText(/sample experiment/i)).toBeInTheDocument()
      // Active experiments (claude-agentic-framework, sample) show "Active" badges
      expect(screen.getAllByText('Active')).toHaveLength(2)
    })

    it('displays the claude agentic framework experiment as active', () => {
      render(<ExperimentsPage />)
      const frameworkHeading = screen.getByRole('heading', {
        name: /claude agentic framework/i,
      })
      const frameworkLink = frameworkHeading.closest('a')
      expect(frameworkLink).toHaveAttribute('href', '/experiments/claude-agentic-framework')
      expect(frameworkLink).not.toHaveAttribute('aria-disabled', 'true')
    })

    it('displays coming-soon experiments with correct badge', () => {
      render(<ExperimentsPage />)
      // Should have multiple "Coming Soon" badges
      const comingSoonBadges = screen.getAllByText('Coming Soon')
      expect(comingSoonBadges.length).toBeGreaterThan(0)
    })

    it('displays all 12 new experiment titles', () => {
      render(<ExperimentsPage />)
      const experimentTitles = [
        'Sonic Weather',
        'Geological Rhythms',
        'Data Music Generator',
        'Harmonic Deck',
        'Physics of Traffic',
        'Infrastructure Weather Topology',
        'Developer Diaspora',
        'Economic Sentiment',
        'Live Order Book',
        'Global Anxiety Map',
        'DevOps ROI Monitor',
        'Seasonal Mind',
      ]
      for (const title of experimentTitles) {
        expect(screen.getByText(title)).toBeInTheDocument()
      }
    })

    it('displays category labels for experiments', () => {
      render(<ExperimentsPage />)
      // Check for some category labels
      expect(screen.getAllByText('Auditory Interface').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Living Systems').length).toBeGreaterThan(0)
    })

    it('active experiment links point to correct path', () => {
      render(<ExperimentsPage />)
      // Find the Sample Experiment card by its heading, then traverse to the link
      const sampleHeading = screen.getByRole('heading', {
        name: /sample experiment/i,
      })
      const sampleLink = sampleHeading.closest('a')
      expect(sampleLink).toHaveAttribute('href', '/experiments/sample')
    })

    it('coming-soon experiments have disabled links', () => {
      render(<ExperimentsPage />)
      // Find a coming-soon experiment's link
      const sonicWeatherHeading = screen.getByRole('heading', {
        name: /sonic weather/i,
      })
      const sonicWeatherLink = sonicWeatherHeading.closest('a')
      expect(sonicWeatherLink).toHaveAttribute('aria-disabled', 'true')
      expect(sonicWeatherLink).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('accessibility', () => {
    it('is accessible', async () => {
      const { container } = render(<ExperimentsPage />)
      await axeTest(container)
    })

    it('has a single h1 heading', () => {
      render(<ExperimentsPage />)
      const h1Elements = screen.getAllByRole('heading', { level: 1 })
      expect(h1Elements).toHaveLength(1)
    })

    it('all experiment cards have proper heading hierarchy', () => {
      render(<ExperimentsPage />)
      // Each experiment card should have an h2 heading
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      // Should have at least 14 h2s (one for each experiment card)
      expect(h2Elements.length).toBeGreaterThanOrEqual(14)
    })

    it('coming-soon links are properly marked as disabled', () => {
      render(<ExperimentsPage />)
      // Find links with aria-disabled
      const disabledLinks = screen
        .getAllByRole('link')
        .filter(link => link.getAttribute('aria-disabled') === 'true')
      // Should have 12 disabled links (coming-soon experiments)
      expect(disabledLinks.length).toBe(12)
    })
  })

  describe('SEO', () => {
    it('has descriptive content for search engines', () => {
      render(<ExperimentsPage />)
      // Page should have descriptive text
      expect(screen.getByText(/interactive experiments, prototypes/i)).toBeInTheDocument()
    })

    it('experiment descriptions are present', () => {
      render(<ExperimentsPage />)
      // Check for sample experiment description
      expect(screen.getByText(/demonstration of the experiments framework/i)).toBeInTheDocument()
    })
  })
})
