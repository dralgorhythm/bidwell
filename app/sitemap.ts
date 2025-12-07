import { experiments } from './(main)/experiments/config'

export const baseUrl = 'https://bidwell.info'

export const dynamic = 'force-static'

export default async function sitemap() {
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/agent-coordination`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experiments`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Add individual experiment pages
  const experimentRoutes = experiments.map(experiment => ({
    url: `${baseUrl}/experiments/${experiment.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: experiment.status === 'active' ? 0.8 : 0.5,
  }))

  return [...routes, ...experimentRoutes]
}
