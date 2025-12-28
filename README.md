# Portfolio - Gundelly Siddartha Yadav

A modern, high-performance portfolio website with a retro cyber AI/ML theme, showcasing full-stack development expertise and AI/ML specialization.

[![Performance](https://img.shields.io/badge/Performance-90+-brightgreen)](https://pagespeed.web.dev/)
[![Accessibility](https://img.shields.io/badge/Accessibility-95+-brightgreen)](https://www.w3.org/WAI/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **Retro Cyber Theme** - Neural network animations and AI/ML aesthetic
- ⚡ **Performance Optimized** - 90+ Lighthouse score with advanced optimizations
- 🎭 **Smooth Animations** - Framer Motion with reduced motion support
- 📱 **Fully Responsive** - Mobile-first design with touch-optimized interactions
- ♿ **Accessible** - WCAG 2.1 AA compliant with 95+ accessibility score
- 🔒 **Secure** - CSP headers, XSS protection, and security best practices
- 🌙 **Dark/Light Mode** - Persistent theme with system preference detection
- 📊 **Analytics** - Vercel Analytics integration
- 🔍 **SEO Optimized** - Perfect 100 SEO score with structured data
- 📝 **MDX Blog** - Built-in blog with syntax highlighting
- 📧 **Contact Forms** - Enhanced contact with file attachments
- 📅 **Meeting Scheduler** - Calendly integration

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Additional
- **Content**: [MDX](https://mdxjs.com/) with syntax highlighting
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Monitoring**: [Sentry](https://sentry.io/)
- **Email**: [Resend](https://resend.com/)
- **Testing**: Jest, Playwright, React Testing Library
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/thississid/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Required environment variables:
```env
# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Sentry (Optional)
SENTRY_AUTH_TOKEN=your_sentry_token
```

4. **Run development server**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Testing
```bash
npm test             # Run unit tests
npm run test:watch   # Run unit tests in watch mode
npm run test:coverage # Generate coverage report
npm run test:e2e     # Run E2E tests with Playwright
npm run test:e2e:ui  # Run E2E tests in UI mode
```

See [TESTING.md](./Docs/TESTING.md) for comprehensive testing documentation.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── blog/           # Blog pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   └── providers/      # Context providers
│   ├── content/            # MDX blog posts
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   └── lib/                # Utility functions
├── tests/                   # All tests
│   ├── unit/               # Jest unit tests
│   └── e2e/                # Playwright E2E tests
├── public/                  # Static assets
├── Docs/                    # Documentation
└── [config files]          # Configuration files
```

## 🎨 Customization

### Update Personal Information

1. **Content Files**
   - Update bio in `src/components/About.tsx`
   - Modify skills in `src/components/Skills.tsx`
   - Add projects in `src/components/Projects.tsx`

2. **Contact Information**
   - Email: `src/components/Contact.tsx`
   - Social links: `src/components/Header.tsx` and `Footer.tsx`

3. **Resume**
   - Replace `public/Siddartha_Yadav_Resume.pdf` with your resume

### Theme Customization

Edit color variables in `src/app/globals.css`:
```css
:root {
  --neon-cyan: 14 165 233;
  --neon-green: 34 197 94;
  --neon-purple: 147 51 234;
  /* ... more colors */
}
```

## 📊 Performance

Current Lighthouse scores (Mobile):
- **Performance**: 87-90
- **Accessibility**: 95+
- **Best Practices**: 96+
- **SEO**: 100

### Optimizations Implemented
- ✅ Code splitting with dynamic imports
- ✅ Image optimization (AVIF/WebP)
- ✅ Resource preconnect hints
- ✅ Reduced animation complexity
- ✅ Tree-shaking for framer-motion
- ✅ Production source maps
- ✅ Lazy loading for heavy components
- ✅ CSP and security headers

## 🧪 Testing

Comprehensive testing setup with 95%+ code coverage:
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright (5 browsers including mobile)
- **Performance Tests**: Lighthouse CI

See [TESTING.md](./Docs/TESTING.md) for detailed testing guide.

## 📚 Documentation

- [Testing Guide](./Docs/TESTING.md) - Complete testing documentation
- [Implementation Guide](./Docs/IMPLEMENTATION_GUIDE.md) - Technical implementation details
- [Deployment Checklist](./Docs/DEPLOYMENT_CHECKLIST.md) - Pre-deployment checklist
- [Changes Summary](./Docs/CHANGES_SUMMARY.md) - Recent changes and updates
- [Quick Reference](./Docs/QUICK_REFERENCE.md) - Common tasks and snippets

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project in Vercel dashboard
   - Connect to GitHub repository

2. **Configure Environment Variables**
   - Add all required env vars from `.env.local`

3. **Deploy**
   - Automatic deployments on push to main
   - Preview deployments for pull requests

### Other Platforms

Works with any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Gundelly Siddartha Yadav**
- Website: [sid-port-pi.vercel.app](https://sid-port-pi.vercel.app)
- GitHub: [@thississid](https://github.com/thississid)
- LinkedIn: [thississid](https://linkedin.com/in/thississid)
- Email: officialsiddartha@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and analytics
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

<div align="center">
Made with ❤️ and lots of ☕
</div>

