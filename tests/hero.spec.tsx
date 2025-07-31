import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import Hero from '../src/components/Hero'
import { BrowserRouter } from 'react-router'
import { FileText, Search, ArrowRight } from 'lucide-react'

const BASE_URL = 'http://localhost:5173'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
)

test.describe('Hero Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL)
    })

    test('renders the hero section with all elements', async ({ mount }) => {
        const component = await mount(
            <TestWrapper>
                <Hero />
            </TestWrapper>
        )

        await expect(
            component.getByRole('heading', { name: /Text Comparator/i })
        ).toBeVisible()
        await expect(
            component.getByText(
                /Compare, analyze, and find differences between texts with ease/i
            )
        ).toBeVisible()

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

        for (const feature of features) {
            await expect(component.getByText(feature.title)).toBeVisible()
            await expect(component.getByText(feature.description)).toBeVisible()
        }

        const getStartedButton = component.getByRole('button', {
            name: /Get Started/i,
        })
        await expect(getStartedButton).toBeVisible()
        await expect(getStartedButton).toHaveText('Get Started')
    })

    test('displays correct icons for each feature card', async ({ mount }) => {
        const component = await mount(
            <TestWrapper>
                <Hero />
            </TestWrapper>
        )

        const featureIcons = [
            { title: 'Text Comparison', icon: FileText },
            { title: 'Smart Analysis', icon: Search },
            { title: 'Quick Results', icon: ArrowRight },
        ]

        for (const feature of featureIcons) {
            const card = component
                .getByText(feature.title)
                .locator('..')
                .locator('..')
            await expect(
                card.locator(
                    `svg[data-testid="${feature.title
                        .toLowerCase()
                        .replace(' ', '-')}-icon"]`
                )
            ).toBeVisible()
        }
    })

    test('navigates to home page when Get Started is clicked', async ({
        mount,
        page,
    }) => {
        const component = await mount(
            <TestWrapper>
                <Hero />
            </TestWrapper>
        )

        await component.getByRole('button', { name: /Get Started/i }).click()

        await expect(page).toHaveURL(/\/home/)
    })

    test('toggles between dark and light mode', async ({ mount }) => {
        const component = await mount(
            <TestWrapper>
                <Hero />
            </TestWrapper>
        )

        const themeButton = component.getByRole('button', {
            name: /Switch to (dark|light) mode/i,
        })

        const initialTheme = await themeButton.getAttribute('aria-label')

        await themeButton.click()

        const newTheme = await themeButton.getAttribute('aria-label')
        expect(newTheme).not.toBe(initialTheme)

        await themeButton.click()
        expect(await themeButton.getAttribute('aria-label')).toBe(initialTheme)
    })

    test('has proper accessibility attributes', async ({ mount }) => {
        const component = await mount(
            <TestWrapper>
                <Hero />
            </TestWrapper>
        )

        const themeButton = component.getByRole('button', {
            name: /Switch to (dark|light) mode/i,
        })

        await expect(themeButton).toHaveAttribute(
            'aria-label',
            /Switch to (dark|light) mode/i
        )

        const getStartedButton = component.getByRole('button', {
            name: /Get Started/i,
        })
        await expect(getStartedButton).toHaveAttribute('type', 'button')
    })

    test('has correct visual hierarchy', async ({ mount }) => {
        const component = await mount(
            <TestWrapper>
                <Hero />
            </TestWrapper>
        )

        const heading = component.getByRole('heading', { level: 1 })
        await expect(heading).toHaveText('Text Comparator')

        const featureCards = component.locator('[class*="grid"] > *')
        await expect(featureCards).toHaveCount(3)

        for (let i = 0; i < 3; i++) {
            const card = featureCards.nth(i)
            await expect(card.locator('h3')).toBeVisible()
            await expect(card.locator('p')).toBeVisible()
        }
    })
})
