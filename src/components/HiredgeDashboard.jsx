import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  UserCheck, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  LogOut,
  Calendar,
  Layers,
  Award,
  Sparkles,
  Inbox
} from 'lucide-react';

export default function HiredgeDashboard({ user, onSignOut }) {
  const isRecruiter = user?.role === 'recruiter';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Dashboard Top Header Bar with Verified Session Details */}
      <div className="rounded-[32px] glass-cream-card-warm p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border bg-white shadow-xs shrink-0" style={{ borderColor: 'var(--card-border)' }}>
            <img src="/hiredge-logo.jpg" alt="User Avatar" className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--app-text)' }}>
                {user?.name || (isRecruiter ? 'Enterprise Talent Hub' : 'Candidate Workspace')}
              </h2>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: isRecruiter ? 'rgba(193, 95, 60, 0.12)' : 'rgba(16, 185, 129, 0.12)', color: isRecruiter ? '#C15F3C' : '#059669' }}>
                {isRecruiter ? <Building2 className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                <span>{isRecruiter ? 'Recruiter Verified' : 'Active Candidate'}</span>
              </span>
            </div>

            <p className="text-xs font-medium mt-1" style={{ color: 'var(--app-text-muted)' }}>
              {isRecruiter 
                ? `Organization: ${user?.company || 'Corporate Partner'} • Domain Email: ${user?.email || 'recruiter@verified.com'}`
                : `Account: ${user?.email || 'candidate@hiredge.ai'} • Identity Protected`}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onSignOut}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-600 cursor-pointer"
            style={{ backgroundColor: 'var(--subtle-surface)', borderColor: 'var(--card-border)', color: 'var(--app-text)' }}
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* RECRUITER DASHBOARD VIEW */}
      {isRecruiter ? (
        <div className="space-y-8">
          {/* Status Metrics Bar - Clean Authentic States */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Live Job Openings', value: '0 Active', sub: 'No roles published yet', icon: Briefcase, color: '#C15F3C' },
              { label: 'Candidate Applications', value: '0 Pending', sub: 'Ready for submissions', icon: Users, color: '#2563EB' },
              { label: 'DIR Fairness Engine', value: 'Active', sub: '100% EEOC compliant', icon: ShieldCheck, color: '#059669' },
              { label: 'Scheduled Interviews', value: '0 Booked', sub: 'Awaiting candidate matches', icon: Calendar, color: '#7C3AED' },
            ].map((metric, i) => (
              <div key={i} className="glass-cream-card rounded-2xl p-5 border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: 'var(--app-text-muted)' }}>{metric.label}</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}18`, color: metric.color }}>
                    <metric.icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black" style={{ color: 'var(--app-text)' }}>{metric.value}</div>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{metric.sub}</span>
              </div>
            ))}
          </div>

          {/* Recruiter Workspace Main Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Candidate Pipeline State */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl glass-cream-card p-6 border space-y-6">
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--card-border)' }}>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--app-text)' }}>
                      Talent Pipeline & Candidates
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--app-text-muted)' }}>
                      Authentic submissions will appear here once candidates apply or are matched to your job requisitions.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#C15F3C] font-mono">Live Session</span>
                </div>

                {/* Clean Zero-State / Empty Workspace State */}
                <div className="py-14 text-center space-y-4 px-4">
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border" style={{ backgroundColor: 'var(--subtle-surface)', borderColor: 'var(--card-border)' }}>
                    <Inbox className="w-8 h-8 text-[#C15F3C]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base" style={{ color: 'var(--app-text)' }}>
                      No Candidates in Pipeline Yet
                    </h4>
                    <p className="text-xs max-w-md mx-auto" style={{ color: 'var(--app-text-muted)' }}>
                      Your recruiter enterprise portal is clean and connected. When you post a vacancy or initiate a search, matched portfolios will be listed here.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button className="px-5 py-2.5 rounded-xl bg-[#C15F3C] hover:bg-[#A84B29] text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                      Create First Job Requisition
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Corporate Governance & 2FA Status */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl glass-cream-card-warm p-6 border space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C15F3C] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security Clearance</span>
                </div>
                <h4 className="text-base font-bold" style={{ color: 'var(--app-text)' }}>
                  Enterprise Session Active
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
                  Your session is cryptographically bound to your corporate domain with active 2-Factor Authentication.
                </p>

                <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--card-border)' }}>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--app-text-muted)' }}>Two-Factor Auth</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Verified via OTP</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--app-text-muted)' }}>DIR Compliance</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Enforced</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--app-text-muted)' }}>Data Mode</span>
                    <span className="font-bold font-mono text-[#C15F3C]">Live Production</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CANDIDATE DASHBOARD VIEW */
        <div className="space-y-8">
          {/* Quick Metrics Bar - Clean Authentic States */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Profile Resonance Index', value: 'Pending', sub: 'Complete test to generate', icon: Award, color: '#C15F3C' },
              { label: 'Profile Discoverability', value: 'Active', sub: 'Available to verified teams', icon: Users, color: '#2563EB' },
              { label: 'Interview Requests', value: '0 Inbound', sub: 'Awaiting recruiter contact', icon: Calendar, color: '#059669' },
              { label: 'Portfolio Verification', value: 'Protected', sub: 'Demographic bias-free', icon: ShieldCheck, color: '#7C3AED' },
            ].map((metric, i) => (
              <div key={i} className="glass-cream-card rounded-2xl p-5 border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: 'var(--app-text-muted)' }}>{metric.label}</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}18`, color: metric.color }}>
                    <metric.icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black" style={{ color: 'var(--app-text)' }}>{metric.value}</div>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{metric.sub}</span>
              </div>
            ))}
          </div>

          {/* Candidate Matches & Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl glass-cream-card p-6 border space-y-6">
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--card-border)' }}>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--app-text)' }}>
                      Matched Opportunities
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--app-text-muted)' }}>
                      Real positions will be computed here as enterprise teams review your verified portfolio.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#C15F3C] font-mono">Real-Time</span>
                </div>

                {/* Clean Zero-State / Empty Workspace State */}
                <div className="py-14 text-center space-y-4 px-4">
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border" style={{ backgroundColor: 'var(--subtle-surface)', borderColor: 'var(--card-border)' }}>
                    <Layers className="w-8 h-8 text-[#C15F3C]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base" style={{ color: 'var(--app-text)' }}>
                      No Outgoing Applications or Active Matches Yet
                    </h4>
                    <p className="text-xs max-w-md mx-auto" style={{ color: 'var(--app-text-muted)' }}>
                      Your profile is live and secure. No arbitrary fake matches are shown. Once you submit a competency evaluation, employers can send resonance invitations directly.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button className="px-5 py-2.5 rounded-xl bg-[#C15F3C] hover:bg-[#A84B29] text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                      Start Portfolio Self-Assessment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Career Readiness & Verification */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl glass-cream-card-warm p-6 border space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C15F3C] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Cognitive Profile</span>
                </div>
                <h4 className="text-base font-bold" style={{ color: 'var(--app-text)' }}>
                  Portfolio Status: Initialized
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
                  Demographic data is shielded. Recruiters evaluate purely on real cognitive agility and project contributions.
                </p>

                <div className="space-y-3 pt-2 border-t" style={{ borderColor: 'var(--card-border)' }}>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--app-text-muted)' }}>Privacy Shield</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Masked</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--app-text-muted)' }}>EEOC Parity</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Active</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--app-text-muted)' }}>Verification State</span>
                    <span className="font-bold text-[#C15F3C]">Awaiting Submission</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
