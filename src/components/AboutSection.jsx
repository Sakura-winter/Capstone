import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Shield, Users, TrendingUp, Eye, ArrowRight, Lightbulb, Target, Globe } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const STATS = [
  { value: '94%', label: 'Bias-Reduction Accuracy', icon: Shield },
  { value: '12k+', label: 'Candidates Empowered', icon: Users },
  { value: '3.2x', label: 'Faster Fair Matching', icon: TrendingUp },
  { value: '500+', label: 'Companies Onboarded', icon: Globe },
];

const PILLARS = [
  {
    icon: Eye,
    title: 'Radical Transparency',
    desc: 'Every match score, every decision signal — visible to both sides. No black boxes, no hidden biases baked into opaque algorithms.',
    color: '#C15F3C',
  },
  {
    icon: Heart,
    title: 'Human-First Empathy',
    desc: 'We designed conversations, not just data pipelines. Every touchpoint is built for humans who deserve respect in the hiring process.',
    color: '#7C6AAA',
  },
  {
    icon: Zap,
    title: 'Deep Competency Signals',
    desc: 'Beyond resumes. We surface real cognitive agility, portfolio depth, and collaborative instinct — the things that actually predict success.',
    color: '#4A90A4',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Learning',
    desc: 'The platform evolves with every hiring outcome, refining fairness standards and match intelligence without compromising candidate dignity.',
    color: '#6BAA75',
  },
];

const TIMELINE = [
  {
    year: '2026 Q1',
    title: 'The Inception & Bias Audit',
    desc: 'Studied algorithmic keyword rejections across 10,000+ candidate applications. Developed the mathematical foundation for EEOC Disparate Impact Ratio (DIR) compliance.',
  },
  {
    year: '2026 Q2',
    title: 'Cognitive Architecture & Resonance',
    desc: 'Built the dual-gateway resonance engine. Engineered privacy-first demographic masking and verified portfolio assessments for unbiased candidate evaluation.',
  },
  {
    year: '2026 Q3',
    title: 'Hiredge β (Beta) Launch',
    desc: 'Hiredge β deployed to 50 enterprise partners and initial candidate cohorts. Achieved 38% faster fair hiring cycles with zero demographic leakages.',
  },
  {
    year: '2026 Q4',
    title: 'Enterprise Trust & Global Expansion',
    desc: 'Rolled out mandatory 2-Factor Recruiter Enterprise verification, real-time DIR governance telemetry, and the complete unified Hiredge Career Workspace.',
  },
];

