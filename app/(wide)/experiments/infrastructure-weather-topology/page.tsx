import { experimentMetadata } from '../../../(main)/experiments/config'

export const metadata = experimentMetadata('infrastructure-weather-topology')

export default function InfrastructureWeatherTopologyPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Infrastructure Weather Topology</h1>
      <p className='text-lg text-gray-600 mb-6'>The Network Climate</p>
      <div className='prose max-w-none'>
        <p>
          This concept visualizes the global internet topology as a 3D globe where network
          performance metrics (latency, packet loss) are rendered as atmospheric weather conditions.
          A DDoS attack looks like a storm and a cable cut looks like a void.
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}
