'use client'

import dynamic from 'next/dynamic'

// Dynamically import performance components with no SSR to prevent "self is not defined" errors
const PerformanceMonitor = dynamic(() => import('./performance-monitor'), {
  ssr: false,
})
const PerformanceDashboard = dynamic(() => import('./performance-dashboard'), {
  ssr: false,
})

interface ClientPerformanceWrapperProps {
  enableMonitoring?: boolean
  showDashboard?: boolean
  debug?: boolean
}

export default function ClientPerformanceWrapper({
  enableMonitoring = true,
  showDashboard = false,
  debug = false,
}: ClientPerformanceWrapperProps) {
  return (
    <>
      {enableMonitoring && <PerformanceMonitor enableReporting={true} debug={debug} />}
      {showDashboard && <PerformanceDashboard showDetails={debug} />}
    </>
  )
}
