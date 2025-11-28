import BlogPage from '../../../app/blog/page'
import { render, screen } from '../../utils/test-utils'

describe('Blog Page', () => {
  it('renders the blog page heading', () => {
    render(<BlogPage />)
    expect(screen.getByRole('heading', { level: 1, name: /blog/i })).toBeInTheDocument()
  })

  it('displays the list of blog posts', () => {
    render(<BlogPage />)
    expect(screen.getByText(/Agent Coordination Structure/i)).toBeInTheDocument()
  })

  it('links to the blog posts', () => {
    render(<BlogPage />)
    const link = screen.getByRole('link', { name: /Agent Coordination Structure/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/blog/agent-coordination')
  })
})
