import { experimentMetadata } from '../../../(main)/experiments/config'

export const metadata = experimentMetadata('global-anxiety-map')

export default function GlobalAnxietyMapPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Global Anxiety Map</h1>
      <p className='text-lg text-gray-600 mb-6'>The Sentiment Geoscope</p>
      <div className='prose max-w-none'>
        <p>
          The Global Anxiety Map is a geospatial visualization of negative sentiment—specifically
          "Anxiety" and "Uncertainty"—extracted from global news media. It acts as a "Geiger
          counter" for geopolitical stability, highlighting regions where the language of fear is
          spiking.
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}
