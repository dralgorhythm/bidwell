export interface Experiment {
  slug: string
  title: string
  description: string
  status: 'active' | 'coming-soon' | 'archived'
  category?: string
}

export const experiments: Experiment[] = [
  {
    slug: 'sample',
    title: 'Sample Experiment',
    description:
      'A demonstration of the experiments framework showcasing full-width layouts and interactive elements.',
    status: 'active',
    category: 'Demo',
  },
]

export function getActiveExperiments(): Experiment[] {
  return experiments.filter(exp => exp.status === 'active')
}

export function getExperimentBySlug(slug: string): Experiment | undefined {
  return experiments.find(exp => exp.slug === slug)
}
