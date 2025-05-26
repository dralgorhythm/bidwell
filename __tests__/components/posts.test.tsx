import { render, screen, axeTest, performanceTest } from '../utils/test-utils'
import { BlogPosts } from '../../app/components/posts'

// Mock the blog utils
jest.mock('../../app/blog/utils', () => ({
  getBlogPosts: jest.fn(() => [
    {
      slug: 'test-post-1',
      metadata: {
        title: 'Test Post 1',
        publishedAt: '2024-01-01',
        summary: 'First test post'
      }
    },
    {
      slug: 'test-post-2', 
      metadata: {
        title: 'Test Post 2',
        publishedAt: '2024-01-02',
        summary: 'Second test post'
      }
    }
  ]),
  formatDate: jest.fn((date) => 'January 1, 2024')
}))

describe('BlogPosts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('With Blog Posts', () => {
    it('renders blog posts when available', () => {
      render(<BlogPosts />)
      
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      expect(screen.getByText('Test Post 2')).toBeInTheDocument()
    })

    it('renders correct number of posts', () => {
      render(<BlogPosts />)
      
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
    })

    it('has proper link structure for posts', () => {
      render(<BlogPosts />)
      
      const firstLink = screen.getByText('Test Post 1').closest('a')
      expect(firstLink).toHaveAttribute('href', '/blog/test-post-1')
      expect(firstLink).toHaveClass('flex', 'flex-col', 'space-y-1', 'mb-4')
    })

    it('displays post metadata correctly', () => {
      render(<BlogPosts />)
      
      // Check that dates are displayed
      const dates = screen.getAllByText('January 1, 2024')
      expect(dates).toHaveLength(2)
    })

    it('has proper responsive layout', () => {
      render(<BlogPosts />)
      
      const postContainers = screen.getAllByText('Test Post 1').map(el => 
        el.closest('.w-full')
      ).filter(Boolean)
      
      expect(postContainers.length).toBeGreaterThan(0)
    })

    it('is accessible when showing posts', async () => {
      const { container } = render(<BlogPosts />)
      await axeTest(container)
    })
  })

  describe('Empty State', () => {
    beforeEach(() => {
      // Mock empty posts for empty state tests
      const { getBlogPosts } = require('../../app/blog/utils')
      getBlogPosts.mockReturnValue([])
    })

    it('renders empty container when no posts are available', () => {
      const { container } = render(<BlogPosts />)
      
      // Should render empty div when no posts
      const blogDiv = container.firstChild
      expect(blogDiv).toBeInTheDocument()
      expect(blogDiv).toBeEmptyDOMElement()
    })

    it('is accessible when showing empty state', async () => {
      const { container } = render(<BlogPosts />)
      await axeTest(container)
    })
  })

  describe('Performance', () => {
    it('renders quickly', () => {
      const renderTime = performanceTest(() => {
        render(<BlogPosts />)
      })
      expect(renderTime).toBeLessThan(100)
    })
  })

  describe('Error Handling', () => {
    it('handles getBlogPosts throwing an error', () => {
      const { getBlogPosts } = require('../../app/blog/utils')
      getBlogPosts.mockImplementation(() => {
        throw new Error('Failed to fetch posts')
      })

      // Component will throw since there's no error boundary
      expect(() => {
        render(<BlogPosts />)
      }).toThrow('Failed to fetch posts')
    })
  })
})
