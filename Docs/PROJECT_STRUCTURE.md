# Portfolio Project Structure

## Overview

Clean, organized structure following Next.js 14 App Router best practices.

## Directory Structure

```
portfolio/
│
├── 📁 src/                          # Source code
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── 📁 api/                  # API Routes
│   │   │   ├── admin/               # Admin APIs
│   │   │   ├── contact/             # Contact form endpoint
│   │   │   ├── contact-enhanced/    # Enhanced contact with attachments
│   │   │   └── views/               # Page view counter
│   │   ├── 📁 blog/                 # Blog pages
│   │   │   └── [slug]/              # Dynamic blog post routes
│   │   ├── 📁 admin/                # Admin panel
│   │   ├── 📁 offline/              # Offline fallback page
│   │   ├── globals.css              # Global styles & animations
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage
│   │   ├── not-found.tsx            # 404 page
│   │   ├── global-error.tsx         # Global error handler
│   │   ├── manifest.ts              # PWA manifest
│   │   └── sitemap.ts               # Sitemap generator
│   │
│   ├── 📁 components/               # React components
│   │   ├── About.tsx                # About section
│   │   ├── Blog.tsx                 # Blog listing
│   │   ├── Certifications.tsx       # Certifications carousel
│   │   ├── Contact.tsx              # Basic contact section
│   │   ├── ContactEnhanced.tsx      # Enhanced contact with Calendly
│   │   ├── Experience.tsx           # Work experience timeline
│   │   ├── Footer.tsx               # Footer component
│   │   ├── Header.tsx               # Navigation header
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── Projects.tsx             # Projects showcase
│   │   ├── Publications.tsx         # Research publications
│   │   ├── ServiceWorkerRegistration.tsx  # PWA service worker
│   │   ├── Skills.tsx               # Skills visualization
│   │   │
│   │   ├── 📁 providers/            # React Context Providers
│   │   │   └── Providers.tsx        # Combined providers wrapper
│   │   │
│   │   └── 📁 ui/                   # Reusable UI components
│   │       ├── Card.tsx             # Card wrapper
│   │       ├── Container.tsx        # Container wrapper
│   │       ├── CustomCursor.tsx     # Custom cursor effect
│   │       ├── EnhancedButton.tsx   # Styled button component
│   │       ├── InteractiveNeuralNetwork.tsx  # Neural network animation
│   │       ├── LanguageSwitcher.tsx # Language selection (future)
│   │       ├── LoadingScreen.tsx    # Loading spinner
│   │       ├── MatrixRain.tsx       # Matrix rain effect
│   │       ├── OptimizedImage.tsx   # Image with blur placeholder
│   │       ├── ScrollProgress.tsx   # Reading progress bar
│   │       ├── Section.tsx          # Section wrapper
│   │       ├── SectionTitle.tsx     # Styled section titles
│   │       ├── ShareButtons.tsx     # Social share buttons
│   │       ├── ShootingStars.tsx    # Shooting stars animation
│   │       ├── TechModal.tsx        # Technology details modal
│   │       ├── ThemeToggle.tsx      # Dark/light mode toggle
│   │       └── ViewCounter.tsx      # Page view counter
│   │
│   ├── 📁 content/                  # MDX Content
│   │   └── blog/                    # Blog posts (MDX)
│   │       └── *.mdx                # Individual blog posts
│   │
│   ├── 📁 contexts/                 # React Contexts
│   │   └── ThemeContext.tsx         # Theme state management
│   │
│   ├── 📁 hooks/                    # Custom React Hooks
│   │   └── useInView.ts             # Intersection observer hook
│   │
│   ├── 📁 lib/                      # Utility libraries
│   │   ├── blog.ts                  # Blog post utilities
│   │   ├── image-optimization.ts    # Image blur placeholder
│   │   ├── structured-data.ts       # SEO structured data
│   │   └── i18n/                    # Internationalization (future)
│   │
│   ├── instrumentation.ts           # Server instrumentation
│   ├── instrumentation-client.ts    # Client instrumentation
│   └── middleware.ts                # Next.js middleware
│
├── 📁 tests/                        # All tests (centralized)
│   ├── unit/                        # Jest unit tests
│   │   └── *.test.tsx              # Component unit tests
│   └── e2e/                         # Playwright E2E tests
│       └── portfolio.spec.ts        # E2E test suite
│
├── 📁 public/                       # Static assets
│   ├── robots.txt                   # SEO robots file
│   ├── sw.js                        # Service worker
│   ├── icon.svg                     # Favicon
│   ├── apple-icon.svg               # Apple touch icon
│   └── Siddartha_Yadav_Resume.pdf  # Resume PDF
│
├── 📁 Docs/                         # Documentation
│   ├── TESTING.md                   # Testing guide
│   ├── COMMANDS.md                  # Common commands
│   ├── IMPLEMENTATION_GUIDE.md      # Technical details
│   ├── DEPLOYMENT_CHECKLIST.md      # Pre-deployment checklist
│   ├── CHANGES_SUMMARY.md           # Recent changes
│   └── QUICK_REFERENCE.md           # Quick reference
│
├── 📁 Configuration Files
│   ├── .gitignore                   # Git ignore rules
│   ├── .eslintrc.json              # ESLint configuration
│   ├── jest.config.js              # Jest configuration
│   ├── jest.setup.js               # Jest setup
│   ├── next.config.mjs             # Next.js configuration
│   ├── playwright.config.ts        # Playwright configuration
│   ├── postcss.config.mjs          # PostCSS configuration
│   ├── tailwind.config.ts          # Tailwind configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── package.json                # Dependencies & scripts
│   └── README.md                   # Project documentation
│
└── 📁 Generated/Build (gitignored)
    ├── .next/                       # Next.js build output
    ├── node_modules/                # Dependencies
    ├── playwright-report/           # Test reports
    ├── test-results/                # Test artifacts
    └── coverage/                    # Test coverage reports
```

