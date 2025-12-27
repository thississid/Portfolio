'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';

const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Dec 2025',
    expires: 'Dec 2028',
    credentialId: 'bd40fb4be29e4f4bb03a6c01c4af72be',
  },
  {
    name: 'Salesforce Certified Agentforce Specialist',
    issuer: 'Salesforce',
    issued: 'Dec 2025',
    credentialId: '7211045',
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    issued: 'Jul 2025',
    credentialId: '6AC6F1A92FF0E07C',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified Architect Associate',
    issuer: 'Oracle',
    issued: 'Jul 2025',
    credentialId: '101264806OCI25CAA',
  },
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    issued: 'Jun 2025',
    credentialId: 'C0B0E6E720CFE39B',
  },
  {
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Apr 2025',
    expires: 'Apr 2028',
    credentialId: 'ce57cf3bf5d141b884e4fbecca86c9d5',
  },
  {
    name: 'GitHub Foundations',
    issuer: 'GitHub',
    issued: 'Apr 2025',
    expires: 'Apr 2028',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    issued: 'Apr 2025',
    credentialId: '101264806OCI25AICFA',
  },
  {
    name: 'Oracle Cloud Infrastructure 2024 Certified Foundations Associate',
    issuer: 'Oracle',
    issued: 'Feb 2025',
    credentialId: '101264806OCI2024FNDCFA',
  },
  {
    name: 'Advanced Automation Certification',
    issuer: 'Automation Anywhere',
    issued: 'Oct 2024',
    expires: 'Oct 2026',
    credentialId: '118301842',
  },
  {
    name: 'Essentials Automation Certification',
    issuer: 'Automation Anywhere',
    issued: 'Sep 2024',
    expires: 'Sep 2026',
    credentialId: '114748878',
  },
];

export default function Certifications() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(certifications.length / cardsPerPage);
  const autoPlayInterval = 5000; // 5 seconds

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false);
  }, [totalPages]);

  const goToPage = useCallback((index: number) => {
    setCurrentPage(index);
    setIsAutoPlaying(false);
  }, []);

  const handleNext = useCallback(() => {
    nextPage();
    setIsAutoPlaying(false);
  }, [nextPage]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextPage();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextPage]);

  const currentCerts = certifications.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <Section id="certifications" centerContent>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<CERTIFICATIONS />" color="ai" />

        <div className="relative max-w-7xl mx-auto py-8">
          {/* Carousel Container */}
          <div className="overflow-hidden px-14 sm:px-16 md:px-16 lg:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 min-h-[320px] sm:min-h-[340px]"
              >
                {currentCerts.map((cert, index) => {
                  const globalIndex = currentPage * cardsPerPage + index;
                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card
                        borderColor={
                          globalIndex % 4 === 0
                            ? 'cyan'
                            : globalIndex % 4 === 1
                            ? 'pink'
                            : globalIndex % 4 === 2
                            ? 'purple'
                            : 'green'
                        }
                        className="h-full flex flex-col"
                      >
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[rgb(var(--neon-cyan))] mb-3 sm:mb-4 font-mono leading-snug">
                          {cert.name}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-[rgb(var(--neon-green))] mb-4 sm:mb-5 font-mono">
                          {cert.issuer}
                        </p>
                        <div className="text-sm sm:text-base text-[rgb(var(--text-secondary))] space-y-2 sm:space-y-3 mt-auto">
                          <p className="flex items-center gap-2">
                            <span className="text-[rgb(var(--neon-cyan))] opacity-60">📅</span>
                            <span>Issued: {cert.issued}</span>
                          </p>
                          {cert.expires && (
                            <p className="flex items-center gap-2">
                              <span className="text-[rgb(var(--neon-green))] opacity-60">⏰</span>
                              <span>Expires: {cert.expires}</span>
                            </p>
                          )}
                          {cert.credentialId && (
                            <p className="font-mono text-[rgb(var(--neon-purple))] break-all">
                              <span className="opacity-60">🔑 ID: </span>
                              {cert.credentialId.length > 16
                                ? `${cert.credentialId.slice(0, 16)}...`
                                : cert.credentialId}
                            </p>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevPage}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[rgb(var(--bg-secondary))] bg-opacity-90 backdrop-blur-sm border-2 border-[rgb(var(--neon-cyan))] text-[rgb(var(--neon-cyan))] flex items-center justify-center hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-20 hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgb(var(--neon-cyan))] hover:shadow-[0_0_25px_rgb(var(--neon-cyan))] z-20 text-xl sm:text-2xl font-bold"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[rgb(var(--bg-secondary))] bg-opacity-90 backdrop-blur-sm border-2 border-[rgb(var(--neon-cyan))] text-[rgb(var(--neon-cyan))] flex items-center justify-center hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-20 hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgb(var(--neon-cyan))] hover:shadow-[0_0_25px_rgb(var(--neon-cyan))] z-20 text-xl sm:text-2xl font-bold"
            aria-label="Next"
          >
            ›
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-10 mb-2 px-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-[rgb(var(--neon-cyan))] w-8 sm:w-10 h-2.5 sm:h-3 shadow-[0_0_12px_rgb(var(--neon-cyan))]'
                    : 'bg-[rgb(var(--text-secondary))] bg-opacity-30 hover:bg-opacity-60 w-2.5 sm:w-3 h-2.5 sm:h-3'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Page Counter & Auto-play Control */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 flex-wrap px-4">
            <p className="text-sm sm:text-base text-[rgb(var(--text-secondary))] font-mono">
              {currentPage + 1} / {totalPages}
            </p>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all ${
                isAutoPlaying
                  ? 'border-[rgb(var(--neon-green))] text-[rgb(var(--neon-green))] shadow-[0_0_8px_rgb(var(--neon-green))]'
                  : 'border-[rgb(var(--text-secondary))] text-[rgb(var(--text-secondary))] opacity-50 hover:opacity-100'
              }`}
              aria-label={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
            >
              {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

