'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';

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
  const [showAll, setShowAll] = useState(false);
  const visibleCertifications = showAll ? certifications : certifications.slice(0, 3);
  const nextCertification = certifications[3];

  return (
    <Section id="certifications">
      <Container>
        <SectionTitle title="Certifications" color="beige" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 max-w-3xl text-base md:text-lg leading-relaxed text-[rgb(var(--text-secondary))]"
        >
          Cloud, AI, automation, and platform credentials that back the engineering work without turning the page into a badge wall.
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCertifications.map((cert, index) => (
            <Card
              key={`${cert.issuer}-${cert.name}`}
              borderColor="beige"
              delay={index * 0.025}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group flex min-h-[220px] flex-col justify-between border-[rgb(var(--border))]/70 bg-[rgb(var(--surface))]/82 p-5 md:p-6"
            >
              <div>
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-primary))]/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[rgb(var(--text-secondary))]">
                    {cert.issuer.split(' ')[0]}
                  </span>
                  <span className="text-xs font-mono text-[rgb(var(--text-secondary))]">
                    {cert.issued}
                  </span>
                </div>

                <h3 className="mb-3 text-lg md:text-xl font-semibold leading-snug text-[rgb(var(--text-primary))] transition-colors duration-300 group-hover:text-[rgb(var(--neon-cyan))]">
                  {cert.name}
                </h3>
                <p className="text-sm md:text-base text-[rgb(var(--text-secondary))]">
                  {cert.issuer}
                </p>
              </div>

              <div className="mt-8 border-t border-[rgb(var(--border))]/55 pt-4">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[rgb(var(--text-secondary))]">
                  <span>Issued {cert.issued}</span>
                  {cert.expires && (
                    <>
                      <span className="text-[rgb(var(--border))]">/</span>
                      <span>Valid until {cert.expires}</span>
                    </>
                  )}
                </div>
                {cert.credentialId && (
                  <p className="mt-2 max-w-full truncate font-mono text-xs text-[rgb(var(--text-secondary))]">
                    ID {cert.credentialId}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {!showAll && nextCertification && (
          <motion.button
            type="button"
            onClick={() => setShowAll(true)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mt-4 block h-24 w-full overflow-hidden rounded-lg border border-[rgb(var(--border))]/70 bg-[rgb(var(--surface))]/82 text-left shadow-[0_24px_80px_rgba(22,38,66,0.10)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-[rgb(var(--neon-cyan))] hover:shadow-[0_28px_90px_rgba(34,211,238,0.14)]"
            aria-label={`See all certifications, starting with ${nextCertification.name}`}
          >
            <div className="px-5 py-5 md:px-6">
              <div className="mb-3 flex items-center justify-between gap-3 opacity-70">
                <span className="rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-primary))]/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[rgb(var(--text-secondary))]">
                  {nextCertification.issuer.split(' ')[0]}
                </span>
                <span className="text-xs font-mono text-[rgb(var(--text-secondary))]">
                  {nextCertification.issued}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold leading-snug text-[rgb(var(--text-primary))] opacity-70">
                {nextCertification.name}
              </h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--surface))]/70 to-[rgb(var(--surface))]" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-4">
              <span className="rounded-full border border-[rgb(var(--neon-cyan))]/50 bg-[rgb(var(--bg-primary))]/85 px-5 py-2 text-sm font-semibold text-[rgb(var(--text-primary))] shadow-[0_12px_40px_rgba(22,38,66,0.12)] transition-colors duration-300 group-hover:bg-[rgb(var(--neon-cyan))] group-hover:text-slate-950">
                See all {certifications.length} credentials
              </span>
            </div>
          </motion.button>
        )}

        {showAll && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/80 px-5 py-2 text-sm font-semibold text-[rgb(var(--text-secondary))] transition-colors duration-300 hover:border-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--text-primary))]"
            >
              Show fewer
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}
