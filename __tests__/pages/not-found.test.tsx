import { render, screen } from '../utils/test-utils'
import { axe } from 'jest-axe'
import NotFound from '../../app/not-found'

describe('NotFound Page', () => {
  it('renders the 404 heading', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404 - Page Not Found')
  })

  it('renders the description message', () => {
    render(<NotFound />)
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<NotFound />)
    const section = screen.getByRole('heading').closest('section')
    expect(section).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<NotFound />)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('mb-8', 'text-2xl', 'font-semibold', 'tracking-tighter')
  })

  it('has accessible structure', async () => {
    const { container } = render(<NotFound />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
