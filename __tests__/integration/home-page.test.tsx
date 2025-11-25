import HomePage from '../../app/page'
import { axeTest, render, screen } from '../utils/test-utils'

describe('Home Page Integration', () => {
  describe('Page Structure', () => {
    it('renders the home page with correct structure', () => {
      render(<HomePage />)

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText(/welcome to bidwell consulting/i)).toBeInTheDocument()
      expect(screen.getByText(/check out my projects and technical solutions/i)).toBeInTheDocument()
    })

    it('has correct main heading', () => {
      render(<HomePage />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Bidwell Consulting')
    })

    it('includes welcome message and description', () => {
      render(<HomePage />)

      expect(screen.getByText(/welcome to bidwell consulting/i)).toBeInTheDocument()
      expect(
        screen.getByText(/as a seasoned software engineer and organizational consultant/i)
      ).toBeInTheDocument()
      expect(screen.getByText(/writer and musician/i)).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    it('has proper page layout structure', () => {
      const { container } = render(<HomePage />)

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('applies correct styling to heading', () => {
      render(<HomePage />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('mb-8', 'text-2xl', 'font-semibold', 'tracking-tighter')
    })

    it('applies correct styling to description', () => {
      render(<HomePage />)

      const description = screen.getByText(/welcome to bidwell consulting/i)
      expect(description).toHaveClass('mb-4')
    })

    it('applies correct styling to portfolio section', () => {
      const { container } = render(<HomePage />)

      const portfolioContainer = container.querySelector('div.my-8')
      expect(portfolioContainer).toBeInTheDocument()
      expect(portfolioContainer).toHaveClass('my-8')
    })
  })

  describe('Component Integration', () => {
    it('includes the portfolio section', () => {
      render(<HomePage />)

      expect(screen.getByText(/check out my projects and technical solutions/i)).toBeInTheDocument()
    })

    it('renders components in correct order', () => {
      const { container } = render(<HomePage />)

      const elements = container.querySelectorAll('section > *')
      expect(elements[0]).toContainHTML('Bidwell Consulting') // Heading
      expect(elements[1]).toContainHTML('Welcome to Bidwell Consulting') // Description
      expect(elements[2]).toContainHTML('Explore My Work') // Portfolio section
    })
  })

  describe('Content Quality', () => {
    it('provides comprehensive introduction', () => {
      render(<HomePage />)

      // Should mention key aspects of the business
      expect(screen.getAllByText(/software engineer/i)[0]).toBeInTheDocument()
      expect(screen.getByText(/organizational consultant/i)).toBeInTheDocument()
      expect(screen.getByText(/writer/i)).toBeInTheDocument()
      expect(screen.getByText(/musician/i)).toBeInTheDocument()
    })

    it('has proper business context', () => {
      render(<HomePage />)

      expect(screen.getByRole('heading', { name: /bidwell consulting/i })).toBeInTheDocument()
      expect(
        screen.getByText(/portfolio site showcases innovative technical solutions/i)
      ).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('is accessible', async () => {
      const { container } = render(<HomePage />)
      await axeTest(container)
    })

    it('has proper heading hierarchy', () => {
      render(<HomePage />)

      // Should have exactly one h1
      const h1Elements = screen.getAllByRole('heading', { level: 1 })
      expect(h1Elements).toHaveLength(1)
    })

    it('has logical content flow', () => {
      render(<HomePage />)

      const heading = screen.getByRole('heading', { level: 1 })
      const description = screen.getByText(/welcome to bidwell consulting/i)

      // Heading should come before description
      expect(heading.compareDocumentPosition(description)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    })
  })

  describe('Performance', () => {
    it('renders quickly', () => {
      const startTime = performance.now()
      render(<HomePage />)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(100)
    })
  })

  describe('SEO and Content Strategy', () => {
    it('includes relevant keywords for business', () => {
      render(<HomePage />)

      // Business-relevant terms
      expect(screen.getByRole('heading', { name: /bidwell consulting/i })).toBeInTheDocument()
      expect(screen.getAllByText(/software engineer/i)[0]).toBeInTheDocument()
      expect(screen.getByText(/consultant/i)).toBeInTheDocument()
    })

    it('provides clear value proposition', () => {
      render(<HomePage />)

      const valueText = screen.getByText(/welcome to bidwell consulting/i)
      expect(valueText).toBeInTheDocument()
    })

    it('has content suitable for search indexing', () => {
      const { container } = render(<HomePage />)

      // Should have structured content
      expect(container.querySelector('h1')).toBeInTheDocument()
      expect(container.querySelector('p')).toBeInTheDocument()

      // Should have meaningful text content
      expect(container.textContent).toContain('Bidwell Consulting')
      expect(container.textContent).toContain('software engineer')
    })
  })

  describe('User Experience', () => {
    it('provides clear navigation context', () => {
      render(<HomePage />)

      // Users should understand this is the main page
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/bidwell consulting/i)
    })

    it('offers next steps via portfolio content', () => {
      render(<HomePage />)

      // Portfolio content provides direction for users
      expect(screen.getByText(/check out my projects and technical solutions/i)).toBeInTheDocument()
    })
  })
})
