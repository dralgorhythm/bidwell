import { baseUrl } from '../lib/site-config'
import { posts } from './(main)/blog/posts'
import { experiments } from './(main)/experiments/config'

export const dynamic = 'force-static'

/**
 * Only indexable pages belong here: coming-soon experiment stubs are
 * noindexed and excluded, and new routes are added in the same PR that
 * ships the page — the post-deploy health check curls every listed URL.
 *
 * Contract: scripts/generate-health-checks.ts consumes this default export
 * and requires an absolute `url` and numeric `priority` on every entry.
 * `lastModified` appears only where a real date exists (blog posts); it is
 * never fabricated from build time.
 */
export default async function sitemap() {
  const routes = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/services`, priority: 0.8 },
    { url: `${baseUrl}/services/software-consulting`, priority: 0.9 },
    { url: `${baseUrl}/services/ai-consulting`, priority: 0.9 },
    { url: `${baseUrl}/services/engineering-practice-improvement`, priority: 0.9 },
    { url: `${baseUrl}/services/career-coaching`, priority: 0.9 },
    { url: `${baseUrl}/about`, priority: 0.6 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
    { url: `${baseUrl}/blog`, priority: 0.7 },
    ...posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      priority: 0.7,
    })),
    { url: `${baseUrl}/experiments`, priority: 0.6 },
  ]

  const experimentRoutes = experiments
    .filter(experiment => experiment.status === 'active')
    .map(experiment => ({
      url: `${baseUrl}/experiments/${experiment.slug}`,
      priority: 0.6,
    }))

  return [...routes, ...experimentRoutes]
}
