import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { geist } from '@/lib/fonts'
import '@/styles/globals.css'
import '@/styles/typography.css'

export const metadata: Metadata = {
  title: {
    default: 'Blooming Group — Strategic thinking. Real technology.',
    template: '%s | Blooming Group',
  },
  description:
    'The European mid-market firm that bridges strategy and execution. No decks. No delays. Measurable outcomes.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blooming-group.eu'),
  openGraph: {
    type: 'website',
    locale: 'en_EU',
    url: 'https://blooming-group.eu',
    siteName: 'Blooming Group',
    title: 'Blooming Group — Strategic thinking. Real technology.',
    description:
      'The European mid-market firm that bridges strategy and execution. No decks. No delays. Measurable outcomes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blooming Group',
    description:
      'Strategic thinking. Real technology. The firm European mid-market companies needed.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
