/**
 * Blog post registry — the single source of truth for post metadata.
 * Pure data with no imports: app/sitemap.ts consumes this and must stay
 * executable by tsx (health-check generation) outside the Next bundler.
 */
export interface Post {
  slug: string
  title: string
  /** Search-targeted <title> when it should differ from the on-page h1. */
  seoTitle: string
  description: string
  /** ISO date (YYYY-MM-DD) the post was first published. Never derived from build time. */
  publishedAt: string
}

export const agentCoordinationPost: Post = {
  slug: 'agent-coordination',
  title: 'Agent Coordination Structure',
  seoTitle: 'Coordinating AI Coding Agents',
  description:
    'A practical structure for coordinating AI coding agents — critical directives, artifact handoffs, and personas.',
  publishedAt: '2025-11-27',
}

export const posts: Post[] = [agentCoordinationPost]

export function formatPostDate(publishedAt: string, month: 'short' | 'long' = 'long'): string {
  // Anchor to local midnight so the rendered date can't slip a day via UTC parsing.
  return new Date(`${publishedAt}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
  })
}
