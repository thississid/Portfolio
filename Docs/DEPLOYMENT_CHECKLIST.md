# 🚀 Production Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

### Environment Setup
- [ ] All environment variables configured in Vercel/hosting platform
  - [ ] `RESEND_API_KEY`
  - [ ] `PERSONAL_EMAIL`
  - [ ] `NEXT_PUBLIC_SENTRY_DSN`
  - [ ] `ADMIN_USERNAME`
  - [ ] `ADMIN_PASSWORD`
  - [ ] `DATABASE_URL` (if using database for view counter)

### Configuration Updates
- [ ] Update domain in `src/app/sitemap.ts`
- [ ] Update domain in `public/robots.txt`
- [ ] Update Calendly URL in `src/components/ContactEnhanced.tsx`
- [ ] Update personal email in contact components
- [ ] Update social media links
- [ ] Update structured data with production URLs
- [ ] Update manifest.ts with production URLs
- [ ] Update service worker cache name (optional: version increment)

### Content Review
- [ ] All placeholder text replaced
- [ ] All images optimized and uploaded
- [ ] Blog posts reviewed and published
- [ ] Projects information updated
- [ ] Resume/CV updated
- [ ] Contact information verified
- [ ] About section updated
- [ ] Experience section updated
- [ ] Skills section updated

### Testing
- [ ] Run unit tests: `npm test`
- [ ] Run E2E tests: `npm run test:e2e`
- [ ] Test contact form with real email
- [ ] Test file upload functionality
- [ ] Verify Calendly integration works
- [ ] Test all internal links
- [ ] Test all external links
- [ ] Verify responsive design on mobile
- [ ] Test dark/light theme toggle
- [ ] Test language switcher (if implemented)
- [ ] Test admin dashboard access
- [ ] Verify 404 page works

### Performance
- [ ] Run Lighthouse audit (target 90+ on all metrics)
- [ ] Check bundle size: `npm run build`
- [ ] Optimize images (WebP format)
- [ ] Verify lazy loading works
- [ ] Test service worker caching
- [ ] Check Core Web Vitals
- [ ] Test offline functionality

### SEO
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Meta descriptions on all pages
- [ ] Open Graph images set
- [ ] Twitter Card meta tags verified
- [ ] Structured data validated (use Google Rich Results Test)
- [ ] Canonical URLs configured
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

### Security
- [ ] HTTPS enabled
- [ ] Admin routes protected
- [ ] API routes have rate limiting (implement if needed)
- [ ] Input validation on all forms
- [ ] File upload size limits enforced
- [ ] Environment variables not exposed
- [ ] No sensitive data in client-side code
- [ ] CORS configured properly
- [ ] Security headers configured

### Monitoring & Analytics
- [ ] Sentry configured and tested
- [ ] Verify error tracking works
- [ ] Set up Sentry alerts
- [ ] Vercel Analytics enabled (if using Vercel)
- [ ] Google Analytics configured (optional)
- [ ] Performance monitoring active
- [ ] View counter working

### Email
- [ ] Resend domain verified
- [ ] Test email delivery
- [ ] Auto-responder emails working
- [ ] Email templates formatted correctly
- [ ] Spam filters tested
- [ ] Email attachments working

### PWA
- [ ] Manifest file served correctly
- [ ] Service worker registers on HTTPS
- [ ] App installable on mobile
- [ ] Offline page accessible
- [ ] Icons at all sizes available
- [ ] Splash screen configured

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Screen reader tested
- [ ] Keyboard navigation works
- [ ] Color contrast ratios meet standards
- [ ] Alt text on all images
- [ ] ARIA labels where needed
- [ ] Focus indicators visible
- [ ] Form labels associated correctly

### Legal & Compliance
- [ ] Privacy policy added (if collecting data)
- [ ] Terms of service (if needed)
- [ ] Cookie consent (if using analytics)
- [ ] GDPR compliance (if targeting EU)
- [ ] Copyright notices

## Deployment

### Build Process
- [ ] Run production build: `npm run build`
- [ ] Fix any build warnings
- [ ] Test production build locally: `npm start`
- [ ] No console errors in production build

### Platform Setup (Vercel)
- [ ] Repository connected
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Install command: `npm install`
- [ ] Node.js version: 18.x or higher
- [ ] Environment variables added
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### Post-Deployment
- [ ] Verify site loads correctly
- [ ] Test all critical user paths
- [ ] Submit to search engines
- [ ] Test contact form in production
- [ ] Verify email delivery in production
- [ ] Check Sentry for any errors
- [ ] Monitor performance metrics
- [ ] Test from different devices
- [ ] Test from different locations
- [ ] Share with team for QA

## Maintenance

### Regular Tasks
- [ ] Monitor Sentry for errors (weekly)
- [ ] Check analytics (weekly)
- [ ] Update dependencies (monthly)
- [ ] Review and respond to contact messages (daily)
- [ ] Backup data (weekly)
- [ ] Review performance metrics (monthly)
- [ ] Update blog posts (regularly)
- [ ] Check broken links (monthly)

### Updates
- [ ] Security updates applied promptly
- [ ] Next.js version kept current
- [ ] Dependencies updated regularly
- [ ] Test after each update

## Rollback Plan

If issues occur in production:
1. Check Sentry for error details
2. Review Vercel deployment logs
3. Use Vercel instant rollback to previous version
4. Fix issues locally
5. Test thoroughly
6. Redeploy

## Success Metrics

Track these metrics post-deployment:
- Page load time < 3 seconds
- Lighthouse score > 90 on all metrics
- Error rate < 1%
- Contact form submission success rate > 95%
- Email delivery rate > 99%
- Uptime > 99.9%

## Emergency Contacts

- Vercel Support: https://vercel.com/support
- Resend Support: https://resend.com/support
- Sentry Support: https://sentry.io/support

---

✅ **All items checked?** You're ready to deploy!
