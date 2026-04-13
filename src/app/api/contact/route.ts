import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  service: z.string().min(1),
  message: z.string().optional(),
})

// Simple in-memory rate limiting (per IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const WINDOW_MS = 60_000 // 1 minute

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

const serviceLabels: Record<string, string> = {
  web: 'Web Design & Development',
  'process-automation': 'Process Automation',
  'communications-automation': 'Communications Automation',
  'ai-chatbots': 'AI Chatbots',
  'ai-agents': 'AI Agents',
  strategic: 'Strategic conversation',
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    )
  }

  // Parse and validate body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid form data.', details: result.error.flatten() },
      { status: 422 }
    )
  }

  const { name, company, email, service, message } = result.data

  // Send email via Resend
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL ?? 'hello@blooming-group.eu'

  if (!apiKey) {
    // In development without Resend, log and return success
    console.info('[contact] Resend API key not configured — skipping send', {
      name,
      company,
      email,
      service,
    })
    return NextResponse.json({ success: true })
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: 'Blooming Contact <noreply@blooming-group.eu>',
    to: toEmail,
    replyTo: email,
    subject: `New diagnostic request — ${company}`,
    text: [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Service: ${serviceLabels[service] ?? service}`,
      message ? `\nMessage:\n${message}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
    html: `
      <div style="font-family:sans-serif;max-width:600px;color:#09090e">
        <h2 style="color:#4A7C6F">New diagnostic request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px 0;color:#6A6A72;font-size:13px">Name</td><td style="padding:8px 0;font-size:14px">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6A6A72;font-size:13px">Company</td><td style="padding:8px 0;font-size:14px">${company}</td></tr>
          <tr><td style="padding:8px 0;color:#6A6A72;font-size:13px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6A6A72;font-size:13px">Service</td><td style="padding:8px 0;font-size:14px">${serviceLabels[service] ?? service}</td></tr>
          ${message ? `<tr><td style="padding:8px 0;color:#6A6A72;font-size:13px;vertical-align:top">Message</td><td style="padding:8px 0;font-size:14px;white-space:pre-wrap">${message}</td></tr>` : ''}
        </table>
      </div>
    `,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
