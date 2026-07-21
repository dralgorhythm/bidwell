import { render, screen } from 'lib/test-utils'
import { describe, expect, it } from 'vitest'
import CareerGuidanceRedirect from './page'

describe('career-guidance redirect stub', () => {
  it('meta-refreshes instantly to the new URL', () => {
    render(<CareerGuidanceRedirect />)

    const refresh = document.head.querySelector('meta[http-equiv="refresh"]')
    expect(refresh?.getAttribute('content')).toBe('0;url=/services/career-coaching')
  })

  it('offers a visible link to the destination', () => {
    render(<CareerGuidanceRedirect />)

    expect(screen.getByRole('heading', { level: 1, name: /moved/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /the new page/i })).toHaveAttribute(
      'href',
      '/services/career-coaching'
    )
  })

  it('canonicalizes to the destination so equity consolidates there', async () => {
    const { metadata } = await import('./page')
    expect(metadata.alternates?.canonical).toBe('/services/career-coaching')
  })
})
