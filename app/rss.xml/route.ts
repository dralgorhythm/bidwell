import { baseUrl, siteConfig } from '../../lib/site-config'
import { posts } from '../(main)/blog/posts'

export const dynamic = 'force-static'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET(): Response {
  const items = posts
    .map(
      post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)} Blog</title>
    <link>${baseUrl}/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
