/**
 * Comprehensive tests for all experiment placeholder pages.
 * Uses the shared test harness for consistent validation.
 */

import { createExperimentPageTests, runExperimentSmokeTests } from 'lib/experiment-test-harness'

// Import all experiment pages
import DataMusicGeneratorPage from './data-music-generator/page'
import DeveloperDiasporaPage from './developer-diaspora/page'
import DevOpsROIMonitorPage from './devops-roi-monitor/page'
import EconomicSentimentPage from './economic-sentiment/page'
import GeologicalRhythmsPage from './geological-rhythms/page'
import GlobalAnxietyMapPage from './global-anxiety-map/page'
import HarmonicDeckPage from './harmonic-deck/page'
import InfrastructureWeatherTopologyPage from './infrastructure-weather-topology/page'
import LiveOrderBookPage from './live-order-book/page'
import PhysicsOfTrafficPage from './physics-of-traffic/page'
import SeasonalMindPage from './seasonal-mind/page'
import SonicWeatherPage from './sonic-weather/page'

// ============================================
// SMOKE TESTS: Ensure all pages render
// ============================================

runExperimentSmokeTests([
  { name: 'Sonic Weather', Component: SonicWeatherPage },
  { name: 'Geological Rhythms', Component: GeologicalRhythmsPage },
  { name: 'Data Music Generator', Component: DataMusicGeneratorPage },
  { name: 'Harmonic Deck', Component: HarmonicDeckPage },
  { name: 'Physics of Traffic', Component: PhysicsOfTrafficPage },
  {
    name: 'Infrastructure Weather Topology',
    Component: InfrastructureWeatherTopologyPage,
  },
  { name: 'Developer Diaspora', Component: DeveloperDiasporaPage },
  { name: 'Economic Sentiment', Component: EconomicSentimentPage },
  { name: 'Live Order Book', Component: LiveOrderBookPage },
  { name: 'Global Anxiety Map', Component: GlobalAnxietyMapPage },
  { name: 'DevOps ROI Monitor', Component: DevOpsROIMonitorPage },
  { name: 'Seasonal Mind', Component: SeasonalMindPage },
])

// ============================================
// DETAILED TESTS: Full test suite per page
// ============================================

// Part I: Auditory Interface
createExperimentPageTests({
  Component: SonicWeatherPage,
  title: 'Sonic Weather',
  subtitle: 'The Atmospheric Synthesizer',
  descriptionFragment: 'thermodynamic variables',
})

createExperimentPageTests({
  Component: GeologicalRhythmsPage,
  title: 'Geological Rhythms',
  subtitle: 'The Seismic Percussionist',
  descriptionFragment: 'tectonic activity',
})

createExperimentPageTests({
  Component: DataMusicGeneratorPage,
  title: 'Data Music Generator',
  subtitle: 'The Algorithmic Composer',
  descriptionFragment: 'endless ambient',
})

createExperimentPageTests({
  Component: HarmonicDeckPage,
  title: 'Harmonic Deck',
  subtitle: 'The Gamified Composer',
  descriptionFragment: 'deck-building card game',
})

// Part II: Living Systems & Urban Metabolism
createExperimentPageTests({
  Component: PhysicsOfTrafficPage,
  title: 'Physics of Traffic',
  subtitle: 'The Fluid Highway',
  descriptionFragment: 'fluid dynamics',
})

createExperimentPageTests({
  Component: InfrastructureWeatherTopologyPage,
  title: 'Infrastructure Weather Topology',
  subtitle: 'The Network Climate',
  descriptionFragment: 'global internet topology',
})

createExperimentPageTests({
  Component: DeveloperDiasporaPage,
  title: 'Developer Diaspora',
  subtitle: 'The Migration Map',
  descriptionFragment: 'movement of human talent',
})

// Part III: Economic & Social Pulse
createExperimentPageTests({
  Component: EconomicSentimentPage,
  title: 'Economic Sentiment',
  subtitle: 'The Meme Market',
  descriptionFragment: 'financial ideas as viruses',
})

createExperimentPageTests({
  Component: LiveOrderBookPage,
  title: 'Live Order Book',
  subtitle: 'The Market Depth Crumble',
  descriptionFragment: 'order book as a physical structure',
})

createExperimentPageTests({
  Component: GlobalAnxietyMapPage,
  title: 'Global Anxiety Map',
  subtitle: 'The Sentiment Geoscope',
  descriptionFragment: 'Anxiety',
})

// Part IV: Quantified Organization & Self
createExperimentPageTests({
  Component: DevOpsROIMonitorPage,
  title: 'DevOps ROI Monitor',
  subtitle: 'The Gamified Pipeline',
  descriptionFragment: 'DORA Metrics',
})

createExperimentPageTests({
  Component: SeasonalMindPage,
  title: 'Seasonal Mind',
  subtitle: 'The Circadian Dashboard',
  descriptionFragment: 'circadian and seasonal cycles',
})
