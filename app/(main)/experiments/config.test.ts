import { experiments, getActiveExperiments, getExperimentBySlug } from './config'

describe('Experiments Config', () => {
  describe('experiments array', () => {
    it('contains 14 experiments', () => {
      expect(experiments).toHaveLength(14)
    })

    it('has required fields for each experiment', () => {
      for (const experiment of experiments) {
        expect(experiment).toHaveProperty('slug')
        expect(experiment).toHaveProperty('title')
        expect(experiment).toHaveProperty('description')
        expect(experiment).toHaveProperty('status')
        expect(typeof experiment.slug).toBe('string')
        expect(typeof experiment.title).toBe('string')
        expect(typeof experiment.description).toBe('string')
        expect(['active', 'coming-soon', 'archived']).toContain(experiment.status)
      }
    })

    it('has unique slugs for each experiment', () => {
      const slugs = experiments.map(exp => exp.slug)
      const uniqueSlugs = new Set(slugs)
      expect(slugs.length).toBe(uniqueSlugs.size)
    })

    it('contains all expected experiment slugs', () => {
      const expectedSlugs = [
        'claude-agentic-framework',
        'sonic-weather',
        'geological-rhythms',
        'data-music-generator',
        'harmonic-deck',
        'physics-of-traffic',
        'infrastructure-weather-topology',
        'developer-diaspora',
        'economic-sentiment',
        'live-order-book',
        'global-anxiety-map',
        'devops-roi-monitor',
        'seasonal-mind',
        'sample',
      ]
      const actualSlugs = experiments.map(exp => exp.slug)
      for (const slug of expectedSlugs) {
        expect(actualSlugs).toContain(slug)
      }
    })

    it('has valid categories for categorized experiments', () => {
      const validCategories = [
        'Agentic Engineering',
        'Auditory Interface',
        'Living Systems',
        'Economic & Social Pulse',
        'Quantified Organization',
        'Quantified Self',
        'Demo',
      ]
      for (const experiment of experiments) {
        if (experiment.category) {
          expect(validCategories).toContain(experiment.category)
        }
      }
    })
  })

  describe('getActiveExperiments', () => {
    it('returns only active experiments', () => {
      const activeExperiments = getActiveExperiments()
      for (const experiment of activeExperiments) {
        expect(experiment.status).toBe('active')
      }
    })

    it('includes the sample experiment as active', () => {
      const activeExperiments = getActiveExperiments()
      const sampleExperiment = activeExperiments.find(exp => exp.slug === 'sample')
      expect(sampleExperiment).toBeDefined()
    })

    it('includes the claude-agentic-framework experiment as active', () => {
      const activeExperiments = getActiveExperiments()
      const frameworkExperiment = activeExperiments.find(
        exp => exp.slug === 'claude-agentic-framework'
      )
      expect(frameworkExperiment).toBeDefined()
    })
  })

  describe('getExperimentBySlug', () => {
    it('returns experiment when slug exists', () => {
      const experiment = getExperimentBySlug('sample')
      expect(experiment).toBeDefined()
      expect(experiment?.slug).toBe('sample')
    })

    it('returns undefined for non-existent slug', () => {
      const experiment = getExperimentBySlug('non-existent-experiment')
      expect(experiment).toBeUndefined()
    })

    it('returns correct experiment for each slug', () => {
      for (const experiment of experiments) {
        const found = getExperimentBySlug(experiment.slug)
        expect(found).toBeDefined()
        expect(found?.title).toBe(experiment.title)
      }
    })
  })
})
