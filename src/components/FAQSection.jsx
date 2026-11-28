import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { FaqDrawer } from './ui/faq-drawer';

export default function FAQSection({ onNavigate }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
      {/* Visual Header Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <span 
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: 'rgba(193, 95, 60, 0.12)', color: '#C15F3C', border: '1px solid rgba(193, 95, 60, 0.25)' }}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Tactile FAQ Drawer</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: 'var(--app-text)' }}>
          Got Questions? We Filed Answers.
        </h1>
        <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
          Pull any index card from our drawer cabinet below to inspect full answers on fairness, candidate privacy, recruiter verification, and resonance matching.
        </p>
      </motion.div>

      {/* The Tactile FAQ Index Drawer Component */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full"
      >
        <FaqDrawer
          label="Hiredge Knowledge Base"
          title="Tactile Inquiries Drawer"
          lead="Every standard platform, privacy, and algorithm question filed where candidates and recruiters can find them. Pull a card to read it."
          drawer="Hiredge · FAQ 2026"
          count={7}
          open="1"
          single={true}
          askNote="Still have questions? Our human empathy desk answers promptly."
          askLabel="Reach Our Team"
          askHref="mailto:support@hiredge.ai"
          finish="auto"
        />
      </motion.div>

      {/* Bottom Navigation Prompt */}
      <div className="text-center pt-8 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <p className="text-xs font-medium" style={{ color: 'var(--app-text-muted)' }}>
          Ready to experience bias-free hiring?{' '}
          <button
            onClick={() => onNavigate && onNavigate('auth')}
            className="text-[#C15F3C] font-bold hover:underline inline-flex items-center gap-1 ml-1 cursor-pointer"
          >
            <span>Enter Candidate or Recruiter Gateway</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </p>
      </div>
    </div>
  );
}
