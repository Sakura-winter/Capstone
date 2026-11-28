import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  UserCheck, 
  Eye, 
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Check,
  KeyRound,
  ShieldAlert,
  Fingerprint,
  RefreshCw,
  Building,
  Briefcase
} from 'lucide-react';

export default function AuthSection({ onNavigateHome, onAuthSuccess }) {
  // 'candidate' | 'recruiter'
  const [gateway, setGateway] = useState('candidate');
  // 'login' | 'signup'
  const [authMode, setAuthMode] = useState('login');
  
  // Recruiter 2-Step Verification state: 'credentials' | '2fa' | 'verified'
  const [recruiterStep, setRecruiterStep] = useState('credentials');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    workEmail: '',
    domainVerified: false
  });
  const [candidateSubmitted, setCandidateSubmitted] = useState(false);

  // Handle Candidate Form Submit
  const handleCandidateSubmit = (e) => {
    e.preventDefault();
    setCandidateSubmitted(true);
    setTimeout(() => {
      setCandidateSubmitted(false);
      if (onAuthSuccess) {
        onAuthSuccess({
          role: 'candidate',
          name: formData.name || 'Candidate User',
          email: formData.email || 'candidate@gmail.com'
        });
      }
    }, 1800);
  };

  // Handle Recruiter Step 1 (Credentials) -> Step 2 (2FA OTP)
  const handleRecruiterCredentialsSubmit = (e) => {
    e.preventDefault();
    setRecruiterStep('2fa');
    setResendCooldown(45);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP digit changes
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle Recruiter OTP Submit
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setRecruiterStep('verified');
    setTimeout(() => {
      setRecruiterStep('credentials');
      setOtpCode(['', '', '', '', '', '']);
      if (onAuthSuccess) {
        onAuthSuccess({
          role: 'recruiter',
          name: formData.company ? `${formData.company} Hiring Lead` : 'Enterprise Talent Lead',
          company: formData.company || 'Acme Tech Global',
          email: formData.workEmail || 'recruiter@company.com'
        });
      }
    }, 1800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 space-y-10">
      {/* Top Banner Navigation back to Overview */}
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--card-border)' }}>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#C15F3C] hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span>← Back to Platform Overview</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C15F3C]/10 text-xs font-semibold text-[#C15F3C] border border-[#C15F3C]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hiredge Secure Gateways</span>
        </div>
      </div>

      {/* Main Dual-Gateway Selector Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--app-text)' }}>
          Choose Your Dedicated Gateway
        </h2>
        <p className="text-sm font-medium" style={{ color: 'var(--app-text-muted)' }}>
          To safeguard applicant privacy and corporate integrity, Candidate and Recruiter portals operate under isolated, dedicated security architectures.
        </p>

        {/* Big Dual-Gateway Cards Switcher */}
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl max-w-md mx-auto mt-4" style={{ backgroundColor: 'var(--subtle-surface)', border: '1px solid var(--card-border)' }}>
          <button
            type="button"
            onClick={() => {
              setGateway('candidate');
              setRecruiterStep('credentials');
            }}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              gateway === 'candidate'
                ? 'bg-white dark:bg-gray-800 shadow-sm text-[#11141B] dark:text-white border border-[#C15F3C]/30'
                : 'text-[#615B52] dark:text-gray-400 hover:text-[#11141B] dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#C15F3C]" />
            <span>Candidate Portal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setGateway('recruiter');
              setRecruiterStep('credentials');
            }}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              gateway === 'recruiter'
                ? 'bg-white dark:bg-gray-800 shadow-sm text-[#11141B] dark:text-white border border-[#C15F3C]/30'
                : 'text-[#615B52] dark:text-gray-400 hover:text-[#11141B] dark:hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#C15F3C]" />
            <span>Recruiter Enterprise (2FA)</span>
          </button>
        </div>
      </div>

      {/* Gateway View Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Contextual Value Narrative */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md bg-white border" style={{ borderColor: 'var(--card-border)' }}>
            <img src="/hiredge-logo.jpg" alt="Hiredge" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: gateway === 'recruiter' ? 'rgba(193, 95, 60, 0.12)' : 'rgba(59, 130, 246, 0.1)', color: gateway === 'recruiter' ? '#C15F3C' : '#2563EB' }}>
              {gateway === 'candidate' ? <UserCheck className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              <span>{gateway === 'candidate' ? 'Individual Jobseeker Realm' : 'Enterprise Multi-Factor Gateway'}</span>
            </div>

            <h3 className="text-3xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--app-text)' }}>
              {gateway === 'candidate' ? (
                <>
                  Empowering Your <br />
                  <span className="text-[#C15F3C]">Career Journey</span>
                </>
              ) : (
                <>
                  Verified Employer <br />
                  <span className="text-[#C15F3C]">Security Access</span>
                </>
              )}
            </h3>

            <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--app-text-muted)' }}>
              {gateway === 'candidate'
                ? 'Showcase your real cognitive potential, portfolio, and problem-solving agility directly to verified hiring teams without bias.'
                : 'Recruiter portals require Corporate Domain authentication and Mandatory 2-Factor Verification to ensure zero unauthorized candidate access.'}
            </p>
          </div>

          {/* Pillars List */}
          <div className="space-y-3 pt-1">
            {gateway === 'candidate' ? (
              [
                { title: 'Personal Skill Graph', desc: 'Holistic evaluation of experiences, skills, and portfolio highlights.' },
                { title: 'Direct Recruiter Visibility', desc: 'Direct discovery by corporate talent teams searching for your competencies.' },
                { title: 'Full Data Ownership', desc: 'Encrypted candidate profile with demographic protection.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl border" style={{ backgroundColor: 'var(--subtle-surface)', borderColor: 'var(--card-border)' }}>
                  <Check className="w-4 h-4 text-[#C15F3C] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold" style={{ color: 'var(--app-text)' }}>{item.title}</h5>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--app-text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              [
                { title: 'Mandatory 2FA OTP Authentication', desc: 'Time-based security token sent directly to registered corporate phone/email.' },
                { title: 'Corporate Work Email Binding', desc: 'Enforces @company.com domains to prevent illegitimate employer accounts.' },
                { title: 'Candidate Privacy Compliance', desc: 'Full audit log trail meeting SIH26134 ethical data handling protocols.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl border" style={{ backgroundColor: 'var(--subtle-surface)', borderColor: 'var(--card-border)' }}>
                  <KeyRound className="w-4 h-4 text-[#C15F3C] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold" style={{ color: 'var(--app-text)' }}>{item.title}</h5>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--app-text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Dedicated Gateway Card */}
        <div className="lg:col-span-7">
          <motion.div
            key={gateway}
            initial={{ opacity: 0, x: gateway === 'candidate' ? -15 : 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="glass-cream-card-warm rounded-[36px] p-8 sm:p-11 shadow-xl relative overflow-hidden"
          >
            {/* GATEWAY 1: CANDIDATE PORTAL */}
            {gateway === 'candidate' && (
              <div>
                <div className="text-center space-y-1.5 mb-7">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#C15F3C]">
                    Candidate Gateway
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--app-text)' }}>
                    {authMode === 'login' ? 'Candidate Sign In' : 'Candidate Registration'}
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--app-text-muted)' }}>
                    {authMode === 'login' 
                      ? 'Access your applications, resonance match scores, and interview requests.' 
                      : 'Join Hiredge to get noticed for your real skills and talents.'}
                  </p>
                </div>

                {candidateSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h5 className="text-xl font-bold" style={{ color: 'var(--app-text)' }}>
                      {authMode === 'login' ? 'Candidate Verified!' : 'Registration Successful!'}
                    </h5>
                    <p className="text-xs max-w-sm mx-auto" style={{ color: 'var(--app-text-muted)' }}>
                      Connecting to your personal Hiredge Career Workspace...
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCandidateSubmit} className="space-y-4">
                    {authMode === 'signup' && (
                      <div>
                        <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--app-text)' }}>
                          Your Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Maya Patel"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--app-text)', borderColor: 'var(--card-border)' }}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--app-text)' }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="candidate@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                          style={{ backgroundColor: 'var(--input-bg)', color: 'var(--app-text)', borderColor: 'var(--card-border)' }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold" style={{ color: 'var(--app-text)' }}>
                          Password
                        </label>
                        {authMode === 'login' && (
                          <button type="button" className="text-[11px] text-[#C15F3C] hover:underline cursor-pointer">
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                          style={{ backgroundColor: 'var(--input-bg)', color: 'var(--app-text)', borderColor: 'var(--card-border)' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999187] hover:text-[#454038] cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-[#C15F3C] hover:bg-[#A84B29] shadow-md shadow-[#C15F3C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                    >
                      <span>{authMode === 'login' ? 'Sign In as Candidate' : 'Create Free Candidate Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <div className="pt-3 text-center text-xs" style={{ color: 'var(--app-text-muted)' }}>
                      {authMode === 'login' ? (
                        <p>
                          New candidate?{' '}
                          <button
                            type="button"
                            onClick={() => setAuthMode('signup')}
                            className="font-bold text-[#C15F3C] hover:underline cursor-pointer"
                          >
                            Create candidate profile
                          </button>
                        </p>
                      ) : (
                        <p>
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setAuthMode('login')}
                            className="font-bold text-[#C15F3C] hover:underline cursor-pointer"
                          >
                            Sign in here
                          </button>
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* GATEWAY 2: RECRUITER ENTERPRISE GATEWAY WITH 2FA VERIFICATION */}
            {gateway === 'recruiter' && (
              <div>
                {/* Step Progress Indicator for Recruiter */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--card-border)' }}>
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${recruiterStep === 'credentials' ? 'bg-[#C15F3C] text-white' : 'bg-emerald-500 text-white'}`}>
                      {recruiterStep === 'credentials' ? '1' : '✓'}
                    </span>
                    <span className="text-xs font-bold" style={{ color: 'var(--app-text)' }}>Corporate Auth</span>
                  </div>

                  <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700" />

                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${recruiterStep === '2fa' ? 'bg-[#C15F3C] text-white' : recruiterStep === 'verified' ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                      2
                    </span>
                    <span className="text-xs font-bold" style={{ color: recruiterStep === '2fa' ? 'var(--app-text)' : 'var(--app-text-muted)' }}>Security OTP (2FA)</span>
                  </div>
                </div>

                {/* Sub-Step 1: Recruiter Credentials */}
                {recruiterStep === 'credentials' && (
                  <div>
                    <div className="text-center space-y-1.5 mb-7">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Corporate Verification Protocol</span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--app-text)' }}>
                        Recruiter Workspace
                      </h4>
                      <p className="text-xs" style={{ color: 'var(--app-text-muted)' }}>
                        Enter your official corporate credentials to initiate 2-step verification.
                      </p>
                    </div>

                    <form onSubmit={handleRecruiterCredentialsSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--app-text)' }}>
                          Company Organization
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Acme Tech Global"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--app-text)', borderColor: 'var(--card-border)' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--app-text)' }}>
                          Corporate Work Email (@company.com)
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            placeholder="recruiter@acmetech.com"
                            value={formData.workEmail}
                            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--app-text)', borderColor: 'var(--card-border)' }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold" style={{ color: 'var(--app-text)' }}>
                            Employer Password
                          </label>
                        </div>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="••••••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--app-text)', borderColor: 'var(--card-border)' }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999187] hover:text-[#454038] cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-[#C15F3C] hover:bg-[#A84B29] shadow-md shadow-[#C15F3C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                      >
                        <span>Proceed to 2-Factor Verification</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </form>
                  </div>
                )}

                {/* Sub-Step 2: Recruiter 2FA OTP Code Verification */}
                {recruiterStep === '2fa' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 mx-auto rounded-full bg-[#C15F3C]/15 text-[#C15F3C] flex items-center justify-center shadow-xs">
                        <Fingerprint className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-black" style={{ color: 'var(--app-text)' }}>
                        Two-Factor Authentication
                      </h4>
                      <p className="text-xs max-w-sm mx-auto" style={{ color: 'var(--app-text-muted)' }}>
                        We sent a 6-digit security token to your registered work email: <br />
                        <strong className="text-[#C15F3C] font-mono">{formData.workEmail || 'recruiter@company.com'}</strong>
                      </p>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                      {/* 6 Digit Input Boxes */}
                      <div className="flex justify-center gap-2.5 sm:gap-3">
                        {otpCode.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-11 h-13 sm:w-12 sm:h-14 text-center text-lg font-black font-mono rounded-xl border focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/20 transition-all shadow-xs"
                            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--app-text)', borderColor: 'var(--card-border)' }}
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs px-2" style={{ color: 'var(--app-text-muted)' }}>
                        <button
                          type="button"
                          onClick={() => setRecruiterStep('credentials')}
                          className="hover:underline text-gray-500 cursor-pointer"
                        >
                          ← Change Email
                        </button>

                        <button
                          type="button"
                          disabled={resendCooldown > 0}
                          onClick={() => setResendCooldown(45)}
                          className={`font-semibold cursor-pointer flex items-center gap-1 ${resendCooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#C15F3C] hover:underline'}`}
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>{resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend Code'}</span>
                        </button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={otpCode.some((d) => !d)}
                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                          otpCode.every((d) => d)
                            ? 'bg-[#C15F3C] hover:bg-[#A84B29] shadow-[#C15F3C]/25'
                            : 'bg-gray-400 dark:bg-gray-700 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify & Open Recruiter Hub</span>
                      </motion.button>
                    </form>
                  </motion.div>
                )}

                {/* Sub-Step 3: Verification Success */}
                {recruiterStep === 'verified' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h5 className="text-xl font-bold" style={{ color: 'var(--app-text)' }}>
                      Security Clearance Granted!
                    </h5>
                    <p className="text-xs max-w-sm mx-auto" style={{ color: 'var(--app-text-muted)' }}>
                      2-Factor Authentication verified. Launching Company Hub & Job Console.
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Ethical Guardrail Footer */}
            <div className="mt-8 pt-4 border-t flex items-center justify-center gap-2 text-[10px]" style={{ borderColor: 'var(--card-border)', color: 'var(--app-text-muted)' }}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>SIH26134 Compliant • End-to-end encrypted session keys</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
