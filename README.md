# 🌆 Cyberpunk Portfolio - Siddartha Yadav

A retro cyberpunk-themed portfolio website built with cutting-edge web technologies, featuring stunning animations and a futuristic aesthetic.

## 🚀 Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Modern CSS** - Custom cyberpunk effects (scanlines, CRT, glitch, neon glows)

## ✨ Features

- 🎨 **Retro Cyberpunk Design** - Old-school terminal aesthetics with modern flair
- ⚡ **Smooth Animations** - Page transitions and scroll-based reveals using Framer Motion
- 📱 **Fully Responsive** - Optimized for all screen sizes
- 🌈 **Neon Effects** - Custom CSS animations with cyan, pink, purple, and green neon glows
- 🖥️ **CRT Screen Effect** - Authentic retro monitor simulation with scanlines
- 💫 **Interactive Elements** - Hover effects, glitch animations, and dynamic content
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML
- 🌓 **Light/Dark Mode** - Toggle between cyberpunk dark and clean light themes
- 🎵 **Background Music** - Optional looping background music with controls

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 🏗️ Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles & cyberpunk effects
│   └── components/
│       ├── Header.tsx      # Navigation header
│       ├── Hero.tsx        # Landing section with typing animation
│       ├── About.tsx       # About me & education
│       ├── Experience.tsx  # Work experience timeline
│       ├── Skills.tsx      # Skills matrix & certifications
│       ├── Projects.tsx    # Featured projects & publications
│       ├── Contact.tsx     # Contact form & information
│       └── Footer.tsx      # Footer with links
├── public/                 # Static assets
└── package.json           # Dependencies
```

## 🎨 Customization

### Colors
The cyberpunk color scheme is defined in `src/app/globals.css`:
- `--neon-cyan`: Main accent color
- `--neon-pink`: Secondary accent
- `--neon-purple`: Tertiary accent
- `--neon-green`: Success/highlight color

### Content
Update your personal information in the component files:
- **Personal Info**: `src/components/Hero.tsx`, `src/components/About.tsx`
- **Experience**: `src/components/Experience.tsx`
- **Skills**: `src/components/Skills.tsx`
- **Projects**: `src/components/Projects.tsx`
- **Contact**: `src/components/Contact.tsx`

### Effects
Cyberpunk effects can be customized in `src/app/globals.css`:
- Scanline density and opacity
- CRT flicker speed
- Glitch animation intensity
- Neon glow spread and blur

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production
```bash
npm run build
npm start
```

## 📝 To-Do for Production

- [ ] Add your background music file (see `MUSIC_SETUP.md`)
- [ ] Replace contact form with actual backend (currently uses placeholder alert)
- [ ] Connect contact form to email service (e.g., EmailJS, SendGrid)
- [ ] Add Google Analytics or similar tracking
- [ ] Add more projects as you complete them
- [ ] Test light mode and adjust colors if needed

## 🤝 Contact

- **Email**: officialsiddartha@gmail.com
- **LinkedIn**: [linkedin.com/in/thississid](https://linkedin.com/in/thississid)
- **GitHub**: [github.com/thississid](https://github.com/thississid)
- **Phone**: +91 9032424033

---

**Built with ❤️ using Next.js, TypeScript, and Framer Motion**

*Embrace the cyberpunk aesthetic. Welcome to the future.*

