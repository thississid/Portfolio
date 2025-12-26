'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-text-cyan">
            {'<ABOUT_ME />'}
          </h2>
          <div className="h-1 w-24 md:w-32 bg-[rgb(var(--neon-cyan))] mb-8 md:mb-12 shadow-[0_0_10px_rgb(var(--neon-cyan))]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="neon-border p-6 bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4 neon-text-pink">
              {'> PROFILE.SUMMARY'}
            </h3>
            <p className="text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
              Full-stack developer with extensive experience in AI/ML, LLM integration, 
              and cloud-based application deployment. Passionate about building intelligent 
              systems that solve real-world problems.
            </p>
            <p className="text-[rgb(var(--text-secondary))] leading-relaxed">
              Proficient in Python, Java, and modern web technologies with a strong 
              academic background in Artificial Intelligence and Data Science. Currently 
              working on cutting-edge AI solutions at PiResearch Labs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="neon-border p-6 bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4 neon-text-purple">
              {'> EDUCATION.LOG'}
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-[rgb(var(--neon-cyan))] pl-4">
                <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                  B.Tech in AI & Data Sciences
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
                <p className="text-[rgb(var(--neon-green))]">Sri Chaitanya School</p>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Aug. 2019 – June 2020 • GPA: 10.0
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: 'Years Experience', value: '2+' },
            { label: 'Projects Completed', value: '10+' },
            { label: 'Certifications', value: '5' },
            { label: 'Publications', value: '1' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 border border-[rgb(var(--neon-cyan))] hover:shadow-[0_0_20px_rgb(var(--neon-cyan))] transition-all duration-300"
            >
              <div className="text-3xl font-bold neon-text-cyan mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[rgb(var(--text-secondary))]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
