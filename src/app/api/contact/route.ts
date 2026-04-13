import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { env } from '@/lib/env'

// ─── Schema ────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  company: z.string().min(1).max(200).trim(),
  email: z.string().email().max(254).toLowerCase().trim(),
  service: z.enum([
    'web',
    'process-automation',
    'communications-automation',
    'ai-chatbots',
    'ai-agents',
    'strategic',
  ]),
  message: z.string().max(2000).trim().optional(),
})

// ─── Rate limiting (per IP, resets on cold start) ─────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

// ─── Helpers ──────────────────────────────────────────────────────────────
const SERVICE_LABELS: Record<string, string> = {
  web: 'Web Design & Development',
  'process-automation': 'Process Automation',
  'communications-automation': 'Communications Automation',
  'ai-chatbots': 'AI Chatbots',
  'ai-agents': 'AI Agents',
  strategic: 'Strategic conversation',
}

// Generic error — never expose internal details to the client
const INTERNAL_ERROR = NextResponse.json(
  { error: 'Failed to send message. Please try again.' },
  { status: 500 }
)

// ─── Route handler ────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Only accept JSON
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported media type.' }, { status: 415 })
  }

  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  // Parse body — catch malformed JSON without leaking errors
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Validate and sanitize with Zod
  const result = contactSchema.safeParse(body)
  if (!result.success) {
    // Return generic error — don't expose schema details
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 422 })
  }

  const { name, company, email, service, message } = result.data
  const serviceLabel = SERVICE_LABELS[service]
  const toEmail = env.CONTACT_EMAIL ?? 'hello@blooming-group.eu'

  // Development fallback: no API key configured
  if (!env.RESEND_API_KEY) {
    if (env.NODE_ENV !== 'production') {
      console.info('[contact:dev] Resend not configured — message logged only', {
        name,
        company,
        service,
      })
      return NextResponse.json({ success: true })
    }
    // In production with no key, fail explicitly
    console.error('[contact] RESEND_API_KEY not set in production')
    return INTERNAL_ERROR
  }

  // Send email
  try {
    const resend = new Resend(env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'Blooming Contact <noreply@blooming-group.eu>',
      to: toEmail,
      replyTo: email,
      subject: `New diagnostic request — ${company}`,
      text: [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Service: ${serviceLabel}`,
        message ? `\nMessage:\n${message}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;background:#f9f9f9;padding:32px;border-radius:4px">
          <div style="background:#09090e;padding:24px;border-radius:4px;margin-bottom:24px">
            <span style="color:#4A7C6F;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600">BLOOMING GROUP</span>
            <h2 style="color:#F2EEE6;margin:8px 0 0;font-size:18px;font-weight:500">New diagnostic request</h2>
          </div>
          <table style="border-collapse:collapse;width:100%;background:#fff;padding:24px;border-radius:4px">
            <tr style="border-bottom:1px solid #f0f0f0">
              <td style="padding:12px 8px;color:#6A6A72;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap;width:120px">Name</td>
              <td style="padding:12px 8px;font-size:14px;color:#09090e">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0f0f0">
              <td style="padding:12px 8px;color:#6A6A72;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Company</td>
              <td style="padding:12px 8px;font-size:14px;color:#09090e">${company}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0f0f0">
              <td style="padding:12px 8px;color:#6A6A72;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Email</td>
              <td style="padding:12px 8px;font-size:14px"><a href="mailto:${email}" style="color:#4A7C6F">${email}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #f0f0f0">
              <td style="padding:12px 8px;color:#6A6A72;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Service</td>
              <td style="padding:12px 8px;font-size:14px;color:#09090e">${serviceLabel}</td>
            </tr>
            ${
              message
                ? `<tr>
                    <td style="padding:12px 8px;color:#6A6A72;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top">Message</td>
                    <td style="padding:12px 8px;font-size:14px;color:#09090e;white-space:pre-wrap">${message}</td>
                  </tr>`
                : ''
            }
          </table>
        </div>
      `,
    })

    if (error) {
      // Log server-side but never expose Resend error details to client
      console.error('[contact] Resend delivery error:', error.message)
      return INTERNAL_ERROR
    }
  } catch (err) {
    // Catch network errors, timeouts, etc.
    console.error('[contact] Unexpected error:', err instanceof Error ? err.message : 'unknown')
    return INTERNAL_ERROR
  }

  return NextResponse.json({ success: true })
}

// Block all other HTTP methods on this route
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
