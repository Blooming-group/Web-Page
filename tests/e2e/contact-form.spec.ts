import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('shows all required form fields', async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/company/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/service/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
  })

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: /send/i }).click()
    // At least one validation error should appear
    const errors = page.locator('[role="alert"], .text-red-500, [aria-invalid="true"]')
    await expect(errors.first()).toBeVisible()
  })

  test('validates email format', async ({ page }) => {
    await page.getByLabel(/name/i).fill('Test User')
    await page.getByLabel(/company/i).fill('Test Co')
    await page.getByLabel(/email/i).fill('not-an-email')
    await page.getByRole('button', { name: /send/i }).click()
    // Email field should be invalid
    const emailField = page.getByLabel(/email/i)
    await expect(emailField).toHaveAttribute('aria-invalid', 'true')
  })

  test('submits successfully with valid data (mocked API)', async ({ page }) => {
    // Intercept the API call and return a success response
    await page.route('/api/contact', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    })

    await page.getByLabel(/name/i).fill('Ana García')
    await page.getByLabel(/company/i).fill('Empresa S.L.')
    await page.getByLabel(/email/i).fill('ana@empresa.com')
    await page.getByLabel(/service/i).selectOption({ value: 'web' })
    await page.getByLabel(/message/i).fill('Queremos trabajar con vosotros.')

    await page.getByRole('button', { name: /send/i }).click()

    // Success state should replace the form
    await expect(page.getByText(/message sent|thank you|we.ll be in touch/i)).toBeVisible({
      timeout: 5000,
    })
  })

  test('shows error state when API fails (mocked)', async ({ page }) => {
    await page.route('/api/contact', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to send message. Please try again.' }),
      })
    })

    await page.getByLabel(/name/i).fill('Ana García')
    await page.getByLabel(/company/i).fill('Empresa S.L.')
    await page.getByLabel(/email/i).fill('ana@empresa.com')
    await page.getByLabel(/service/i).selectOption({ value: 'web' })

    await page.getByRole('button', { name: /send/i }).click()

    await expect(page.getByText(/failed|error|try again/i)).toBeVisible({ timeout: 5000 })
  })
})
