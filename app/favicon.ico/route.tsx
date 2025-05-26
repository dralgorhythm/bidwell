import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        BC
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}
