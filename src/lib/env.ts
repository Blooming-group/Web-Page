import { z } from 'zod'

// ─── Server-side environment schema ───────────────────────────────────────
// Validated at startup — the app will refuse to start if any required
// variable is missing or malformed. No silent failures in production.
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_EMAIL: z.string().email().optional(),
})

// ─── Client-side environment schema ───────────────────────────────────────
// Only NEXT_PUBLIC_* variables. These are embedded in the client bundle
// and visible to anyone — never put secrets here.
const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://blooming-group.eu'),
})

// ─── Validation ───────────────────────────────────────────────────────────
function validateEnv() {
  const serverResult = serverSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  })

  const clientResult = clientSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
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
