import { render, screen, axeTest } from '../utils/test-utils'
import BlogPage from '../../app/blog/page'

// Mock the components
jest.mock('../../app/components/posts', () => ({
  BlogPosts: () => <div data-testid="blog-posts">Blog Posts Component</div>,
}))

describe('Blog Page Integration', () => {
  describe('Page Structure', () => {
    it('renders the blog page with correct structure', () => {
      render(<BlogPage />)

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByTestId('blog-posts')).toBeInTheDocument()
    })

    it('has proper heading hierarchy', () => {
      render(<BlogPage />)

      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('My Blog')
    })

    it('includes blog structure', () => {
      render(<BlogPage />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('My Blog')
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    it('has proper page layout structure', () => {
      const { container } = render(<BlogPage />)

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('applies correct styling classes', () => {
      render(<BlogPage />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('font-semibold', 'text-2xl', 'mb-8', 'tracking-tighter')
    })
  })

  describe('Component Integration', () => {
    it('includes the BlogPosts component', () => {
      render(<BlogPage />)

      expect(screen.getByTestId('blog-posts')).toBeInTheDocument()
    })

    it('renders components in correct order', () => {
      const { container } = render(<BlogPage />)

      const elements = container.querySelectorAll('section > *')
      expect(elements[0]).toContainHTML('My Blog') // Heading
      expect(elements[1]).toContainHTML('Blog Posts Component') // BlogPosts component
    })
  })

  describe('Accessibility', () => {
    it('is accessible', async () => {
      const { container } = render(<BlogPage />)
      await axeTest(container)
    })

    it('has proper document structure', () => {
      const { container } = render(<BlogPage />)

      // Should have one h1
      const headings = screen.getAllByRole('heading', { level: 1 })
      expect(headings).toHaveLength(1)

      // Should be contained in a section
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('provides meaningful content hierarchy', () => {
      render(<BlogPage />)

      const heading = screen.getByRole('heading', { level: 1 })
      const blogPosts = screen.getByTestId('blog-posts')

      // Heading should come before blog posts in DOM order
      expect(heading.compareDocumentPosition(blogPosts)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    })
  })

  describe('Performance', () => {
    it('renders quickly', () => {
      const startTime = performance.now()
      render(<BlogPage />)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(100)
    })
  })

  describe('SEO and Metadata', () => {
    it('provides content for search engines', () => {
      render(<BlogPage />)

      // Page should have meaningful heading
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Blog')

      // Page should have blog posts component
      expect(screen.getByTestId('blog-posts')).toBeInTheDocument()
    })

    it('has proper semantic structure for crawlers', () => {
      const { container } = render(<BlogPage />)

      const section = container.querySelector('section')
      const heading = container.querySelector('h1')

      expect(section).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
    })
  })
})
