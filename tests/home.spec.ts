import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Should have correct title and main heading', async ({ page }) => {
    await expect(page).toHaveTitle(
      'Text Comparator - Compare and Find Differences in Texts Online'
    )
    await expect(
      page.getByRole('heading', { name: 'Text Comparator' })
    ).toBeVisible()
  })

  test('Should display feature cards with correct content', async ({
    page,
  }) => {
    const features = [
      {
        title: 'Text Comparison',
        description: 'Easily compare two texts side by side',
      },
      {
        title: 'Smart Analysis',
        description: 'Find differences and similarities',
      },
      { title: 'Quick Results', description: 'Get instant comparison results' },
    ]

    const cards = page.locator('section .grid > .group')
    await expect(cards).toHaveCount(3)

    for (let i = 0; i < features.length; i++) {
      const card = cards.nth(i)
      await expect(card).toContainText(features[i].title)
      await expect(card).toContainText(features[i].description)
    }
  })

  test('Should navigate to home page when Get Started button is clicked', async ({
    page,
  }) => {
    const getStartedButton = page.getByRole('button', { name: 'Get Started' })
    await expect(getStartedButton).toBeVisible()

    await getStartedButton.click()
    await expect(page).toHaveURL('http://localhost:5173/home')
  })

  test('Should toggle between dark and light mode', async ({ page }) => {
    const themeToggle = page.getByRole('button', {
      name: /Switch to (dark|light) mode/,
    })

    await expect(themeToggle).toBeVisible()
    await expect(themeToggle).toHaveAttribute(
      'aria-label',
      'Switch to dark mode'
    )

    await themeToggle.click()
    await expect(themeToggle).toHaveAttribute(
      'aria-label',
      'Switch to light mode'
    )

    await themeToggle.click()
    await expect(themeToggle).toHaveAttribute(
      'aria-label',
      'Switch to dark mode'
    )
  })

  test('Should display logo and tagline', async ({ page }) => {
    const logo = page.locator('svg[class*="text-foreground"]')
    await expect(logo).toBeVisible()

    const tagline = page.getByText(
      'Compare, analyze, and find differences between texts with ease'
    )
    await expect(tagline).toBeVisible()
  })
})
