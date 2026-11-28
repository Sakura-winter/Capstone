import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Lightbulb, 
  BrainCircuit, 
  Target, 
  CheckCircle2, 
  MessageSquare,
  Users2,
  Sparkles,
  Compass,
  HeartHandshake,
  HelpCircle
} from 'lucide-react';
import { FaqDrawer } from './ui/faq-drawer';

export default function LandingPage({ onNavigate, onOpenAuth }) {
  return (
    <div className="relative space-y-20 pb-16 overflow-hidden">
      {/* Soft ambient background illumination */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute top-8 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-warm-1" 
          style={{ backgroundColor: 'var(--blob-1)' }}
        />
        <div 
          className="absolute top-1/2 right-12 w-[550px] h-[550px] rounded-full blur-[130px] animate-warm-2" 
          style={{ backgroundColor: 'var(--blob-2)' }}
        />
      </div>

      {/* Hero Section: Warm, Elegant, Welcoming */}
      <motion.section 
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden pt-12 pb-16 px-6 md:px-14 rounded-[36px] glass-cream-card-warm text-center"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Logo Showcase - Borderless Circular Organic Badge */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-lg shadow-[#C15F3C]/10 transform hover:scale-105 transition-transform duration-300 bg-white">
              <img 
                src="/hiredge-logo.jpg" 
                alt="Hiredge Logo" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C15F3C]/10 text-xs font-bold text-[#C15F3C] border border-[#C15F3C]/25 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C15F3C]" />
              <span>Thoughtful, Human-Centered Career Intelligence</span>
            </div>
          </motion.div>

          {/* Heading - Crisp Black in Light Mode, Pure White in Dark Mode */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15]" style={{ color: 'var(--app-text)' }}>
              Bridge The Gap With <br />
              <span className="text-[#C15F3C]">
                Hiredge
              </span>
            </h1>

            <p className="text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
              Connecting candidates and recruiters through deep understanding, genuine dialogue, and transparent evaluation — bringing empathy and clarity to every hiring decision.
            </p>
          </div>

          {/* Primary Action Button - Wired to Sign In / Login */}
          <div className="pt-2 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenAuth}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#C15F3C] hover:bg-[#A84B29] shadow-md shadow-[#C15F3C]/25 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <span>Explore Platform Philosophy</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Core Philosophy & Concept Behind Hiredge */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-[#C15F3C] text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>The Concept Behind Hiredge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--app-text)' }}>
            Connecting Minds, Ideas & Ambition
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--app-text-muted)' }}>
            Inspired by authentic, transparent two-way dialogue between hiring leaders and aspiring professionals.
          </p>
        </div>

        {/* 3 Story Cards with Theme-Aware Glass Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-cream-card glass-cream-interactive rounded-3xl p-7 space-y-4"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#C15F3C]/10 border border-[#C15F3C]/20 flex items-center justify-center text-[#C15F3C]">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--app-text)' }}>
              Cognitive Career Mapping
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
              Looking beyond rigid keyword matching to evaluate real problem-solving agility, logical creativity, and authentic talent potential.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-cream-card glass-cream-interactive rounded-3xl p-7 space-y-4"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#4A7244]/10 border border-[#4A7244]/20 flex items-center justify-center text-[#4A7244]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--app-text)' }}>
              Empathetic Two-Way Dialogue
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
              Interviews should be conversations, not interrogations. Hiredge facilitates mutual discovery where values, expectations, and culture align.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-cream-card glass-cream-interactive rounded-3xl p-7 space-y-4"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#3B6D87]/10 border border-[#3B6D87]/20 flex items-center justify-center text-[#3B6D87]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--app-text)' }}>
              Precision Goal Alignment
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
              Empowering companies to find teammates who share their vision, while ensuring candidates find roles that genuinely support their growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Holistic Platform Pillars */}
      <section className="rounded-[36px] glass-cream-card p-8 md:p-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#C15F3C]/10 border border-[#C15F3C]/20 text-xs font-semibold text-[#C15F3C]">
              <Compass className="w-3.5 h-3.5 text-[#C15F3C]" />
              <span>Platform Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: 'var(--app-text)' }}>
              A Thoughtful Ecosystem for Both Candidates and Companies
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
              Traditional recruitment often reduces people to bullet points on paper. Hiredge provides the bridge — transforming talent acquisition into a constructive, transparent, and rewarding journey.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { 
                  title: 'Holistic Talent Reflection', 
                  desc: 'Captures communication nuances, critical thinking, and portfolio depth without superficial filters.' 
                },
                { 
                  title: 'Constructive Candidate Feedback', 
                  desc: 'Every applicant receives clear, actionable guidance on strengths and growth pathways.' 
                },
                { 
                  title: 'Objective, Balanced Assessment', 
                  desc: 'Structured criteria designed to remove unvetted bias and celebrate real merit.' 
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl border" style={{ backgroundColor: 'var(--subtle-surface)', borderColor: 'var(--card-border)' }}>
                  <CheckCircle2 className="w-5 h-5 text-[#C15F3C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: 'var(--app-text)' }}>{item.title}</h4>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Showcase Visual Card */}
          <div className="rounded-3xl p-7 md:p-9 border shadow-sm space-y-6 glass-cream-card-warm">
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--card-border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white p-1 border shadow-xs" style={{ borderColor: 'var(--card-border)' }}>
                  <img src="/hiredge-logo.jpg" alt="Hiredge Emblem" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: 'var(--app-text)' }}>Hiredge Insight Scorecard</h4>
                  <span className="text-[11px]" style={{ color: 'var(--app-text-muted)' }}>Balanced Resonance Overview</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                FAIR & BALANCED
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl border space-y-2 shadow-xs" style={{ backgroundColor: 'var(--subtle-surface)', borderColor: 'var(--card-border)' }}>
                <div className="flex justify-between text-xs font-semibold" style={{ color: 'var(--app-text)' }}>
                  <span>Candidate-Culture Resonance</span>
                  <span className="font-bold text-[#C15F3C]">High Alignment</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--card-border)' }}>
                  <div className="bg-[#C15F3C] h-full w-[92%]" />
                </div>
              </div>

              <div className="p-4 rounded-2xl border space-y-2 shadow-xs" style={{ backgroundColor: 'var(--subtle-surface)', borderColor: 'var(--card-border)' }}>
                <div className="flex justify-between text-xs font-semibold" style={{ color: 'var(--app-text)' }}>
                  <span>Collaborative Communication Fit</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">96% Fit</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--card-border)' }}>
                  <div className="bg-sky-600 dark:bg-sky-400 h-full w-[96%]" />
                </div>
              </div>
            </div>

            <div className="pt-2 text-center border-t" style={{ borderColor: 'var(--card-border)' }}>
              <p className="text-xs italic font-serif" style={{ color: 'var(--app-text-muted)' }}>
                “When communication is clear and empathy is preserved, great hires happen naturally.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Hiredge Teaser ── */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="glass-cream-card-warm rounded-3xl p-10 md:p-14 relative overflow-hidden text-center"
          >
            {/* Soft bg glow */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: '#C15F3C' }}
            />
            <div
              className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ background: '#7C6AAA' }}
            />

            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
                style={{
                  background: 'var(--subtle-surface)',
                  border: '1px solid var(--card-border)',
                  color: '#C15F3C',
                }}
              >
                Our Mission
              </span>

              <h2
                className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight"
                style={{ color: 'var(--app-text)' }}
              >
                Built to{' '}
                <span style={{ color: '#C15F3C' }}>Restore Humanity</span>{' '}
                to Hiring
              </h2>

              <p
                className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8"
                style={{ color: 'var(--app-text-muted)' }}
              >
                Hiredge was born from frustration — watching real talent get rejected by keyword
                filters, biased shortcuts, and opaque processes. We exist to change that. Every
                decision on Hiredge is transparent, every match is fair, every person is seen.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {[
                  { value: '94%', label: 'Bias Reduction' },
                  { value: '12k+', label: 'People Helped' },
                  { value: '3.2x', label: 'Faster Matching' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-3xl font-black" style={{ color: '#C15F3C' }}>{value}</div>
                    <div className="text-xs font-medium mt-1" style={{ color: 'var(--app-text-muted)' }}>{label}</div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate && onNavigate('about')}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #C15F3C 0%, #A84B29 100%)',
                  boxShadow: '0 8px 28px #C15F3C38',
                }}
              >
                Read Our Full Story
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ Drawer Section on Landing Page ── */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span 
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: 'rgba(193, 95, 60, 0.12)', color: '#C15F3C', border: '1px solid rgba(193, 95, 60, 0.25)' }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tactile Index Cabinet</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: 'var(--app-text)' }}>
            Frequently Filed Questions
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--app-text-muted)' }}>
            Pull an index card to view detailed answers on Hiredge's fairness safeguards, candidate data ownership, and recruiter protocols.
          </p>
        </div>

        <FaqDrawer
          label="Hiredge Knowledge Base"
          title="Tactile Inquiries Drawer"
          lead="Everything candidates and recruiters ask before joining Hiredge, filed where you can find them. Pull a card to read it."
          drawer="Hiredge · FAQ 2026"
          count={7}
          open="1"
          single={true}
          askNote="Have a custom inquiry? Our empathy desk responds within the hour."
          askLabel="Reach Our Team"
          askHref="mailto:support@hiredge.ai"
          finish="auto"
        />
      </section>
    </div>
  );
}
