# Admin Panel Documentation

## Overview

The admin panel is a comprehensive CMS for managing your portfolio content. It includes authentication, a dynamic sidebar, and multiple management sections.

## Features

### 🎨 Enhanced UI
- **Collapsible Sidebar**: Toggle between expanded and compact views
- **Neon Glow Effects**: Active items have a beautiful glow effect
- **Responsive Design**: Works on all screen sizes
- **Smooth Transitions**: Professional animations throughout

### 🔐 Security
- **Protected Routes**: All admin routes require authentication
- **Basic Auth**: Simple HTTP Basic Authentication (can be upgraded to NextAuth, Clerk, etc.)
- **Environment Variables**: Credentials stored securely

### 📊 Dashboard
- Key metrics with real-time stats
- Recent activity feed
- Quick action buttons
- Performance overview

### 📝 Blog Management
- Create, edit, and delete blog posts
- MDX content support
- Tag management
- Draft/Published status
- Search and filter functionality

### 🚀 Project Management
- Manage portfolio projects
- Tech stack badges
- GitHub and live URL links
- Status tracking (live, in-progress, archived)

### 📈 Analytics
- Page view tracking
- Traffic source analysis
- Top pages statistics
- Performance metrics

### ✉️ Messages
- Contact form submissions
- Read/Unread status
- Star important messages
- Quick reply functionality

### ⚙️ Settings
- Site configuration
- Social media links
- Feature toggles
- Theme and language settings

## Setup

### 1. Environment Variables

Copy the `.env.example` file to `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Update the admin credentials:

\`\`\`env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
\`\`\`

### 2. Access the Admin Panel

Navigate to: `http://localhost:3000/admin`

You'll be prompted for credentials. Enter the username and password you set in `.env.local`.

## Routes

- `/admin` - Redirects to dashboard
- `/admin/dashboard` - Main dashboard with overview
- `/admin/blog-posts` - Blog post management
- `/admin/projects` - Project management
- `/admin/analytics` - Analytics and statistics
- `/admin/messages` - Contact messages
- `/admin/settings` - Site settings

## Customization

### Adding New Sections

1. Create a new page in `/src/app/admin/your-section/page.tsx`
2. Add the route to the sidebar in `/src/components/admin/AdminSidebar.tsx`:

\`\`\`typescript
const navItems = [
  // ... existing items
  { icon: '🎯', label: 'Your Section', href: '/admin/your-section' },
];
\`\`\`

### Changing Colors

The admin panel uses CSS variables for theming:
- `--neon-cyan`: Primary actions
- `--neon-purple`: Projects
- `--neon-green`: Analytics
- `--neon-pink`: Messages/Alerts

### Upgrading Authentication

For production, consider upgrading to:
- [NextAuth.js](https://next-auth.js.org/) - OAuth, JWT, sessions
- [Clerk](https://clerk.com/) - Complete user management
- [Auth0](https://auth0.com/) - Enterprise auth solution

Example with NextAuth:

\`\`\`typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "admin",
  },
});

export const config = { matcher: ["/admin/:path*"] };
\`\`\`

## Security Best Practices

1. **Never commit `.env.local`** - Contains sensitive credentials
2. **Use strong passwords** - At least 16 characters
3. **Enable HTTPS** - Always use SSL in production
4. **Regular updates** - Keep dependencies up to date
5. **Rate limiting** - Consider adding rate limiting for auth endpoints

## Integration with Backend

Currently, the admin panel uses mock data. To integrate with a real backend:

### Option 1: API Routes (Next.js)

Create API routes in `/src/app/api/admin/`:

\`\`\`typescript
// /src/app/api/admin/blog/route.ts
export async function GET() {
  const posts = await db.post.findMany();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();
  const post = await db.post.create({ data });
  return Response.json(post);
}
\`\`\`

### Option 2: External API

\`\`\`typescript
// /src/lib/api.ts
export async function getBlogPosts() {
  const res = await fetch('/api/blog', {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  return res.json();
}
\`\`\`

## Deployment

### Vercel

1. Set environment variables in Vercel dashboard
2. Deploy: `vercel --prod`

### Other Platforms

Ensure environment variables are set:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## Troubleshooting

### Authentication Not Working

- Check `.env.local` exists and has correct values
- Restart dev server after changing env variables
- Clear browser cache/cookies

### Sidebar Not Showing

- Ensure layout is properly wrapping pages
- Check for JavaScript errors in console

### Pages Not Found

- Verify route structure matches `/admin/[section]/page.tsx`
- Check Next.js routing is working

## Future Enhancements

- [ ] File upload for images
- [ ] Rich text editor for blog posts
- [ ] Drag-and-drop reordering
- [ ] Bulk actions
- [ ] Export/import data
- [ ] Audit log
- [ ] Multi-user support with roles
- [ ] Real-time updates with WebSockets

## Support

For issues or questions, refer to:
- Next.js Documentation
- Project README
- GitHub Issues
