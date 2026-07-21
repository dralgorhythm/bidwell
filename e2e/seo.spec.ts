import { expect, test } from '@playwright/test'

/**
 * SEO invariants asserted against the real static export (npm run preview).
 * These guard the rendered HTML — the unit suite guards the source modules.
 */
test.describe('SEO invariants', () => {
  test('pages declare exactly one self-canonical', async ({ page }) => {
    await page.goto('/')
    const homeCanonical = page.locator('link[rel="canonical"]')
    await expect(homeCanonical).toHaveCount(1)
    await expect(homeCanonical).toHaveAttribute('href', 'https://bidwell.info')

    await page.goto('/blog/agent-coordination')
    const postCanonical = page.locator('link[rel="canonical"]')
    await expect(postCanonical).toHaveCount(1)
    await expect(postCanonical).toHaveAttribute(
      'href',
      'https://bidwell.info/blog/agent-coordination'
    )
  })

  test('coming-soon experiment stubs are noindexed', async ({ page }) => {
    await page.goto('/experiments/sonic-weather')
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(1)
  })

  test('og:image resolves to a real PNG and the twitter card is set', async ({
    page,
    request,
    baseURL,
  }) => {
    await page.goto('/')
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    )

    const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute('content')
    expect(ogImage).toBeTruthy()

    // The tag carries the canonical origin; fetch it from the local preview server.
    const local = (ogImage as string).replace('https://bidwell.info', baseURL as string)
    const response = await request.get(local)
    expect(response.status()).toBe(200)
    const body = await response.body()
    expect(body.subarray(0, 4)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47]))
  })

  test('robots.txt allows AI crawlers and asset paths', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text()

    for (const agent of ['GPTBot', 'ChatGPT-User', 'CCBot', 'Claude', 'Google-Extended']) {
      expect(robots).not.toContain(agent)
    }
    expect(robots).not.toContain('/_next/')
    expect(robots).toContain('Sitemap: https://bidwell.info/sitemap.xml')
  })

  test('sitemap lists indexable pages only', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()

    expect(xml).toContain('https://bidwell.info/services/career-coaching')
    expect(xml).not.toContain('https://bidwell.info/career-guidance')
    expect(xml).toContain('https://bidwell.info/experiments/claude-agentic-framework')
    expect(xml).not.toContain('sonic-weather')
  })

  test('rss and llms.txt discovery surfaces resolve', async ({ request }) => {
    const rss = await request.get('/rss.xml')
    expect(rss.status()).toBe(200)
    const xml = await rss.text()
    expect(xml).toContain('<rss version="2.0">')
    expect(xml).toContain('https://bidwell.info/blog/agent-coordination')

    const llms = await request.get('/llms.txt')
    expect(llms.status()).toBe(200)
    expect(await llms.text()).toContain('# Bidwell Consulting')
  })

  test('the moved career-guidance URL serves a redirect stub', async ({ page }) => {
    await page.goto('/career-guidance', { waitUntil: 'commit' })

    // The 0s meta refresh fires immediately; landing on the destination IS the pass.
    await page.waitForURL('**/services/career-coaching')
    await expect(
      page.getByRole('heading', { level: 1, name: /tech career coaching/i })
    ).toBeVisible()
  })

  test('entity graph renders ProfessionalService, Person, and WebSite JSON-LD', async ({
    page,
  }) => {
    await page.goto('/')
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
    const parsed = scripts.map(script => JSON.parse(script))
    const types = parsed.map(schema => schema['@type'])

    expect(types).toContain('ProfessionalService')
    expect(types).toContain('Person')
    expect(types).toContain('WebSite')

    const organization = parsed.find(schema => schema['@type'] === 'ProfessionalService')
    expect(organization.address.addressLocality).toBe('Minneapolis')
    expect(organization.founder['@id']).toBe('https://bidwell.info/#person')

    const person = parsed.find(schema => schema['@type'] === 'Person')
    expect(person.name).toBe('Jordan Winters')
  })
})
