import { experimentMetadata } from '../../../(main)/experiments/config'

export const metadata = experimentMetadata('geological-rhythms')

export default function GeologicalRhythmsPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Geological Rhythms</h1>
      <p className='text-lg text-gray-600 mb-6'>The Seismic Percussionist</p>
      <div className='prose max-w-none'>
        <p>
          Geological Rhythms transforms the Earth's tectonic activity into a polyrhythmic percussion
          engine. Listen to the "heartbeat" of the planet as seismic data becomes a visceral
          experience of energy release.
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}
