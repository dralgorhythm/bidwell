import { baseUrl } from '../lib/site-config'

export const dynamic = 'force-static'

/**
 * Everything is crawlable by everyone, deliberately — including AI crawlers
 * (GPTBot, ChatGPT-User, CCBot, Claude, Google-Extended), which are a
 * discovery channel for a consulting site. There is nothing private in a
 * static export, and disallowing /_next/ would only hide CSS/JS from
 * Google's renderer.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
