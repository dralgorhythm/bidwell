import { OG_SIZE, ogCard } from '../../../../lib/og-image'

export const dynamic = 'force-static'
export const alt = 'Software Consulting in Minneapolis'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return ogCard('Software Consulting', 'Bidwell Consulting · Minneapolis')
}
