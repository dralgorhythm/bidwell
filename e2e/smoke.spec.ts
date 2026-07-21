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
    await expect(page.getByText('Claude Agentic Framework')).toBeVisible()
  })

  test('agentic framework experiment flow', async ({ page }) => {
    // 1. Navigate to Experiments Hub
    await page.goto('/experiments')

    // 2. Click on the Claude Agentic Framework experiment
    await page.getByRole('link', { name: /claude agentic framework/i }).click()
    await expect(page).toHaveURL(/experiments\/claude-agentic-framework/)

    // 3. Verify the page loads with its hero and GitHub link
    await expect(
      page.getByRole('heading', { level: 1, name: /claude agentic framework/i })
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'View on GitHub' })).toBeVisible()

    // 4. Verify back links to the hub are present (header and footer)
    const backLinks = page.getByRole('link', { name: /back to experiments/i })
    await expect(backLinks).toHaveCount(2)

    // 5. Verify the back link works
    await backLinks.first().click()
    await expect(page).toHaveURL(/\/experiments$/)
  })

  test('experiments have independent layout', async ({ page }) => {
    // 1. Navigate to the Claude Agentic Framework experiment
    await page.goto('/experiments/claude-agentic-framework')

    // 2. Verify the experiment page has the wide layout header
    await expect(page.getByRole('link', { name: 'Bidwell Consulting' })).toBeVisible()

    // 3. Verify back links to experiments are present (header and footer)
    const backLinks = page.getByRole('link', { name: /back to experiments/i })
    await expect(backLinks).toHaveCount(2)
  })
})