## Key Conventions

### Naming
- **Components**: PascalCase (e.g., `Header.tsx`)
- **Utilities**: camelCase (e.g., `blog.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useInView.ts`)
- **Types**: PascalCase (e.g., `BlogPost`, `Project`)

### File Organization
- One component per file
- Co-locate related components in folders when needed
- Shared utilities in `lib/`
- Reusable UI in `components/ui/`

### Import Aliases
```typescript
import Component from '@/components/Component';
import { utility } from '@/lib/utility';
import type { Type } from '@/types';
```

### Test Organization
- Unit tests: `tests/unit/*.test.tsx`
- E2E tests: `tests/e2e/*.spec.ts`
- Test utilities: `tests/utils/`
- Test fixtures: `tests/fixtures/`

## Best Practices

1. **Components**
   - Keep components small and focused
   - Use TypeScript for type safety
   - Extract reusable logic into hooks
   - Use proper semantic HTML

2. **Styling**
   - Use Tailwind utility classes
   - Define custom colors in globals.css
   - Use CSS variables for theming
   - Ensure responsive design

3. **Performance**
   - Use dynamic imports for heavy components
   - Optimize images with next/image
   - Lazy load below-the-fold content
   - Minimize client-side JavaScript

4. **Testing**
   - Test user interactions, not implementation
   - Maintain high coverage (>80%)
   - Test across browsers and viewports
   - Run tests before deploying

5. **Documentation**
   - Document complex logic
   - Keep README updated
   - Add JSDoc comments for utilities
   - Maintain changelog

## Environment Variables

Required `.env.local` variables:
```env
RESEND_API_KEY=          # Email service
SENTRY_AUTH_TOKEN=       # Error monitoring (optional)
NEXT_PUBLIC_*=           # Public client-side vars
```

## Scripts

See [COMMANDS.md](./COMMANDS.md) for complete command reference.

```bash
npm run dev              # Development server
npm run build            # Production build
npm test                 # Unit tests
npm run test:e2e         # E2E tests
npm run lint             # Linting
```
