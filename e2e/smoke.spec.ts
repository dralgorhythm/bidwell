import { expect, test } from '@playwright/test'

test('critical user flow smoke test', async ({ page }) => {
  // 1. Visit Home Page
  await page.goto('/')
  await expect(page).toHaveTitle(/Bidwell Consulting/)

  // 2. Navigation to Blog
  await page.getByRole('link', { name: 'blog' }).click()
  await expect(page).toHaveURL(/blog/)

  // 3. Verify Blog page loads
  // Expect a heading or some blog content
  await expect(page).toHaveTitle(/Blog/) // Assuming logic sets title to Blog or similar
})
