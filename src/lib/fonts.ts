import { Geist } from 'next/font/google'

/**
 * Söhne Leicht — primary brand typeface (self-hosted)
 *
 * TO ACTIVATE: Place sohne-leicht.woff2 in public/fonts/, then:
 *   1. Uncomment the sohne export below
 *   2. Re-add `sohne.variable` to the <html> className in src/app/layout.tsx
 *   3. Run `npm run build`
 *
 * import localFont from 'next/font/local'
 * export const sohne = localFont({
 *   src: [{ path: '../../public/fonts/sohne-leicht.woff2', weight: '300', style: 'normal' }],
 *   variable: '--font-sohne',
 *   display: 'swap',
 *   preload: true,
 *   fallback: ['system-ui', 'sans-serif'],
 * })
 */

/**
 * Geist — primary typeface until Söhne file is placed.
 * Serves all weights: 300 (light body) and 400–700 (headlines).
 * Zero layout shift via next/font/google optimization.
 */
export const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-geist',
  display: 'swap',
})
