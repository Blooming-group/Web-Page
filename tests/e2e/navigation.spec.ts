import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('header links navigate to correct pages', async ({ page }) => {
    await page.goto('/')

    // Services
    await page.getByRole('navigation').getByRole('link', { name: 'Services' }).click()
    await expect(page).toHaveURL('/services')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // About
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL('/about')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // Contact
    await page.getByRole('navigation').getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL('/contact')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('wordmark links back to homepage', async ({ page }) => {
    await page.goto('/about')
    await page
      .getByRole('link', { name: /blooming/i })
      .first()
      .click()
    await expect(page).toHaveURL('/')
  })

  test('footer privacy link works', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Privacy Policy' }).click()
    await expect(page).toHaveURL('/privacy')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy')
  })

  test('404 page renders for unknown routes', async ({ page }) => {
    await page.goto('/this-does-not-exist')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("doesn't exist")
    // Should offer navigation back
    await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible()
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    // Menu should be closed initially
    const mobileNav = page.getByRole('dialog')
    await expect(mobileNav).not.toBeVisible()

    // Open menu
    await page.getByRole('button', { name: /menu/i }).click()
    await expect(mobileNav).toBeVisible()

    // Close menu
    await page.getByRole('button', { name: /close/i }).click()
    await expect(mobileNav).not.toBeVisible()
  })
})
