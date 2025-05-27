import sitemap, { baseUrl } from '../../app/sitemap'

describe('sitemap.ts', () => {
  beforeEach(() => {
    // Mock Date to ensure consistent results
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-01-01'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('exports the correct base URL', () => {
    expect(baseUrl).toBe('https://bidwell.info')
  })

  it('has force-static dynamic configuration', () => {
    const { dynamic } = require('../../app/sitemap')
    expect(dynamic).toBe('force-static')
  })

  it('generates sitemap with correct routes', async () => {
    const routes = await sitemap()

    expect(routes).toHaveLength(2)
    expect(routes).toEqual([
      {
        url: 'https://bidwell.info',
        lastModified: '2024-01-01',
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: 'https://bidwell.info/comparison',
        lastModified: '2024-01-01',
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ])
  })

  it('includes home page route', async () => {
    const routes = await sitemap()
    const homeRoute = routes.find(route => route.url === 'https://bidwell.info')

    expect(homeRoute).toBeDefined()
    expect(homeRoute?.lastModified).toBe('2024-01-01')
  })

  it('includes comparison page route', async () => {
    const routes = await sitemap()
    const comparisonRoute = routes.find(route => route.url === 'https://bidwell.info/comparison')

    expect(comparisonRoute).toBeDefined()
    expect(comparisonRoute?.lastModified).toBe('2024-01-01')
  })

  it('uses current date for lastModified', async () => {
    jest.setSystemTime(new Date('2024-12-25'))
    const routes = await sitemap()

    routes.forEach(route => {
      expect(route.lastModified).toBe('2024-12-25')
    })
  })
})
