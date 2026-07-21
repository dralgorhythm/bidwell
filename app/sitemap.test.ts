import { experiments } from './(main)/experiments/config'
import sitemap from './sitemap'

interface SitemapEntry {
  url: string
  priority: number
  lastModified?: string
}

async function entries(): Promise<SitemapEntry[]> {
  return await sitemap()
}

describe('sitemap', () => {
  it('keeps the health-check contract: absolute url and numeric priority on every entry', async () => {
    const routes = await entries()

    expect(routes.length).toBeGreaterThan(0)
    for (const route of routes) {
      expect(route.url).toMatch(/^https:\/\/bidwell\.info(\/|$)/)
      expect(route.url).not.toMatch(/\/$/)
      expect(typeof route.priority).toBe('number')
    }
  })

  it('includes the career-guidance sales page', async () => {
    const urls = (await entries()).map(route => route.url)

    expect(urls).toContain('https://bidwell.info/career-guidance')
  })

  it('includes active experiments and excludes noindexed coming-soon stubs', async () => {
    const urls = (await entries()).map(route => route.url)

    expect(urls).toContain('https://bidwell.info/experiments/claude-agentic-framework')
    for (const experiment of experiments.filter(exp => exp.status !== 'active')) {
      expect(urls).not.toContain(`https://bidwell.info/experiments/${experiment.slug}`)
    }
  })

  it('dates blog entries from the real publish date and fabricates no other lastModified', async () => {
    const routes = await entries()

    const post = routes.find(route => route.url.endsWith('/blog/agent-coordination'))
    expect(post?.lastModified).toBe('2025-11-27')

    for (const route of routes.filter(entry => !entry.url.includes('/blog/'))) {
      expect(route.lastModified).toBeUndefined()
    }
  })
})
