export default function manifest() {
  return {
    name: 'Bidwell Consulting',
    short_name: 'Bidwell',
    description: 'Expert software engineering and organizational consulting services',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  }
}
