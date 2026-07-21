import robots from './robots'

describe('robots', () => {
  const result = robots()

  it('allows all crawlers with no per-agent blocks (AI crawlers included)', () => {
    expect(result.rules).toEqual([{ userAgent: '*', allow: '/' }])
    const serialized = JSON.stringify(result.rules)
    for (const agent of ['GPTBot', 'ChatGPT-User', 'CCBot', 'Claude', 'Google-Extended']) {
      expect(serialized).not.toContain(agent)
    }
  })

  it('does not hide asset paths from rendering crawlers', () => {
    expect(JSON.stringify(result.rules)).not.toContain('/_next/')
  })

  it('references the sitemap on the canonical origin', () => {
    expect(result.sitemap).toBe('https://bidwell.info/sitemap.xml')
  })
})
