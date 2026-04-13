import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Minimal tracing at the edge — keep it lean
  tracesSampleRate: 0.05,

  environment: process.env.NODE_ENV,

  enabled: process.env.NODE_ENV === 'production',
})
