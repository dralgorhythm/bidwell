import { experimentMetadata } from '../../../(main)/experiments/config'

export const metadata = experimentMetadata('sonic-weather')

export default function SonicWeatherPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Sonic Weather</h1>
      <p className='text-lg text-gray-600 mb-6'>The Atmospheric Synthesizer</p>
      <div className='prose max-w-none'>
        <p>
          Sonic Weather challenges the visual hegemony of meteorological forecasting by translating
          real-time thermodynamic variables into a generative, ambient soundscape.
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}
