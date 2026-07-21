/// <reference types="vite/client" />
import { redirects } from 'lib/redirects'
import type { Metadata } from 'next'

/**
 * Sitewide metadata policy, enforced over every page module:
 *
 * 1. Every page exports `metadata` with a relative self-canonical — the root
 *    layout once hardcoded the homepage as the canonical of every route,
 *    which suppressed indexing of all sub-pages.
 * 2. Titles, descriptions, and canonicals are unique — 12 experiment stubs
 *    once shared one inherited title/description.
 *
 * Redirect stubs (lib/redirects.ts) are the one sanctioned exception: their
 * canonical deliberately points at the destination page.
 */
const pageModules = import.meta.glob('./**/page.tsx', { eager: true }) as Record<
  string,
  { metadata?: Metadata }
>

// Modules only — importing them would execute ImageResponse; paths suffice.
const ogImageFiles = Object.keys(import.meta.glob('./**/opengraph-image.tsx'))

// './(main)/services/career-coaching/page.tsx' -> '/services/career-coaching'
function routeOf(path: string): string {
  const route = path
    .replace(/\([^)]+\)\//g, '')
    .replace(/^\.\//, '/')
    .replace(/\/page\.tsx$/, '')
  return route === '' ? '/' : route
}

const allPages = Object.entries(pageModules).map(([path, module]) => ({
  path,
  route: routeOf(path),
  metadata: module.metadata,
}))

const redirectStubs = allPages.filter(page => page.route in redirects)
const pages = allPages.filter(page => !(page.route in redirects))

describe('metadata policy', () => {
  it('discovers the full page inventory (route groups included)', () => {
    expect(pages.length).toBeGreaterThanOrEqual(18)
    expect(pages.some(page => page.path.includes('(main)'))).toBe(true)
    expect(pages.some(page => page.path.includes('(wide)'))).toBe(true)
  })

  it.each(
    pages.map(page => [page.path, page.route, page.metadata] as const)
  )('%s exports complete metadata', (_path, route, metadata) => {
    expect(metadata).toBeDefined()
    expect(typeof metadata?.title).toBe('string')
    expect((metadata?.title as string).length).toBeGreaterThan(0)
    expect(typeof metadata?.description).toBe('string')
    expect((metadata?.description as string).length).toBeGreaterThan(0)

    expect(metadata?.alternates?.canonical).toBe(route)
  })

  it('canonicalizes every redirect stub to its registered destination', () => {
    expect(redirectStubs.length).toBe(Object.keys(redirects).length)
    for (const stub of redirectStubs) {
      expect(stub.metadata?.alternates?.canonical).toBe(redirects[stub.route])
    }
  })

  it('has a unique canonical per page', () => {
    const canonicals = pages.map(page => page.metadata?.alternates?.canonical)
    expect(new Set(canonicals).size).toBe(canonicals.length)
  })

  it('has a unique title per page', () => {
    const titles = pages.map(page => page.metadata?.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('has a unique description per page', () => {
    const descriptions = pages.map(page => page.metadata?.description)
    expect(new Set(descriptions).size).toBe(descriptions.length)
  })

  it('gives every openGraph-configured page a colocated opengraph-image', () => {
    // A page-level openGraph config replaces the inherited parent openGraph
    // object ENTIRELY — including any ancestor segment's file-convention
    // image — so such pages ship no og:image unless the image file sits in
    // their own segment. This is exactly how the home page lost its card.
    const ogImageDirs = new Set(ogImageFiles.map(path => path.replace('/opengraph-image.tsx', '')))

    for (const page of pages.filter(entry => entry.metadata?.openGraph)) {
      const pageDir = page.path.replace('/page.tsx', '')
      expect(ogImageDirs, `${page.path} defines openGraph`).toContain(pageDir)
    }
  })

  it('contains no em dashes in page sources (voice rule: spaced hyphens only)', () => {
    const sources = import.meta.glob('./**/page.tsx', {
      query: '?raw',
      import: 'default',
      eager: true,
    }) as Record<string, string>

    for (const [path, source] of Object.entries(sources)) {
      expect(source.includes('—'), `${path} contains an em dash`).toBe(false)
    }
  })

  it('noindexes coming-soon experiment stubs', () => {
    const stub = pageModules['./(wide)/experiments/sonic-weather/page.tsx']
    expect(stub?.metadata?.robots).toEqual({ index: false, follow: false })
  })

  it('leaves active experiment pages indexable', () => {
    const active = pageModules['./(wide)/experiments/claude-agentic-framework/page.tsx']
    expect(active?.metadata?.robots).toBeUndefined()
  })
})
