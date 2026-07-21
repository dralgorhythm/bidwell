import { OG_SIZE, ogCard } from '../../../lib/og-image'

export const dynamic = 'force-static'
export const alt = 'Consulting Services'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return ogCard('Consulting Services', 'Bidwell Consulting · Minneapolis')
}
