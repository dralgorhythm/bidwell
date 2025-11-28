import { axe } from 'vitest-axe'
import NotFound from '../../app/not-found'
import { render, screen } from '../utils/test-utils'

describe('NotFound Page', () => {
  it('renders the 404 heading', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404 - Page Not Found')
  })

  it('renders the description message', () => {
    render(<NotFound />)
    expect(screen.getByText(/doesn't exist or has been moved/i)).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<NotFound />)
    const section = screen.getByRole('heading').closest('section')
    expect(section).toBeInTheDocument()
  })

  it('has accessible structure', async () => {
    const { container } = render(<NotFound />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
