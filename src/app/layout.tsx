import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siddartha Yadav | Cyberpunk Portfolio",
  description: "Full-stack developer with expertise in AI/ML, LLM integration, and cloud-based application deployment",
  keywords: ["AI", "ML", "Full Stack", "Developer", "Python", "Next.js", "Azure"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased crt">
        <div className="scanlines" />
        {/* Background Music - Replace src with your music file */}
        <audio id="bg-music" loop>
          <source src="/music/cyberpunk-bg.mp3" type="audio/mpeg" />
          <source src="/music/cyberpunk-bg.ogg" type="audio/ogg" />
        </audio>
        {children}
      </body>
    </html>
  );
}
