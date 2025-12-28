import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Portfolio',
  description: 'Admin dashboard for managing portfolio content',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))]">
      {children}
    </div>
  );
}
