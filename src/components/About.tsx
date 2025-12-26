'use client';

import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';

export default function About() {
  return (
    <Section id="about" centerContent showNeuralNetwork>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<ABOUT />" color="cyan" />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Card borderColor="cyan" delay={0} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
            <h3 className="text-2xl font-bold mb-6 neon-text-pink font-mono">
              {'> PROFILE.SUMMARY'}
            </h3>
            <p className="text-[rgb(var(--text-secondary))] leading-relaxed mb-4 text-base md:text-lg">
              Full-stack developer with experience in AI/ML, LLM integration, and cloud-based application deployment.
              Proficient in Python, Java, C, and OS fundamentals with a strong academic background in AI and Data Science.
            </p>
            <p className="text-[rgb(var(--text-secondary))] leading-relaxed">
              Passionate about building intelligent systems that solve real-world problems. Currently working on
              cutting-edge AI solutions and autonomous systems.
            </p>
          </Card>

          <Card borderColor="cyan" delay={0.1} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
            <h3 className="text-2xl font-bold mb-6 neon-text-purple font-mono">
              {'> EDUCATION.LOG'}
            </h3>
            <div className="space-y-6">
              <div className="border-l-2 border-[rgb(var(--neon-cyan))] pl-4">
                <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                  B.Tech in Artificial Intelligence and Data Sciences
                </p>
                <p className="text-[rgb(var(--neon-green))]">KL University Hyderabad</p>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Aug. 2022 – May 2026 • GPA: 9.38
                </p>
              </div>

              <div className="border-l-2 border-[rgb(var(--neon-pink))] pl-4">
                <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                  Board of Intermediate Education
                </p>
                <p className="text-[rgb(var(--neon-green))]">Sri Chaitanya Junior College</p>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Aug. 2020 – May 2022 • 91.9%
                </p>
              </div>

              <div className="border-l-2 border-[rgb(var(--neon-purple))] pl-4">
                <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                  Board of Secondary Education
                </p>
                <p className="text-[rgb(var(--neon-green))]">Sri Chaitanya School SP Nagar</p>
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

