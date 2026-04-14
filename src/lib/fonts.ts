import { DM_Sans } from 'next/font/google'

/**
 * DM Sans — primary brand typeface.
 *
 * Geometric grotesque with excellent legibility and character.
 * Supports weights 300–700, covering all display and body needs.
 * Free via Google Fonts, zero-layout-shift via next/font optimization.
 *
 * Comparable to Söhne Leicht in structure and density — appropriate
 * for the Dense Intelligence positioning (Palantir / Linear tier).
 */
export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
})
