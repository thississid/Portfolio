import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/blog';

// Lazy load Hero with SSR disabled for heavy animations
const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center" />,
});

// Lazy load components for better performance
const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="min-h-screen" />,
});
const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <div className="min-h-screen" />,
});
const Experience = dynamic(() => import('@/components/Experience'), {
  loading: () => <div className="min-h-screen" />,
});
const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <div className="min-h-screen" />,
});
const Publications = dynamic(() => import('@/components/Publications'), {
  loading: () => <div className="min-h-screen" />,
});
const Certifications = dynamic(() => import('@/components/Certifications'), {
  loading: () => <div className="min-h-screen" />,
});
const Blog = dynamic(() => import('@/components/Blog'), {
  loading: () => <div className="min-h-screen" />,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  const blogPosts = getAllPosts();

  return (
    <div className="relative w-full min-h-screen">
      <Header />
      <main className="w-full relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <Certifications />
        <Blog posts={blogPosts} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

