'use client';

import { motion } from 'framer-motion';
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
  return (
    <Section id="certifications" centerContent>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<CERTIFICATIONS />" color="ai" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              borderColor={index % 4 === 0 ? 'cyan' : index % 4 === 1 ? 'pink' : index % 4 === 2 ? 'purple' : 'green'}
              delay={index * 0.1}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-lg font-bold text-[rgb(var(--neon-cyan))] mb-2 font-mono">
                {cert.name}
              </h3>
              <p className="text-sm text-[rgb(var(--neon-green))] mb-2 font-mono">
                {cert.issuer}
              </p>
              <div className="text-xs text-[rgb(var(--text-secondary))] space-y-1">
                <p>Issued: {cert.issued}</p>
                {cert.expires && <p>Expires: {cert.expires}</p>}
                {cert.credentialId && (
                  <p className="font-mono text-[rgb(var(--neon-purple))]">
                    ID: {cert.credentialId.slice(0, 12)}...
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

