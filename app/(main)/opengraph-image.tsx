import { OG_SIZE, ogCard } from '../../lib/og-image'

export const dynamic = 'force-static'
export const alt = 'Bidwell Consulting'
export const size = OG_SIZE
export const contentType = 'image/png'

/**
 * Card for the home page (and any (main) route without its own image).
 * Required here: the home page defines metadata.openGraph, which replaces
 * the inherited root openGraph - including the root segment's file image  -
 * so the image file must be colocated in this segment.
 */
export default function OpengraphImage() {
  return ogCard('Bidwell Consulting', 'Software Consulting in the Twin Cities')
}
