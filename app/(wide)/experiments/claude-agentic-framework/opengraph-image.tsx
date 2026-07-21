import { OG_SIZE, ogCard } from '../../../../lib/og-image'

export const dynamic = 'force-static'
export const alt = 'Claude Agentic Framework'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return ogCard('Claude Agentic Framework', 'The Governed Swarm — Bidwell Consulting')
}
