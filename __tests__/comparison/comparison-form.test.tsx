import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ComparisonForm from '../../app/comparison/comparison-form'

describe('ComparisonForm', () => {
  beforeEach(() => {
    render(<ComparisonForm />)
  })

  it('renders the form with all necessary elements', () => {
    expect(screen.getByLabelText(/first number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/second number/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /compare/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('calculates and displays correct results for negative numbers', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    await user.type(firstInput, '-5')
    await user.type(secondInput, '-10')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      expect(screen.getByText(/-5 is greater than -10/i)).toBeInTheDocument()
      expect(screen.getByText(/absolute difference: 5/i)).toBeInTheDocument()
    })
  })

  it('calculates and displays correct results for decimal numbers', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    await user.type(firstInput, '3.14')
    await user.type(secondInput, '2.71')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      expect(screen.getByText(/3.14 is greater than 2.71/i)).toBeInTheDocument()
      expect(screen.getByText(/absolute difference: 0.43/i)).toBeInTheDocument()
    })
  })

  it('shows appropriate visual indicators for comparison results', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    await user.type(firstInput, '10')
    await user.type(secondInput, '5')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      const resultElement = screen.getByText(/10 is greater than 5/i)
      expect(resultElement).toHaveClass('text-green-600')
    })
  })

  it('handles very large numbers', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    await user.type(firstInput, '999999999')
    await user.type(secondInput, '1000000000')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      expect(screen.getByText(/999999999 is less than 1000000000/i)).toBeInTheDocument()
      expect(screen.getByText(/absolute difference: 1/i)).toBeInTheDocument()
    })
  })

  it('maintains accessibility with proper ARIA labels', () => {
    expect(screen.getByLabelText(/first number/i)).toHaveAttribute('type', 'number')
    expect(screen.getByLabelText(/second number/i)).toHaveAttribute('type', 'number')
    expect(screen.getByRole('button', { name: /compare/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('handles equal numbers correctly', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    await user.type(firstInput, '5')
    await user.type(secondInput, '5')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      expect(screen.getByText(/5 and 5 are equal/i)).toBeInTheDocument()
      const resultElement = screen.getByText(/5 and 5 are equal/i)
      expect(resultElement).toHaveClass('text-blue-600')
    })
  })

  it('shows less than result with correct styling', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    await user.type(firstInput, '3')
    await user.type(secondInput, '7')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      expect(screen.getByText(/3 is less than 7/i)).toBeInTheDocument()
      const resultElement = screen.getByText(/3 is less than 7/i)
      expect(resultElement).toHaveClass('text-red-600')
    })
  })

  it('resets form when reset button is clicked', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    // Fill form and submit
    await user.type(firstInput, '10')
    await user.type(secondInput, '5')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      expect(screen.getByText(/10 is greater than 5/i)).toBeInTheDocument()
    })

    // Reset form
    await user.click(screen.getByRole('button', { name: /reset/i }))

    // Check that form is cleared
    expect(firstInput).toHaveValue('')
    expect(secondInput).toHaveValue('')
    expect(screen.queryByText(/10 is greater than 5/i)).not.toBeInTheDocument()
  })

  it('shows percentage difference for non-equal results', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    await user.type(firstInput, '10')
    await user.type(secondInput, '5')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      expect(screen.getByText(/percentage difference: 100.00%/i)).toBeInTheDocument()
    })
  })

  it('does not show percentage difference for equal results', async () => {
    const user = userEvent.setup()
    const firstInput = screen.getByLabelText(/first number/i)
    const secondInput = screen.getByLabelText(/second number/i)

    await user.type(firstInput, '5')
    await user.type(secondInput, '5')
    await user.click(screen.getByRole('button', { name: /compare/i }))

    await waitFor(() => {
      expect(screen.getByText(/5 and 5 are equal/i)).toBeInTheDocument()
      expect(screen.queryByText(/percentage difference/i)).not.toBeInTheDocument()
    })
  })
})
