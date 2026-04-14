'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          background: '#09090E',
          color: '#F2EEE6',
          fontFamily: 'system-ui, sans-serif',
          margin: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '4rem 2rem',
            maxWidth: '640px',
            margin: '0 auto',
          }}
        >
          <div
            style={{ width: '48px', height: '2px', background: '#4A7C6F', marginBottom: '3rem' }}
          />
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4A7C6F',
              fontWeight: 600,
              marginBottom: '1rem',
              margin: '0 0 1rem',
            }}
          >
            Unexpected error
          </p>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 300,
              lineHeight: 1.2,
              margin: '0 0 1rem',
              color: '#F2EEE6',
            }}
          >
            Something went wrong.
          </h1>
          <p
            style={{
              color: '#6A6A72',
              margin: '0 0 2.5rem',
              lineHeight: 1.6,
              fontSize: '1rem',
            }}
          >
            An unexpected error occurred. The team has been notified. You can try again or return to
            the home page.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#4A7C6F',
                color: '#F2EEE6',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                letterSpacing: '0.05em',
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error renders outside the Next.js router; <Link> cannot be used here */}
            <a
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid rgba(74,124,111,0.3)',
                color: '#F2EEE6',
                textDecoration: 'none',
                fontSize: '14px',
                letterSpacing: '0.05em',
              }}
            >
              Return home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
