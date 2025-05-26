import { render, screen } from '@testing-library/react'
import ComparisonPage from '../../app/comparison/page'

// Mock the comparison form component
jest.mock('../../app/comparison/comparison-form', () => {
  return function MockComparisonForm() {
    return <div data-testid='comparison-form'>Comparison Form</div>
  }
})

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

  it('has proper semantic structure', () => {
    render(<ComparisonPage />)

    // Check for heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Number Comparison')
  })
})
