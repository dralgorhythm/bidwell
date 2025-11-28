import HomePage from '../../app/page'
import { axeTest, render, screen } from '../utils/test-utils'

describe('Home Page Integration', () => {
  it('renders the main value proposition', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /bidwell consulting/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/welcome to bidwell consulting/i)).toBeInTheDocument()
    expect(screen.getByText(/experiments and thoughts on problem solving/i)).toBeInTheDocument()
  })

  it('displays key business services', () => {
    render(<HomePage />)

    expect(screen.getByText(/Software engineering/i)).toBeInTheDocument()
    expect(screen.getByText(/Organizational consulting/i)).toBeInTheDocument()
    expect(screen.getByText(/Full-stack problem solving/i)).toBeInTheDocument()
    expect(screen.getByText(/Career coaching/i)).toBeInTheDocument()
  })

  it('includes the expertise section', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: /expertise & services/i })).toBeInTheDocument()
  })

  it('is accessible', async () => {
    const { container } = render(<HomePage />)
    await axeTest(container)
  })

  it('has a valid heading hierarchy', () => {
    render(<HomePage />)
    // Should have exactly one h1
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)
  })
})
