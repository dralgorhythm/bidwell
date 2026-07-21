import { OG_SIZE, ogCard } from '../../../../lib/og-image'

export const dynamic = 'force-static'
export const alt = 'AI Consulting & Agent Engineering'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return ogCard('AI Consulting & Agent Engineering', 'Bidwell Consulting · Minneapolis')
}
