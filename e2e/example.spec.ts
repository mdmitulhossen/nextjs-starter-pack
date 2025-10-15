import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should display the hero section', async ({ page }) => {
        await page.goto('/');

        // Check for main heading
        await expect(page.getByRole('heading', { name: /Frontend Starter Pack/i })).toBeVisible();

        // Check for CTA buttons
        await expect(page.getByRole('link', { name: /Get Started/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /View Examples/i })).toBeVisible();
    });

    test('should navigate to dashboard when clicking Get Started', async ({ page }) => {
        await page.goto('/');

        await page.getByRole('link', { name: /Get Started/i }).click();

        // Should redirect to signin page (since dashboard is protected)
        await expect(page).toHaveURL(/\/auth\/signin/);
    });

    test('should display features section', async ({ page }) => {
        await page.goto('/');

        // Check for features heading
        await expect(page.getByRole('heading', { name: /Features/i })).toBeVisible();

        // Check for feature cards
        await expect(page.getByText(/TanStack Query/i)).toBeVisible();
        await expect(page.getByText(/Zustand State/i)).toBeVisible();
        await expect(page.getByText(/Authentication/i)).toBeVisible();
    });
});

test.describe('Authentication', () => {
    test('should display sign-in form', async ({ page }) => {
        await page.goto('/auth/signin');

        await expect(page.getByRole('heading', { name: /Sign In/i })).toBeVisible();
        await expect(page.getByLabel(/Email/i)).toBeVisible();
        await expect(page.getByLabel(/Password/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
    });

    test('should show OAuth providers', async ({ page }) => {
        await page.goto('/auth/signin');

        await expect(page.getByRole('button', { name: /GitHub/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /Google/i })).toBeVisible();
    });
});
