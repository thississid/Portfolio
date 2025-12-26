import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

