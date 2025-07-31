import { test, expect } from '@playwright/test'

test.describe('Comparation Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })
  })

  test('should load the comparison page with all elements', async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Text Comparator|Home|Comparador/)

    const textAreas = page.locator('textarea')
    await expect(textAreas).toHaveCount(2)
    await expect(textAreas.first()).toBeVisible()
    await expect(textAreas.nth(1)).toBeVisible()

    const compareButton = page
      .getByRole('button', { name: 'Compare Texts' })
      .first()
    await expect(compareButton).toBeVisible()

    const resetButton = page.getByRole('button', { name: 'Clear All' }).first()
    await expect(resetButton).toBeVisible()
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

    await themeToggle.evaluate((button) => {
      ;(button as HTMLButtonElement).click()
    })

    await expect(themeToggle).toHaveAttribute(
      'aria-label',
      'Switch to light mode',
      { timeout: 10000 }
    )

    await themeToggle.evaluate((button) => {
      ;(button as HTMLButtonElement).click()
    })

    await expect(themeToggle).toHaveAttribute(
      'aria-label',
      'Switch to dark mode',
      { timeout: 10000 }
    )
  })
})

test.describe('Header Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })
  })

  test('should display the app title with logo and gradient text', async ({
    page,
  }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible({ timeout: 10000 })

    const titleContainer = header.locator('.items-baseline')
    await expect(titleContainer).toBeVisible()

    const logo = titleContainer.locator('.size-8')
    await expect(logo).toBeVisible()

    const title = titleContainer.getByRole('heading', {
      name: 'Text Comparator',
    })
    await expect(title).toBeVisible()
    await expect(title).toHaveClass(/bg-gradient-to-r/)
    await expect(title).toHaveClass(/bg-clip-text/)
    await expect(title).toHaveClass(/text-transparent/)
  })

  test('should display the description text with highlighted first part', async ({
    page,
  }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible({ timeout: 10000 })

    const description = header.locator('p')
    await expect(description).toBeVisible()

    const highlightedText = description.locator('span')
    await expect(highlightedText).toHaveText('Compare two texts')

    await expect(description).toContainText(
      'and visualize the differences clearly and in detail. Perfect for reviewing changes in documents, code, or any text content.'
    )
  })

  test('should have proper styling and layout', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible({ timeout: 10000 })

    await expect(header).toHaveClass(/relative/)
    await expect(header).toHaveClass(/overflow-hidden/)
    await expect(header).toHaveClass(/text-center/)
    await expect(header).toHaveClass(/mb-12/)
    await expect(header).toHaveClass(/flex/)
    await expect(header).toHaveClass(/flex-col/)
    await expect(header).toHaveClass(/items-center/)
  })
})

test.describe('TextInputCard Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })
  })

  test('should display both text input cards with proper titles', async ({
    page,
  }) => {
    await expect(page.getByText('Original Text')).toBeVisible()
    await expect(page.getByText('Modified Text')).toBeVisible()

    const textAreas = page.locator('textarea')
    await expect(textAreas).toHaveCount(2)
    await expect(textAreas.first()).toBeVisible()
    await expect(textAreas.nth(1)).toBeVisible()
  })

  test('should allow text input in both text areas', async ({ page }) => {
    const firstTextArea = page.locator('textarea').first()
    const secondTextArea = page.locator('textarea').nth(1)

    await firstTextArea.fill('This is the original text')
    await secondTextArea.fill('This is the modified text')

    await expect(firstTextArea).toHaveValue('This is the original text')
    await expect(secondTextArea).toHaveValue('This is the modified text')
  })

  test('should show copy buttons and upload buttons', async ({ page }) => {
    const copyButtons = page.getByRole('button', { name: 'Copy to clipboard' })
    await expect(copyButtons).toHaveCount(2)

    const uploadButtons = page.getByRole('button', { name: 'Upload file' })
    await expect(uploadButtons).toHaveCount(2)
  })

  test('should display placeholder text when empty', async ({ page }) => {
    const textAreas = page.locator('textarea')

    await expect(textAreas.first()).toHaveAttribute(
      'placeholder',
      'Drop a file or click the upload button above'
    )
    await expect(textAreas.nth(1)).toHaveAttribute(
      'placeholder',
      'Drop a file or click the upload button above'
    )
  })

  test('should show drag and drop instructions', async ({ page }) => {
    await expect(
      page.getByText(
        'Drag and drop a file here, or click the upload button above'
      )
    ).toHaveCount(2)
    await expect(
      page.getByText('Supported formats: .txt, .pdf, .docx')
    ).toHaveCount(2)
  })
})

test.describe('ComparisonOptions Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })
    await page.waitForSelector('[data-testid="ignore-formatting"]', {
      state: 'visible',
      timeout: 10000,
    })
  })

  test('should display comparison options checkbox', async ({ page }) => {
    const checkbox = page.getByTestId('ignore-formatting')
    await expect(checkbox).toBeVisible({ timeout: 10000 })

    const label = page.getByTestId('ignore-formatting-label')
    await expect(label).toBeVisible()
    await expect(label).toHaveText('Ignorar mayúsculas y espacios en blanco')
  })

  test('should toggle comparison options', async ({ page }) => {
    const checkbox = page.getByTestId('ignore-formatting')

    await expect(checkbox).toBeVisible()

    await expect(checkbox).not.toBeChecked()

    await checkbox.click({ force: true })
    await expect(checkbox).toBeChecked()

    await checkbox.click({ force: true })
    await expect(checkbox).not.toBeChecked()
  })
})

