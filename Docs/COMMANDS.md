# Development Commands

Quick reference for common development tasks.

## Development Server

```bash
# Start development server (port 3000)
npm run dev

# Start on custom port
PORT=3001 npm run dev
```

## Building & Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Analyze bundle size
npm run build && npx @next/bundle-analyzer
```

## Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint -- --fix

# Type checking
npx tsc --noEmit
```

## Testing

See [TESTING.md](./TESTING.md) for comprehensive testing guide.

```bash
# Unit tests
npm test
npm run test:watch
npm run test:coverage

# E2E tests
npm run test:e2e
npm run test:e2e:ui
```

## Clean Up

```bash
# Clear Next.js cache
rm -rf .next

# Clear all caches and reinstall
rm -rf .next node_modules package-lock.json
npm install

# Clear Jest cache
npx jest --clearCache

# Clear Playwright cache
npx playwright cache clear
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature

# Update from main
git checkout main
git pull origin main
git checkout feature/your-feature
git rebase main
```

## Deployment

```bash
# Deploy to Vercel (if Vercel CLI installed)
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel inspect [deployment-url]
```

## Environment Variables

```bash
# Copy example env file
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

## Database/Content

```bash
# Add new blog post
# 1. Create MDX file in src/content/blog/
# 2. Follow naming: post-slug.mdx
# 3. Add frontmatter (title, date, description, tags)

# Generate new blog post template
echo '---
title: "Post Title"
date: "2025-12-28"
description: "Post description"
tags: ["tag1", "tag2"]
---

# Your content here' > src/content/blog/new-post.mdx
```

## Performance Analysis

```bash
# Run Lighthouse
npx lighthouse http://localhost:3000 --view

# Check bundle size
npm run build
npx next-bundle-analyzer

# Profile production build
NODE_ENV=production npm run build
```

## Troubleshooting

```bash
# If port 3000 is in use
lsof -ti:3000 | xargs kill -9

# If module not found errors
rm -rf node_modules package-lock.json
npm install

# If TypeScript errors
npx tsc --noEmit

# If build fails
rm -rf .next
npm run build
```
