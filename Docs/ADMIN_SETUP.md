# Admin Panel Quick Setup Guide

## ⚡ Quick Start

### 1. Set Up Credentials

Create a `.env.local` file in the root directory:

\`\`\`bash
# Copy from example
cp .env.example .env.local
\`\`\`

Edit `.env.local` and set your credentials:

\`\`\`env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
\`\`\`

### 2. Start Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

### 3. Access Admin Panel

Open your browser and navigate to:
\`\`\`
http://localhost:3000/admin
\`\`\`

You'll be prompted to enter credentials. Use the username and password from step 1.

## 🎯 What's New

### Enhanced Features

✅ **Separate Pages** - Each admin section now has its own route:
- `/admin/dashboard` - Overview and quick stats
- `/admin/blog-posts` - Blog management
- `/admin/projects` - Project management
- `/admin/analytics` - Traffic analytics
- `/admin/messages` - Contact messages
- `/admin/settings` - Site configuration

✅ **Collapsible Sidebar** - Click the arrow button to collapse/expand

✅ **Better Security** - Enhanced middleware protection for all routes

✅ **Glow Effects** - Active sidebar items have a beautiful neon glow

✅ **More Features**:
- Search and filter functionality
- Message management with read/unread status
- Settings page for site configuration
- Enhanced dashboard with recent activity
- Better stats and analytics

## 🔐 Security

The admin panel is protected by HTTP Basic Authentication. For production, consider upgrading to:
- NextAuth.js
- Clerk
- Auth0

See [ADMIN_PANEL.md](./ADMIN_PANEL.md) for detailed security recommendations.

## 📱 Mobile Responsive

The admin panel is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

The sidebar automatically adapts for smaller screens.

## 🎨 Customization

To change colors, edit the sidebar in:
\`\`\`
src/components/admin/AdminSidebar.tsx
\`\`\`

To add new sections:
1. Create page: \`src/app/admin/your-section/page.tsx\`
2. Add to sidebar navigation array

## 📝 Next Steps

1. Set up your credentials (see step 1 above)
2. Access the admin panel
3. Explore the different sections
4. Customize to your needs
5. Connect to your backend API (optional)

For more details, see [ADMIN_PANEL.md](./ADMIN_PANEL.md)
