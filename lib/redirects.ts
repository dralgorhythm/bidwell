import type { Metadata } from 'next'

/**
 * Client-side redirects for moved URLs — GitHub Pages cannot serve 301s.
 * Each entry keeps a stub page at the old path emitting an instant meta
 * refresh plus a canonical pointing at the destination, which search
 * engines treat as a redirect signal. Stubs are never sitemapped or
 * internally linked, and entries are permanent — never delete one or
 * reuse an old path.
 */
export const redirects: Record<string, string> = {
  '/career-guidance': '/services/career-coaching',
}

export function resolveRedirect(from: string): string {
  const to = redirects[from]
  if (!to) {
    throw new Error(`No redirect registered for ${from}`)
  }
  return to
}

export function redirectMetadata(from: string): Metadata {
  const to = resolveRedirect(from)
  return {
    title: `Moved to ${to}`,
    description: `This page has moved to ${to}.`,
    alternates: { canonical: to },
  }
}
