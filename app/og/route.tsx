import { ImageResponse } from 'next/og'

// Always use force-static for compatibility with static export
export const dynamic = 'force-static'

export function GET() {
  // Always use default values to ensure compatibility with static export
  const title = 'Bidwell Consulting'
  const subtitle = 'Software Engineering & Organizational Consulting'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: 'white',
          backgroundImage: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            flexDirection: 'column',
            maxWidth: '1000px',
            padding: '40px 80px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              lineHeight: 1.1,
              color: '#1f2937',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#6b7280',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
