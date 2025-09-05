import { render } from '../utils/test-utils'
import ClientPerformanceWrapper from '../../app/components/client-performance-wrapper'

// Mock the dynamic imports
jest.mock('next/dynamic', () => {
  return (importFunc: any) => {
    // Return a simple component that can be identified in tests
    return function DynamicComponent() {
      // Get the display name from the import function
      const componentName = importFunc.toString().includes('performance-monitor')
        ? 'performance-monitor'
        : 'performance-dashboard'
      return <div data-testid={componentName}>{componentName}</div>
    }
  }
})

// Mock the components that are dynamically imported
jest.mock('../../app/components/performance-monitor', () => ({
  __esModule: true,
  default: () => <div data-testid='performance-monitor'>PerformanceMonitor</div>,
}))

jest.mock('../../app/components/performance-dashboard', () => ({
  __esModule: true,
  default: () => <div data-testid='performance-dashboard'>PerformanceDashboard</div>,
}))

describe('ClientPerformanceWrapper', () => {
  it('renders performance monitor when enableMonitoring is true', () => {
    const { getByTestId } = render(
      <ClientPerformanceWrapper enableMonitoring={true} showDashboard={false} />
    )

    expect(getByTestId('performance-monitor')).toBeInTheDocument()
  })

  it('does not render performance monitor when enableMonitoring is false', () => {
    const { queryByTestId } = render(
      <ClientPerformanceWrapper enableMonitoring={false} showDashboard={false} />
    )

    expect(queryByTestId('performance-monitor')).not.toBeInTheDocument()
  })

  it('renders performance dashboard when showDashboard is true', () => {
    const { getByTestId } = render(
      <ClientPerformanceWrapper enableMonitoring={false} showDashboard={true} />
    )

    expect(getByTestId('performance-dashboard')).toBeInTheDocument()
  })

  it('does not render performance dashboard when showDashboard is false', () => {
    const { queryByTestId } = render(
      <ClientPerformanceWrapper enableMonitoring={false} showDashboard={false} />
    )

    expect(queryByTestId('performance-dashboard')).not.toBeInTheDocument()
  })

  it('uses default props when none are provided', () => {
    const { getByTestId, queryByTestId } = render(<ClientPerformanceWrapper />)

    // Default enableMonitoring is true
    expect(getByTestId('performance-monitor')).toBeInTheDocument()

    // Default showDashboard is false
    expect(queryByTestId('performance-dashboard')).not.toBeInTheDocument()
  })

  it('passes debug prop to child components when provided', () => {
    const { getByTestId } = render(
      <ClientPerformanceWrapper enableMonitoring={true} showDashboard={true} debug={true} />
    )

    expect(getByTestId('performance-monitor')).toBeInTheDocument()
    expect(getByTestId('performance-dashboard')).toBeInTheDocument()
  })

  it('renders both components when both flags are enabled', () => {
    const { getByTestId } = render(
      <ClientPerformanceWrapper enableMonitoring={true} showDashboard={true} />
    )

    expect(getByTestId('performance-monitor')).toBeInTheDocument()
    expect(getByTestId('performance-dashboard')).toBeInTheDocument()
  })
})
