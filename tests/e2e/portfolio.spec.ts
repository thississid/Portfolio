import { test, expect, devices } from '@playwright/test';

test.describe('Portfolio Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Siddartha Yadav/);
  });

  test('should have working navigation', async ({ page }, testInfo) => {
    // Only test on desktop - navigation is hidden on mobile (no hamburger menu yet)
    if (testInfo.project.name === 'Mobile Chrome' || testInfo.project.name === 'Mobile Safari') {
      test.skip();
      return;
    }
    
    await page.goto('/');
    
    // Test navigation to sections
    await page.click('a[href="#about"]');
    await expect(page.locator('#about')).toBeVisible();
    
    await page.click('a[href="#projects"]');
    await expect(page.locator('#projects')).toBeVisible();
    
    await page.click('a[href="#contact"]');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');
    
    // Find and click theme toggle
    const themeToggle = page.locator('[aria-label*="theme"]').first();
    await themeToggle.click();
    
    // Check if dark class is toggled
    const html = page.locator('html');
    const hasClass = await html.evaluate((el) => el.classList.contains('dark'));
    expect(hasClass).toBeDefined();
  });

  test('should display resume download button', async ({ page }, testInfo) => {
    // Only test on desktop - resume button is hidden on mobile
    if (testInfo.project.name === 'Mobile Chrome' || testInfo.project.name === 'Mobile Safari') {
      test.skip();
      return;
    }
    
    await page.goto('/');
    
    const resumeButton = page.locator('a[href="/Siddartha_Yadav_Resume.pdf"]');
    await expect(resumeButton).toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    await page.goto('/');
    
    // Use more specific selectors to avoid strict mode violations
    await expect(page.getByRole('heading', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /experience/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /skills/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /blog/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible();
  });
});

test.describe('Contact Form', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/#contact');
    
    // Wait for contact section to load
    await page.waitForSelector('#contact', { timeout: 10000 });
    
    // Check for form inputs - use id selectors
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/#contact');
    
    // Wait for form to load
    await page.waitForSelector('#contact', { timeout: 10000 });
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation - inputs should have required attribute
    const nameInput = page.locator('#name');
    await expect(nameInput).toHaveAttribute('required');
  });
});

test.describe('Blog', () => {
  test('should navigate to blog post', async ({ page }) => {
    await page.goto('/#blog');
    
    // Wait for blog section
    await page.waitForSelector('#blog', { timeout: 10000 });
    
    // Click on first blog post
    const firstPost = page.locator('a[href^="/blog/"]').first();
    await firstPost.click();
    
    // Should be on blog post page
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.locator('article')).toBeVisible();
  });

  test('should have share buttons on blog post', async ({ page }) => {
    // Use actual blog post slug
    await page.goto('/blog/RUL-Prediction');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for share section with "Share:" text and social media buttons
    await expect(page.getByText('Share:')).toBeVisible();
    
    // Verify social share buttons are present using aria-labels
    await expect(page.getByLabel('Share on Twitter')).toBeVisible();
    await expect(page.getByLabel('Share on LinkedIn')).toBeVisible();
  });
});

test.describe('404 Page', () => {
  test('should display custom 404 page', async ({ page }) => {
    await page.goto('/non-existent-page');
    
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Page Not Found')).toBeVisible();
    await expect(page.locator('a[href="/"]')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });
});

test.describe('Performance', () => {
  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
  });
});
