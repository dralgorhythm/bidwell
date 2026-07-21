import { OG_SIZE, ogCard } from '../../../../lib/og-image'

export const dynamic = 'force-static'
export const alt = 'Tech Career Coaching'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return ogCard('Tech Career Coaching', 'Bidwell Consulting · Minneapolis')
}
