export const baseUrl = 'https://bidwell.info'

export const dynamic = 'force-static'

export default async function sitemap() {
  const routes = ['', '/comparison'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
