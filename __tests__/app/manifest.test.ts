import manifest from '../../app/manifest'

describe('App Manifest', () => {
  const manifestData = manifest()

  it('returns the correct app name and details', () => {
    expect(manifestData.name).toBe('Bidwell Consulting')
    expect(manifestData.short_name).toBe('Bidwell')
    expect(manifestData.description).toBe('Expert software engineering and organizational consulting services')
  })

  it('includes correct PWA configuration', () => {
    expect(manifestData.start_url).toBe('/')
    expect(manifestData.display).toBe('standalone')
    expect(manifestData.background_color).toBe('#ffffff')
    expect(manifestData.theme_color).toBe('#3b82f6')
  })

  it('includes proper icon definitions', () => {
    expect(manifestData.icons).toHaveLength(2)
    
    // Apple icon
    expect(manifestData.icons[0]).toEqual({
      src: '/apple-icon.png',
      sizes: '180x180',
      type: 'image/png',
    })

    // Favicon
    expect(manifestData.icons[1]).toEqual({
      src: '/favicon.ico',
      sizes: '32x32',
      type: 'image/x-icon',
    })
  })
})
