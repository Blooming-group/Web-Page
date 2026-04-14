import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the hero headline', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Strategic thinking')
  })

  test('hero CTA links to contact page', async ({ page }) => {
    const cta = page.getByRole('link', { name: /start the conversation/i }).first()
    await expect(cta).toBeVisible()
    await cta.click()
    await expect(page).toHaveURL('/contact')
  })

  test('renders all main sections', async ({ page }) => {
    // Services section
    await expect(page.getByText('What we build')).toBeVisible()
    // Process section
    await expect(page.getByText('How we work')).toBeVisible()
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Blooming Group/)
  })

  test('has OG meta tags', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /Blooming Group/)

    const ogType = page.locator('meta[property="og:type"]')
    await expect(ogType).toHaveAttribute('content', 'website')
  })

  test('has JSON-LD structured data', async ({ page }) => {
    const ldJson = page.locator('script[type="application/ld+json"]').first()
    await expect(ldJson).toBeAttached()
    const content = await ldJson.innerHTML()
    const data = JSON.parse(content)
    expect(data['@type']).toMatch(/WebSite|Organization/)
  })
})
