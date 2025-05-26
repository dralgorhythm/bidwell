import sitemap from '../../app/sitemap'
import { getBlogPosts } from '../../app/blog/utils'

// Mock the blog utils
jest.mock('../../app/blog/utils', () => ({
  getBlogPosts: jest.fn()
}))

const mockGetBlogPosts = getBlogPosts as jest.MockedFunction<typeof getBlogPosts>

describe('Sitemap', () => {
  beforeEach(() => {
    mockGetBlogPosts.mockReturnValue([
      {
        slug: 'test-post',
        metadata: {
          publishedAt: '2025-01-01',
          title: 'Test Post',
          summary: 'Test summary'
        },
        content: 'Test content'
      }
    ])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('includes all main routes', async () => {
    const sitemapData = await sitemap()
    
    const urls = sitemapData.map(entry => entry.url)
    expect(urls).toContain('https://bidwell.info')
    expect(urls).toContain('https://bidwell.info/blog')
    expect(urls).toContain('https://bidwell.info/comparison')
  })

  it('includes comparison route in sitemap', async () => {
    const sitemapData = await sitemap()
    
    const comparisonEntry = sitemapData.find(entry => entry.url === 'https://bidwell.info/comparison')
    expect(comparisonEntry).toBeDefined()
    expect(comparisonEntry?.lastModified).toBeDefined()
  })

  it('includes blog posts in sitemap', async () => {
    const sitemapData = await sitemap()
    
    const blogPostEntry = sitemapData.find(entry => entry.url === 'https://bidwell.info/blog/test-post')
    expect(blogPostEntry).toBeDefined()
    expect(blogPostEntry?.lastModified).toBe('2025-01-01')
  })

  it('has correct URL structure', async () => {
    const sitemapData = await sitemap()
    
    sitemapData.forEach(entry => {
      expect(entry.url).toMatch(/^https:\/\/bidwell\.info/)
      expect(entry.lastModified).toBeDefined()
    })
  })
})
