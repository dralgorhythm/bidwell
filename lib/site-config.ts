/**
 * Single source of truth for site identity, origin, and contact facts.
 *
 * Must stay dependency-free: `app/sitemap.ts` imports from here and is
 * executed outside Next by `scripts/generate-health-checks.ts` (via tsx),
 * so everything in this module's import graph must resolve without
 * bundler aliases.
 */
export interface SiteConfig {
  name: string
  baseUrl: string
  description: string
  email: string
  founder: {
    name: string
    jobTitle: string
    sameAs: readonly string[]
  }
  location: {
    locality: string
    region: string
    country: string
    areaServed: readonly string[]
  }
  sameAs: readonly string[]
}

export const siteConfig: SiteConfig = {
  name: 'Bidwell Consulting',
  baseUrl: 'https://bidwell.info',
  description:
    'Independent software consulting from Minneapolis: infrastructure, AI engineering, and engineering practice improvement for the Twin Cities and beyond.',
  email: 'jordan@bidwell.info',
  founder: {
    name: 'Jordan Winters',
    jobTitle: 'Software & Infrastructure Consultant',
    sameAs: ['https://www.linkedin.com/in/wintersjordan/', 'https://github.com/dralgorhythm'],
  },
  location: {
    locality: 'Minneapolis',
    region: 'MN',
    country: 'US',
    areaServed: ['Minneapolis', 'Saint Paul', 'Minneapolis–Saint Paul metro area'],
  },
  sameAs: [
    'https://www.linkedin.com/in/wintersjordan/',
    'https://github.com/dralgorhythm',
    'https://soundcloud.com/dralgorhythm',
  ],
}

export const baseUrl = siteConfig.baseUrl

export const absoluteUrl = (path: string): string => `${baseUrl}${path === '/' ? '' : path}`
