import robots from '../../app/robots'

// Mock the sitemap module since robots.ts imports from it
jest.mock('app/sitemap', () => ({
  baseUrl: 'https://bidwell.info',
}))

describe('robots.txt', () => {
  it('returns correct robots.txt configuration', () => {
    const robotsConfig = robots()

    expect(robotsConfig).toHaveProperty('rules')
    expect(robotsConfig).toHaveProperty('sitemap')
  })

  it('allows all user agents to access the site', () => {
    const robotsConfig = robots()
    const publicRule = robotsConfig.rules.find(rule => rule.userAgent === '*')

    expect(publicRule).toBeDefined()
    expect(publicRule?.allow).toBe('/')
  })

  it('disallows access to sensitive directories', () => {
    const robotsConfig = robots()
    const publicRule = robotsConfig.rules.find(rule => rule.userAgent === '*')

    expect(publicRule?.disallow).toContain('/api/')
    expect(publicRule?.disallow).toContain('/admin/')
    expect(publicRule?.disallow).toContain('/_next/')
    expect(publicRule?.disallow).toContain('/private/')
    expect(publicRule?.disallow).toContain('/.env*')
    expect(publicRule?.disallow).toContain('/package*.json')
    expect(publicRule?.disallow).toContain('/node_modules/')
  })

  it('blocks AI crawlers and bots', () => {
    const robotsConfig = robots()
    const botRule = robotsConfig.rules.find(
      rule => Array.isArray(rule.userAgent) && rule.userAgent.includes('ChatGPT-User')
    )

    expect(botRule).toBeDefined()
    expect(botRule?.disallow).toBe('/')
    expect(botRule?.userAgent).toContain('CCBot')
    expect(botRule?.userAgent).toContain('GPTBot')
    expect(botRule?.userAgent).toContain('Google-Extended')
    expect(botRule?.userAgent).toContain('anthropic-ai')
    expect(botRule?.userAgent).toContain('Claude-Web')
  })

  it('includes sitemap reference', () => {
    const robotsConfig = robots()
    expect(robotsConfig.sitemap).toBe('https://bidwell.info/sitemap.xml')
  })

  it('has force-static dynamic configuration', () => {
    const { dynamic } = require('../../app/robots')
    expect(dynamic).toBe('force-static')
  })
})
