import { OG_SIZE, ogCard } from '../../../../lib/og-image'
import { agentCoordinationPost as post } from '../posts'

export const dynamic = 'force-static'
export const alt = post.title
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return ogCard(post.title, 'Bidwell Consulting')
}