export default function AboutSection({ onNavigate }) {
  return (
    <div className="w-full" style={{ color: 'var(--app-text)' }}>

      {/* ── Hero ── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-24 text-center overflow-hidden"
      >
        {/* Soft background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, #C15F3C55 0%, transparent 70%)' }}
          />
        </div>

        <motion.div variants={fadeUp} className="relative z-10 max-w-3xl mx-auto px-4">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: 'var(--subtle-surface)',
              border: '1px solid var(--card-border)',
              color: '#C15F3C',
            }}
          >
            <Target className="w-3.5 h-3.5" />
            Our Story &amp; Mission
          </span>

          <h1
            className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6"
            style={{ color: 'var(--app-text)' }}
          >
            Why{' '}
            <span style={{ color: '#C15F3C' }}>Hiredge</span>{' '}
            Exists
          </h1>

          <p
            className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--app-text-muted)' }}
          >
            Hiring is broken. Not because people are bad — but because the systems between them
            strip away humanity. Hiredge was built to restore empathy, clarity, and fairness to
            every hiring decision.
          </p>
        </motion.div>
      </motion.section>

      {/* ── Stats Row ── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="py-10 px-4 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="glass-cream-card p-6 rounded-2xl text-center group hover:scale-105 transition-transform duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: '#C15F3C18' }}
              >
                <Icon className="w-5 h-5" style={{ color: '#C15F3C' }} />
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: '#C15F3C' }}>
                {value}
              </div>
              <div className="text-xs font-medium" style={{ color: 'var(--app-text-muted)' }}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Core Philosophy ── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="py-16 px-4 max-w-6xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            style={{ color: 'var(--app-text)' }}
          >
            Built on Four Principles
          </h2>
          <p className="text-base" style={{ color: 'var(--app-text-muted)' }}>
            Every feature, every algorithm, every conversation — guided by these pillars.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {PILLARS.map(({ icon: Icon, title, desc, color }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="glass-cream-card p-7 rounded-2xl flex gap-5 group hover:scale-[1.02] transition-transform duration-300"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${color}18` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--app-text)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Origin Timeline ── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="py-16 px-4 max-w-4xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            style={{ color: 'var(--app-text)' }}
          >
            How We Got Here
          </h2>
          <p className="text-base" style={{ color: 'var(--app-text-muted)' }}>
            The honest story of a platform built out of frustration and conviction.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'var(--card-border)' }}
          />

          <div className="space-y-6">
            {TIMELINE.map(({ year, title, desc }, i) => (
              <motion.div
                key={year}
                variants={fadeUp}
                className="md:pl-16 relative flex gap-5 md:gap-0"
              >
                {/* Year dot */}
                <div className="hidden md:flex absolute left-0 top-5 w-12 h-12 rounded-full items-center justify-center text-[10px] font-black shrink-0 z-10"
                  style={{
                    background: 'var(--card-bg)',
                    border: '2px solid #C15F3C',
                    color: '#C15F3C',
                  }}
                >
                  {year.includes('Q') ? year.split(' ')[1] : year.slice(2)}
                </div>

                {/* Mobile year label */}
                <div
                  className="md:hidden text-xs font-black px-2.5 py-1 rounded-full shrink-0 self-start mt-1"
                  style={{ background: '#C15F3C18', color: '#C15F3C' }}
                >
                  {year}
                </div>

                <div
                  className="glass-cream-card p-6 rounded-2xl flex-1"
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: '#C15F3C' }}
                  >
                    {year}
                  </div>
                  <h4
                    className="font-bold text-lg mb-2"
                    style={{ color: 'var(--app-text)' }}
                  >
                    {title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Big Quote / Manifesto ── */}
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="py-16 px-4 max-w-4xl mx-auto text-center"
      >
        <div
          className="glass-cream-card-warm p-12 rounded-3xl relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div
            className="absolute -top-10 -right-10 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: '#C15F3C' }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: '#7C6AAA' }}
          />

          <div className="relative z-10">
            <span
              className="text-7xl font-black leading-none select-none"
              style={{ color: '#C15F3C', opacity: 0.3 }}
            >
              "
            </span>
            <blockquote
              className="text-2xl md:text-3xl font-semibold leading-relaxed -mt-6"
              style={{ color: 'var(--app-text)' }}
            >
              Every person looking for a job deserves to be seen for{' '}
              <em className="not-italic font-black" style={{ color: '#C15F3C' }}>
                who they actually are
              </em>
              , not for how well they match a keyword list.
            </blockquote>
            <p
              className="mt-6 text-sm font-medium"
              style={{ color: 'var(--app-text-muted)' }}
            >
              — The Hiredge Founding Team
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 max-w-2xl mx-auto text-center"
      >
        <h2
          className="text-3xl md:text-4xl font-black tracking-tight mb-4"
          style={{ color: 'var(--app-text)' }}
        >
          Ready to Join the Movement?
        </h2>
        <p className="text-base mb-8" style={{ color: 'var(--app-text-muted)' }}>
          Whether you're a candidate who deserves better, or a recruiter who wants to hire right —
          Hiredge is built for you.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate && onNavigate('auth')}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold text-white shadow-lg cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #C15F3C 0%, #A84B29 100%)',
            boxShadow: '0 8px 32px #C15F3C40',
          }}
        >
          Get Started with Hiredge
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.section>

    </div>
  );
}
