import { experimentMetadata } from '../../../(main)/experiments/config'

export const metadata = experimentMetadata('physics-of-traffic')

export default function PhysicsOfTrafficPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Physics of Traffic</h1>
      <p className='text-lg text-gray-600 mb-6'>The Fluid Highway</p>
      <div className='prose max-w-none'>
        <p>
          Physics of Traffic visualizes a city's transit network using the laws of fluid dynamics.
          Instead of static red lines indicating congestion, the map renders traffic as a fluid
          medium, making "phantom traffic jams" visible as pressure waves.
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}
