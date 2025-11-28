import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ComparisonPage from '../../../app/experiments/comparison/page'

// Mock the comparison form component
vi.mock('../../../app/experiments/comparison/comparison-form', () => ({
  default: function MockComparisonForm() {
    return <div data-testid='comparison-form'>Comparison Form</div>
  },
}))

describe('Comparison Page', () => {
  it('renders the page with correct heading and description', () => {
    render(<ComparisonPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /number comparison/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/use our free online number comparison tool/i)).toBeInTheDocument()
  })

  it('includes the comparison form component', () => {
    render(<ComparisonPage />)

    expect(screen.getByTestId('comparison-form')).toBeInTheDocument()
  })
})
