#!/usr/bin/env tsx
/**
 * Generate health check configuration from sitemap
 * This ensures our post-deploy checks always test the actual deployed routes
 */

import sitemap from '../app/sitemap'

interface HealthCheck {
  url: string
  name: string
  priority: number
}

async function generateHealthChecks(): Promise<void> {
  const routes = await sitemap()

  const checks: HealthCheck[] = routes.map(route => {
    // Extract path from full URL
    const url = new URL(route.url)
    const path = url.pathname

    // Generate a friendly name from the path
    const name =
      path === '/'
        ? 'Home page'
        : `${path
            .split('/')
            .filter(Boolean)
            .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join(' ')} page`

    return {
      url: route.url,
      name,
      priority: route.priority,
    }
  })

  // Sort by priority (highest first)
  checks.sort((a, b) => b.priority - a.priority)

  // Output as JSON for GitHub Actions
  console.log(JSON.stringify(checks, null, 2))
}

generateHealthChecks().catch(error => {
  console.error('Failed to generate health checks:', error)
  process.exit(1)
})
