import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', title: /Blooming Group/ },
  { path: '/services', title: /Services.*Blooming/ },
  { path: '/about', title: /About.*Blooming/ },
  { path: '/contact', title: /Contact.*Blooming/ },
  { path: '/privacy', title: /Privacy.*Blooming/ },
]

test.describe('SEO — Meta tags and structured data', () => {
  for (const { path, title } of pages) {
    test(`${path} has title, description, and canonical`, async ({ page }) => {
      await page.goto(path)

      // Title
      await expect(page).toHaveTitle(title)

      // Meta description
      const description = page.locator('meta[name="description"]')
      await expect(description).toHaveAttribute('content', /.{10,}/)

      // OG tags
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/)
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', /.+/)
    })
  }

  test('sitemap.xml is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
    const body = await page.content()
    expect(body).toContain('blooming-group.eu')
  })

  test('robots.txt is accessible and blocks /api/', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    expect(response?.status()).toBe(200)
    const body = await page.content()
    expect(body).toContain('Disallow: /api/')
  })

  test('security.txt is accessible', async ({ page }) => {
    const response = await page.goto('/.well-known/security.txt')
    expect(response?.status()).toBe(200)
  })

  test('homepage has Organization JSON-LD', async ({ page }) => {
    await page.goto('/')
    const scripts = page.locator('script[type="application/ld+json"]')
    const count = await scripts.count()
    expect(count).toBeGreaterThanOrEqual(1)

    let hasOrg = false
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).innerHTML()
      const data = JSON.parse(content)
      if (data['@type'] === 'Organization') hasOrg = true
    }
    expect(hasOrg).toBe(true)
  })

  test('services page has ItemList JSON-LD', async ({ page }) => {
    await page.goto('/services')
    const scripts = page.locator('script[type="application/ld+json"]')

    let hasItemList = false
    const count = await scripts.count()
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).innerHTML()
      const data = JSON.parse(content)
      if (data['@type'] === 'ItemList') hasItemList = true
    }
    expect(hasItemList).toBe(true)
  })
})