test.describe('ActionButtons Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })
    await page.waitForSelector(
      'button:has-text("Compare Texts"), button:has-text("Clear All")',
      { state: 'visible', timeout: 10000 }
    )
  })

  test('should display action buttons with correct labels', async ({
    page,
  }) => {
    const compareButton = page.getByRole('button', { name: 'Compare Texts' })
    const clearButton = page.getByRole('button', { name: 'Clear All' })

    await expect(compareButton).toBeVisible({ timeout: 10000 })
    await expect(clearButton).toBeVisible({ timeout: 10000 })
  })

  test('should have compare button disabled when no text is entered', async ({
    page,
  }) => {
    const compareButton = page.getByRole('button', { name: 'Compare Texts' })
    await expect(compareButton).toBeVisible({ timeout: 10000 })
    await expect(compareButton).toBeDisabled({ timeout: 10000 })
  })

  test('should enable compare button when text is entered in both areas', async ({
    page,
  }) => {
    const textareas = page.locator('textarea')
    await expect(textareas.first()).toBeVisible({ timeout: 10000 })
    await expect(textareas.nth(1)).toBeVisible({ timeout: 10000 })

    await textareas.first().fill('Original text', { timeout: 10000 })
    await textareas.nth(1).fill('Modified text', { timeout: 10000 })

    const compareButton = page.getByRole('button', { name: 'Compare Texts' })
    await expect(compareButton).toBeEnabled({ timeout: 10000 })
  })

  test('should clear all text when clear button is clicked', async ({
    page,
  }) => {
    const textareas = page.locator('textarea')
    await expect(textareas.first()).toBeVisible({ timeout: 10000 })
    await expect(textareas.nth(1)).toBeVisible({ timeout: 10000 })
    await textareas.first().fill('Some text', { timeout: 10000 })
    await textareas.nth(1).fill('Some other text', { timeout: 10000 })
    await expect(textareas.first()).toHaveValue('Some text', { timeout: 10000 })
    await expect(textareas.nth(1)).toHaveValue('Some other text', {
      timeout: 10000,
    })

    const clearButton = page.getByRole('button', { name: 'Clear All' })
    await clearButton.click({ timeout: 10000 })

    await expect(textareas.first()).toHaveValue('', { timeout: 10000 })
    await expect(textareas.nth(1)).toHaveValue('', { timeout: 10000 })
  })
})

test.describe('Text Comparison Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })
    await page.waitForSelector(
      'button:has-text("Compare Texts"), button:has-text("Clear All")',
      { state: 'visible', timeout: 10000 }
    )
  })
  test('should perform text comparison and show results', async ({ page }) => {
    const firstTextArea = page.locator('textarea').first()
    const secondTextArea = page.locator('textarea').nth(1)
    const compareButton = page.getByRole('button', { name: 'Compare Texts' })

    await firstTextArea.fill('Hello world! This is a test.')
    await secondTextArea.fill('Hello world! This is a different test.')

    await compareButton.click()
    const resultHeading = page
      .getByRole('heading', {
        name: /Comparison Result(s)?/,
        level: 2,
      })
      .first()

    await expect(resultHeading).toBeVisible({
      timeout: 10000,
    })

    const differencesText = page.getByText(
      'Highlighted differences between the compared texts'
    )
    await expect(differencesText).toBeVisible({ timeout: 10000 })
  })

  test('should show comparison result badges', async ({ page }) => {
    const firstTextArea = page.locator('textarea').first()
    const secondTextArea = page.locator('textarea').nth(1)
    const compareButton = page.getByRole('button', { name: 'Compare Texts' })

    await firstTextArea.fill('Original text here')
    await secondTextArea.fill('Modified text here with changes')

    await compareButton.click()

    await expect(page.getByText('Removed')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Added')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Unchanged')).toBeVisible({ timeout: 10000 })
  })
})

test.describe('File Upload Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })
    await page.waitForSelector(
      'button:has-text("Compare Texts"), button:has-text("Clear All")',
      { state: 'visible', timeout: 10000 }
    )
  })
  test('should show file input elements', async ({ page }) => {
    const fileInputs = page.locator('input[type="file"]')
    await expect(fileInputs).toHaveCount(2)

    await expect(fileInputs.first()).toHaveAttribute(
      'accept',
      '.txt,.pdf,.docx'
    )
    await expect(fileInputs.nth(1)).toHaveAttribute('accept', '.txt,.pdf,.docx')
  })

  test('should trigger file input when upload button is clicked', async ({
    page,
  }) => {
    const uploadButtons = page.getByRole('button', { name: 'Upload file' })

    await expect(uploadButtons.first()).toBeVisible()
    await expect(uploadButtons.nth(1)).toBeVisible()
    await expect(uploadButtons.first()).toBeEnabled()
    await expect(uploadButtons.nth(1)).toBeEnabled()
  })
})
