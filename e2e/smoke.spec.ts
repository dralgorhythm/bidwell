import { expect, test } from '@playwright/test'

test.describe('Critical User Flows', () => {
  test('home page smoke test', async ({ page }) => {
    // 1. Visit Home Page
    await page.goto('/')
    await expect(page).toHaveTitle(/Bidwell Consulting/)
  })

  test('blog navigation flow', async ({ page }) => {
    // 1. Visit Home Page
    await page.goto('/')

    // 2. Navigation to Blog
    await page.getByRole('link', { name: 'blog' }).click()
    await expect(page).toHaveURL(/blog/)

    // 3. Verify Blog page loads
    await expect(page).toHaveTitle(/Blog/)
  })

  test('experiments hub navigation flow', async ({ page }) => {
    // 1. Visit Home Page
    await page.goto('/')

    // 2. Navigate to Experiments Hub
    await page.getByRole('link', { name: 'experiments' }).click()
    await expect(page).toHaveURL(/experiments/)

    // 3. Verify Experiments Hub loads
    await expect(page.getByRole('heading', { level: 1, name: /experiments/i })).toBeVisible()

    // 4. Verify experiment cards are displayed
    await expect(page.getByText('Sample Experiment')).toBeVisible()
  })

  test('experiment navigation flow', async ({ page }) => {
    // 1. Navigate to Experiments Hub
    await page.goto('/experiments')

    // 2. Click on Sample Experiment
    await page.getByRole('link', { name: /sample experiment/i }).click()
    await expect(page).toHaveURL(/experiments\/sample/)

    // 3. Verify Sample Experiment page loads with full-width layout
    await expect(page.getByRole('heading', { level: 1, name: /full-width layouts/i })).toBeVisible()

    // 4. Verify the back link works
    await page.getByRole('link', { name: /back to experiments hub/i }).click()
    await expect(page).toHaveURL(/experiments/)
  })

  test('experiments have independent layout', async ({ page }) => {
    // 1. Navigate to Sample Experiment
    await page.goto('/experiments/sample')

    // 2. Verify the experiment page has the wide layout header
    await expect(page.getByRole('link', { name: 'Bidwell Consulting' })).toBeVisible()

    // 3. Verify back links to experiments are present (header and footer)
    const backLinks = page.getByRole('link', { name: /back to experiments/i })
    await expect(backLinks).toHaveCount(2)
  })
})
