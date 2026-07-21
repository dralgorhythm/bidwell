export const dynamic = 'force-static'

export default function manifest() {
  return {
    name: 'Bidwell Consulting',
    short_name: 'Bidwell',
    description: 'Expert software engineering and organizational consulting services',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
