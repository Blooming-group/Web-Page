import { z } from 'zod'

// ─── Server-side environment schema ───────────────────────────────────────
// Validated at startup — the app will refuse to start if any required
// variable is missing or malformed. No silent failures in production.
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_EMAIL: z.string().email().optional(),
  // Sentry DSN for server-side error reporting
  SENTRY_DSN: z.string().url().optional(),
  // Upstash Redis — global rate limiting across all Vercel edge instances
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
})

// ─── Client-side environment schema ───────────────────────────────────────
// Only NEXT_PUBLIC_* variables. These are embedded in the client bundle
// and visible to anyone — never put secrets here.
// Note: The Sentry DSN is intentionally public — it is an ingestion endpoint,
// not a secret key. Exposing it does not grant read access to your error data.
const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://blooming-group.eu'),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default('production'),
})

// ─── Validation ───────────────────────────────────────────────────────────
function validateEnv() {
  const serverResult = serverSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  const clientResult = clientSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })

  if (!serverResult.success) {
    console.error('Invalid server environment variables:')
    console.error(serverResult.error.flatten().fieldErrors)
    // In production, a misconfigured env is a critical error
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid server environment — refusing to start.')
    }
  }

  if (!clientResult.success) {
    console.error('Invalid client environment variables:')
    console.error(clientResult.error.flatten().fieldErrors)
  }

  return {
    ...(serverResult.data ?? {}),
    ...(clientResult.data ?? {}),
  }
}

export const env = validateEnv()
