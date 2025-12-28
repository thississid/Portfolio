# Testing Guide

Complete guide for running tests in the portfolio project.

## Table of Contents
- [Unit Tests](#unit-tests)
- [End-to-End Tests](#end-to-end-tests)
- [Performance Testing](#performance-testing)
- [Test Structure](#test-structure)
- [CI/CD Integration](#cicd-integration)

---

## Unit Tests

Unit tests use **Jest** and **React Testing Library** for component testing.

### Commands

```bash
# Run all unit tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- ShareButtons.test
```

### Test Location
- **Path**: `tests/unit/`
- **Pattern**: `*.test.tsx` or `*.test.ts`

### Writing Unit Tests

Example test structure:
```typescript
import { render, screen } from '@testing-library/react';
import Component from '@/components/Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Coverage Thresholds
- Statements: 80%
- Branches: 70%
- Functions: 80%
- Lines: 80%

---

## End-to-End Tests

E2E tests use **Playwright** for browser automation testing.

### Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI mode (interactive)
npm run test:e2e:ui

# Run specific test file
npx playwright test portfolio.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests on mobile viewports
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Debug tests
npx playwright test --debug

# Show test report
npx playwright show-report
```

### Test Location
- **Path**: `tests/e2e/`
- **Pattern**: `*.spec.ts`

### Configured Browsers
- Desktop: Chrome, Firefox, Safari
- Mobile: Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)

### Writing E2E Tests

Example test structure:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Expected Title/);
  });
});
```

### Skip Tests Conditionally
```typescript
test('test name', async ({ page }, testInfo) => {
  // Skip on mobile
  if (testInfo.project.name === 'Mobile Chrome') {
    test.skip();
    return;
  }
  // Test code...
});
```

---

## Performance Testing

### Lighthouse CLI

```bash
# Run Lighthouse on localhost
npx lighthouse http://localhost:3000 --view

# Run Lighthouse on production
npx lighthouse https://your-domain.vercel.app --view

# Run Lighthouse with specific settings
npx lighthouse http://localhost:3000 \
  --preset=desktop \
  --output=html \
  --output-path=./lighthouse-report.html

# Mobile performance test
npx lighthouse http://localhost:3000 \
  --preset=mobile \
  --throttling.cpuSlowdownMultiplier=4

# Generate JSON report
npx lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-report.json
```

### Performance Budgets

Target metrics:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TBT** (Total Blocking Time): < 300ms

---

## Test Structure

```
tests/
├── unit/                    # Jest unit tests
│   └── ShareButtons.test.tsx
├── e2e/                     # Playwright E2E tests
│   └── portfolio.spec.ts
└── fixtures/                # Test data and fixtures
```

Configuration files:
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Jest setup and global test utilities
- `playwright.config.ts` - Playwright configuration

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      # Unit tests
      - run: npm ci
      - run: npm test
      
      # E2E tests
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      
      # Upload test results
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Vercel Deployment Testing

```bash
# Test production build locally
npm run build
npm start

# Then run Lighthouse
npx lighthouse http://localhost:3000 --view
```

---

## Troubleshooting

### Common Issues

**Jest tests fail with module not found**
```bash
# Clear Jest cache
npx jest --clearCache
npm test
```

**Playwright tests timeout**
```bash
# Increase timeout in playwright.config.ts
use: {
  timeout: 60000, // 60 seconds
}
```

**Tests fail on CI but pass locally**
```bash
# Run tests in CI mode
CI=true npm test
CI=true npm run test:e2e
```

### Debug Commands

```bash
# Verbose Jest output
npm test -- --verbose

# Run single test file
npm test -- ShareButtons.test.tsx

# Playwright debug mode
npx playwright test --debug

# Playwright trace viewer (after test failure)
npx playwright show-trace trace.zip
```

---

## Best Practices

### Unit Testing
- ✅ Test user interactions, not implementation details
- ✅ Use meaningful test descriptions
- ✅ Keep tests isolated and independent
- ✅ Mock external dependencies
- ✅ Aim for high coverage on critical paths

### E2E Testing
- ✅ Test user journeys, not individual components
- ✅ Use data-testid for reliable selectors when needed
- ✅ Test across different browsers and viewports
- ✅ Keep tests independent - don't rely on test order
- ✅ Use page objects for complex flows

### Performance Testing
- ✅ Test on production builds, not development
- ✅ Test on realistic network conditions (3G, 4G)
- ✅ Test on mobile and desktop
- ✅ Monitor Core Web Vitals trends
- ✅ Set performance budgets and enforce them

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Web Vitals](https://web.dev/vitals/)
