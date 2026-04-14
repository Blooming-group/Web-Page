import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Blooming Group — Strategic thinking. Real technology.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#09090E',
        padding: '72px 80px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          width: '48px',
          height: '2px',
          background: '#4A7C6F',
        }}
      />

      {/* Center content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            fontSize: '13px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#4A7C6F',
            fontWeight: 600,
          }}
        >
          BLOOMING GROUP
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 300,
            color: '#F2EEE6',
            lineHeight: 1.1,
            maxWidth: '800px',
          }}
        >
          Strategic thinking.
          <br />
          Real technology.
        </div>
        <div
          style={{
            fontSize: '22px',
            color: '#6A6A72',
            fontWeight: 300,
            maxWidth: '640px',
            lineHeight: 1.5,
          }}
        >
          The firm European mid-market companies needed and didn&apos;t have.
        </div>
      </div>

      {/* Bottom: domain */}
      <div
        style={{
          fontSize: '14px',
          color: '#6A6A72',
          letterSpacing: '0.08em',
        }}
      >
        blooming-group.eu
      </div>
    </div>,
    { ...size }
  )
}
