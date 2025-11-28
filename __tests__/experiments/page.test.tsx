import { render, screen } from '@testing-library/react'
import ExperimentsPage from '../../app/experiments/page'

describe('Experiments Page', () => {
  it('renders the page with correct heading and description', () => {
    render(<ExperimentsPage />)

    expect(screen.getByRole('heading', { level: 1, name: /experiments/i })).toBeInTheDocument()
    expect(
      screen.getByText(/a collection of experimental tools and utilities/i)
    ).toBeInTheDocument()
  })

  it('displays the Number Comparison experiment card', () => {
    render(<ExperimentsPage />)

    expect(
      screen.getByRole('heading', { level: 3, name: /number comparison/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/instantly compare two numbers to see which is larger/i)
    ).toBeInTheDocument()
  })

  it('has a clickable link to the comparison tool', () => {
    render(<ExperimentsPage />)

    const link = screen.getByRole('link', { name: /number comparison/i })
    expect(link).toHaveAttribute('href', '/experiments/comparison')
  })
})
