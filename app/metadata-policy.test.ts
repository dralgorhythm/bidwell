/// <reference types="vite/client" />
import type { Metadata } from 'next'

/**
 * Sitewide metadata policy, enforced over every page module:
 *
 * 1. Every page exports `metadata` with a relative self-canonical — the root
 *    layout once hardcoded the homepage as the canonical of every route,
 *    which suppressed indexing of all sub-pages.
 * 2. Titles, descriptions, and canonicals are unique — 12 experiment stubs
 *    once shared one inherited title/description.
 */
const pageModules = import.meta.glob('./**/page.tsx', { eager: true }) as Record<
  string,
  { metadata?: Metadata }
>

const pages = Object.entries(pageModules).map(([path, module]) => ({
  path,
  metadata: module.metadata,
}))

describe('metadata policy', () => {
  it('discovers the full page inventory (route groups included)', () => {
    expect(pages.length).toBeGreaterThanOrEqual(18)
    expect(pages.some(page => page.path.includes('(main)'))).toBe(true)
    expect(pages.some(page => page.path.includes('(wide)'))).toBe(true)
  })

  it.each(
    pages.map(page => [page.path, page.metadata] as const)
  )('%s exports complete metadata', (_path, metadata) => {
    expect(metadata).toBeDefined()
    expect(typeof metadata?.title).toBe('string')
    expect((metadata?.title as string).length).toBeGreaterThan(0)
    expect(typeof metadata?.description).toBe('string')
    expect((metadata?.description as string).length).toBeGreaterThan(0)

    const canonical = metadata?.alternates?.canonical
    expect(typeof canonical).toBe('string')
    expect(canonical as string).toMatch(/^\//)
    expect(canonical as string).not.toMatch(/.\/$/)
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

  it('noindexes coming-soon experiment stubs', () => {
    const stub = pageModules['./(wide)/experiments/sonic-weather/page.tsx']
    expect(stub?.metadata?.robots).toEqual({ index: false, follow: false })
  })

  it('leaves active experiment pages indexable', () => {
    const active = pageModules['./(wide)/experiments/claude-agentic-framework/page.tsx']
    expect(active?.metadata?.robots).toBeUndefined()
  })
})
