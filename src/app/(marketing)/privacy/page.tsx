import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Separator } from '@/components/ui/Separator'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Blooming Group collects, uses, and protects your personal data.',
  robots: { index: true, follow: false },
}

const LAST_UPDATED = 'April 14, 2026'
const CONTACT_EMAIL = 'hello@blooming-group.eu'
const COMPANY_NAME = 'Blooming Group'
const SITE_URL = 'https://blooming-group.eu'

export default function PrivacyPage() {
  return (
    <main className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-16">
            <div className="mb-6 h-px w-12 bg-[--color-accent-primary]" />
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              Legal
            </p>
            <h1
              className="mb-4 text-4xl leading-tight font-light tracking-tight"
              style={{ color: 'var(--color-ivory)' }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="prose-blooming space-y-12">
            <Section title="1. Who we are">
              <p>
                {COMPANY_NAME} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates the
                website at{' '}
                <a href={SITE_URL} className="text-[--color-accent-primary] hover:underline">
                  {SITE_URL}
                </a>
                . We are the data controller responsible for your personal data under the General
                Data Protection Regulation (GDPR) and applicable EU/EEA data protection law.
              </p>
              <p>
                For any privacy-related questions, contact us at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[--color-accent-primary] hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Section>

            <Separator />

            <Section title="2. What data we collect and why">
              <p>
                We collect personal data only when you actively provide it through the contact form.
                We do not run advertising trackers, third-party analytics cookies, or any form of
                passive data collection.
              </p>
              <SubSection title="Contact form">
                <p>When you submit a contact request, we collect:</p>
                <ul>
                  <li>
                    <strong>Name</strong> — to address you correctly in our response
                  </li>
                  <li>
                    <strong>Company name</strong> — to understand your context
                  </li>
                  <li>
                    <strong>Email address</strong> — to reply to your inquiry
                  </li>
                  <li>
                    <strong>Service interest</strong> — to route your inquiry to the right person
                  </li>
                  <li>
                    <strong>Message</strong> (optional) — if you choose to provide additional
                    context
                  </li>
                </ul>
                <p>
                  Legal basis: <strong>Legitimate interest</strong> (Article 6(1)(f) GDPR) — we have
                  a legitimate interest in responding to business inquiries. You can object to this
                  processing at any time by contacting us.
                </p>
              </SubSection>
              <SubSection title="Error monitoring">
                <p>
                  We use Sentry to automatically capture technical errors on our website. Sentry may
                  collect browser type, operating system, and the URL where an error occurred. This
                  data is used exclusively for diagnosing and fixing technical problems.
                </p>
                <p>
                  Our Sentry instance is hosted in Germany (EU) and does not transfer data outside
                  the European Economic Area. No personal identifiers are intentionally captured —
                  all text inputs are masked.
                </p>
                <p>
                  Legal basis: <strong>Legitimate interest</strong> (Article 6(1)(f) GDPR) — we have
                  a legitimate interest in maintaining a functioning website.
                </p>
              </SubSection>
            </Section>

            <Separator />

            <Section title="3. Who we share data with">
              <p>
                We do not sell, rent, or trade your personal data. We share data only with the
                following processors, under written agreements that comply with GDPR:
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                    <th
                      className="pt-1 pb-3 text-left text-xs font-semibold tracking-wider uppercase"
                      style={{ color: 'var(--color-mid)' }}
                    >
                      Processor
                    </th>
                    <th
                      className="pt-1 pb-3 text-left text-xs font-semibold tracking-wider uppercase"
                      style={{ color: 'var(--color-mid)' }}
                    >
                      Purpose
                    </th>
                    <th
                      className="pt-1 pb-3 text-left text-xs font-semibold tracking-wider uppercase"
                      style={{ color: 'var(--color-mid)' }}
                    >
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ProcessorRow
                    name="Resend"
                    purpose="Transactional email delivery"
                    location="USA (SCCs applied)"
                  />
                  <ProcessorRow name="Sentry" purpose="Error monitoring" location="Germany (EU)" />
                  <ProcessorRow
                    name="Vercel"
                    purpose="Website hosting"
                    location="USA/EU (SCCs applied)"
                  />
                </tbody>
              </table>
              <p className="mt-4 text-sm" style={{ color: 'var(--color-mid)' }}>
                SCCs = Standard Contractual Clauses, the EU-approved mechanism for lawful data
                transfers to third countries.
              </p>
            </Section>

            <Separator />

            <Section title="4. How long we keep your data">
              <p>
                Contact form submissions are retained in our email inbox for as long as necessary to
                handle your inquiry and maintain a record of our business relationship, typically no
                longer than 3 years from last contact.
              </p>
              <p>Error logs in Sentry are automatically deleted after 90 days.</p>
            </Section>

            <Separator />

            <Section title="5. Cookies and tracking">
              <p>
                This website does not use advertising cookies, profiling cookies, or third-party
                tracking cookies. We do not fingerprint visitors or build behavioral profiles.
              </p>
              <p>
                The only technical data collected is anonymous performance signals through Vercel
                Analytics, which is cookieless and does not collect personal identifiers.
              </p>
            </Section>

            <Separator />

            <Section title="6. Your rights under GDPR">
              <p>
                If you are in the EU/EEA, you have the following rights regarding your personal
                data:
              </p>
              <ul>
                <li>
                  <strong>Right of access</strong> — request a copy of the data we hold about you
                </li>
                <li>
                  <strong>Right to rectification</strong> — request correction of inaccurate data
                </li>
                <li>
                  <strong>Right to erasure</strong> — request deletion of your data
                </li>
                <li>
                  <strong>Right to restriction</strong> — request that we limit how we use your data
                </li>
                <li>
                  <strong>Right to data portability</strong> — receive your data in a structured,
                  machine-readable format
                </li>
                <li>
                  <strong>Right to object</strong> — object to processing based on legitimate
                  interest
                </li>
              </ul>
              <p>
                To exercise any of these rights, email us at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[--color-accent-primary] hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                . We will respond within 30 days. If you are not satisfied with our response, you
                have the right to lodge a complaint with your national data protection authority.
              </p>
            </Section>

            <Separator />

            <Section title="7. Changes to this policy">
              <p>
                We may update this policy when our practices change. The &ldquo;Last updated&rdquo;
                date at the top of this page reflects the most recent revision. Material changes
                will be communicated via the website.
              </p>
            </Section>
          </div>
        </div>
      </Container>
    </main>
  )
}

// ─── Local components ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="mb-6 text-xl font-light tracking-tight"
        style={{ color: 'var(--color-ivory)' }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--color-mid)' }}>
        {children}
      </div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3
        className="mb-3 text-sm font-semibold tracking-wider uppercase"
        style={{ color: 'var(--color-ivory)' }}
      >
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function ProcessorRow({
  name,
  purpose,
  location,
}: {
  name: string
  purpose: string
  location: string
}) {
  return (
    <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
      <td className="py-3 pr-4" style={{ color: 'var(--color-ivory)' }}>
        {name}
      </td>
      <td className="py-3 pr-4" style={{ color: 'var(--color-mid)' }}>
        {purpose}
      </td>
      <td className="py-3" style={{ color: 'var(--color-mid)' }}>
        {location}
      </td>
    </tr>
  )
}
