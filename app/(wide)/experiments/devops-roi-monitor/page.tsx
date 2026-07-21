import { experimentMetadata } from '../../../(main)/experiments/config'

export const metadata = experimentMetadata('devops-roi-monitor')

export default function DevOpsROIMonitorPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>DevOps ROI Monitor</h1>
      <p className='text-lg text-gray-600 mb-6'>The Gamified Pipeline</p>
      <div className='prose max-w-none'>
        <p>
          This concept gamifies the software delivery lifecycle by visualizing DORA Metrics
          (Deployment Frequency, Lead Time, Failure Rate, MTTR) as RPG-like stats or a high-score
          leaderboard, connecting daily commits to business value through gamification.
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}
