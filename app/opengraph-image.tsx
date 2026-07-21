import { OG_SIZE, ogCard } from '../lib/og-image'

export const dynamic = 'force-static'
export const alt = 'Bidwell Consulting'
export const size = OG_SIZE
export const contentType = 'image/png'

/** Sitewide default share card; routes with their own opengraph-image.tsx override it. */
export default function OpengraphImage() {
  return ogCard('Bidwell Consulting', 'Software Engineering & Organizational Consulting')
}
