import { experiments, getActiveExperiments, getExperimentBySlug } from './config'

describe('Experiments Configuration', () => {
  describe('experiments array', () => {
    it('should be defined and be an array', () => {
      expect(experiments).toBeDefined()
      expect(Array.isArray(experiments)).toBe(true)
    })

    it('should contain the sample experiment', () => {
      const sampleExperiment = experiments.find(exp => exp.slug === 'sample')
      expect(sampleExperiment).toBeDefined()
      expect(sampleExperiment?.title).toBe('Sample Experiment')
      expect(sampleExperiment?.status).toBe('active')
    })

    it('should have valid experiment structure for all entries', () => {
      for (const experiment of experiments) {
        expect(experiment.slug).toBeDefined()
        expect(typeof experiment.slug).toBe('string')
        expect(experiment.title).toBeDefined()
        expect(typeof experiment.title).toBe('string')
        expect(experiment.description).toBeDefined()
        expect(typeof experiment.description).toBe('string')
        expect(['active', 'coming-soon', 'archived']).toContain(experiment.status)
      }
    })
  })

  describe('getActiveExperiments', () => {
    it('should return only active experiments', () => {
      const activeExperiments = getActiveExperiments()
      for (const experiment of activeExperiments) {
        expect(experiment.status).toBe('active')
      }
    })

    it('should return an array', () => {
      const result = getActiveExperiments()
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('getExperimentBySlug', () => {
    it('should return the correct experiment for a valid slug', () => {
      const experiment = getExperimentBySlug('sample')
      expect(experiment).toBeDefined()
      expect(experiment?.slug).toBe('sample')
    })

    it('should return undefined for an invalid slug', () => {
      const experiment = getExperimentBySlug('nonexistent-experiment')
      expect(experiment).toBeUndefined()
    })

    it('should return undefined for an empty slug', () => {
      const experiment = getExperimentBySlug('')
      expect(experiment).toBeUndefined()
    })
  })
})
