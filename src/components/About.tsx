'use client';

import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';

export default function About() {
  return (
    <Section id="about" centerContent>
      <Container>
        <SectionTitle title="About" color="sakura" />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Card borderColor="moss" delay={0} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}>
            <h3 className="text-2xl font-semibold mb-6 text-[rgb(var(--neon-cyan))]">
              Builder Profile
            </h3>
            <p className="text-[rgb(var(--text-secondary))] leading-relaxed mb-4 text-base md:text-lg">
              AI engineer building LLM workflows, ML services, backend APIs, and dashboards that make intelligent systems usable in the real world.
            </p>
            <p className="text-[rgb(var(--text-secondary))] leading-relaxed">
              Strong in Python, systems thinking, applied research, and fast product execution. Currently focused on AI governance, cost analytics, and agentic automation.
            </p>
          </Card>

          <Card borderColor="sakura" delay={0.08} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}>
            <h3 className="text-2xl font-semibold mb-6 text-[rgb(var(--neon-green))]">
              Education
            </h3>
            <div className="space-y-6">
              <div className="border-l-2 border-[rgb(var(--moss-green))] pl-4">
                <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                  B.Tech in Artificial Intelligence and Data Sciences
                </p>
                <p className="text-[rgb(var(--moss-green))]">KL University Hyderabad</p>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Aug. 2022 – May 2026 • GPA: 9.38
                </p>
              </div>

              <div className="border-l-2 border-[rgb(var(--sakura-pink))] pl-4">
                <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                  Board of Intermediate Education
                </p>
                <p className="text-[rgb(var(--moss-green))]">Sri Chaitanya Junior College</p>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Aug. 2020 – May 2022 • 91.9%
                </p>
              </div>

              <div className="border-l-2 border-[rgb(var(--indigo-blue))] pl-4">
                <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                  Board of Secondary Education
                </p>
                <p className="text-[rgb(var(--moss-green))]">Sri Chaitanya School SP Nagar</p>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Aug. 2019 – June 2020 • GPA: 10.0
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
