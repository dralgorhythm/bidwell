export interface Experiment {
  slug: string
  title: string
  description: string
  status: 'active' | 'coming-soon' | 'archived'
  category?: string
}

export const experiments: Experiment[] = [
  {
    slug: 'sonic-weather',
    title: 'Sonic Weather',
    description:
      'The Atmospheric Synthesizer - Translating real-time thermodynamic variables into a generative, ambient soundscape.',
    status: 'coming-soon',
    category: 'Auditory Interface',
  },
  {
    slug: 'geological-rhythms',
    title: 'Geological Rhythms',
    description:
      "The Seismic Percussionist - Transforming Earth's tectonic activity into a polyrhythmic percussion engine.",
    status: 'coming-soon',
    category: 'Auditory Interface',
  },
  {
    slug: 'data-music-generator',
    title: 'Data Music Generator',
    description:
      'The Algorithmic Composer - Creating endless ambient music generated entirely by code using stochastic algorithms.',
    status: 'coming-soon',
    category: 'Auditory Interface',
  },
  {
    slug: 'harmonic-deck',
    title: 'Harmonic Deck',
    description:
      'The Gamified Composer - Music composition using deck-building card game mechanics.',
    status: 'coming-soon',
    category: 'Auditory Interface',
  },
  {
    slug: 'physics-of-traffic',
    title: 'Physics of Traffic',
    description:
      'The Fluid Highway - Visualizing city transit networks using the laws of fluid dynamics.',
    status: 'coming-soon',
    category: 'Living Systems',
  },
  {
    slug: 'infrastructure-weather-topology',
    title: 'Infrastructure Weather Topology',
    description:
      'The Network Climate - Global internet topology as a 3D globe with network performance rendered as weather conditions.',
    status: 'coming-soon',
    category: 'Living Systems',
  },
  {
    slug: 'developer-diaspora',
    title: 'Developer Diaspora',
    description:
      'The Migration Map - Mapping the movement of human talent across the open-source landscape.',
    status: 'coming-soon',
    category: 'Living Systems',
  },
  {
    slug: 'economic-sentiment',
    title: 'Economic Sentiment',
    description:
      'The Meme Market - Visualizing financial ideas as viruses using the SIR epidemiological model.',
    status: 'coming-soon',
    category: 'Economic & Social Pulse',
  },
  {
    slug: 'live-order-book',
    title: 'Live Order Book',
    description:
      'The Market Depth Crumble - Rendering the limit order book as a physical structure with trades as projectiles.',
    status: 'coming-soon',
    category: 'Economic & Social Pulse',
  },
  {
    slug: 'global-anxiety-map',
    title: 'Global Anxiety Map',
    description:
      'The Sentiment Geoscope - Geospatial visualization of anxiety and uncertainty from global news media.',
    status: 'coming-soon',
    category: 'Economic & Social Pulse',
  },
  {
    slug: 'devops-roi-monitor',
    title: 'DevOps ROI Monitor',
    description:
      'The Gamified Pipeline - Visualizing DORA Metrics as RPG-like stats and high-score leaderboards.',
    status: 'coming-soon',
    category: 'Quantified Organization',
  },
  {
    slug: 'seasonal-mind',
    title: 'Seasonal Mind',
    description:
      'The Circadian Dashboard - Correlating personal digital activity with local circadian and seasonal cycles.',
    status: 'coming-soon',
    category: 'Quantified Self',
  },
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
