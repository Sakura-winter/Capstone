import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
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
  ShieldCheck
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [userRole, setUserRole] = useState('candidate'); // 'candidate' | 'recruiter'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Soft Warm Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2D2A26]/40 backdrop-blur-md transition-all"
        />

        {/* Modal Window with Warm Glass Card & Gentle Lighting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#FFFFFF] to-[#FAF8F5] rounded-[32px] border border-[#E8E2D8] shadow-2xl overflow-hidden p-6 sm:p-9 z-10"
        >
          {/* Subtle Ambient Warm Glow Blob */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#C15F3C]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#DCE7ED]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#7A756D] hover:text-[#1F242E] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with Circular Logo */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 mx-auto rounded-full overflow-hidden shadow-sm mb-3">
              <img src="/hiredge-logo.jpg" alt="Hiredge" className="w-full h-full object-cover" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C15F3C]/10 text-[11px] font-bold text-[#C15F3C]">
              <Sparkles className="w-3 h-3" />
              <span>Hiredge Beta Access</span>
            </div>

            <h3 className="text-2xl font-black text-[#1F242E] tracking-tight">
              {authMode === 'login' ? 'Welcome Back to Hiredge' : 'Join the Hiredge Community'}
            </h3>
            <p className="text-xs text-[#6F685E]">
              {authMode === 'login' 
                ? 'Sign in to access your intelligent matching console.' 
                : 'Experience transparent, thoughtful career connections.'}
            </p>
          </div>

          {/* Role Toggle Selector */}
          <div className="grid grid-cols-2 p-1 bg-[#F1EBE2] rounded-2xl mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setUserRole('candidate')}
              className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                userRole === 'candidate'
                  ? 'bg-white text-[#1F242E] shadow-xs'
                  : 'text-[#7A7369] hover:text-[#1F242E]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-[#C15F3C]" />
              <span>I am a Candidate</span>
            </button>
            <button
              type="button"
              onClick={() => setUserRole('recruiter')}
              className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                userRole === 'recruiter'
                  ? 'bg-white text-[#1F242E] shadow-xs'
                  : 'text-[#7A7369] hover:text-[#1F242E]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#C15F3C]" />
              <span>I am a Recruiter</span>
            </button>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-3"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-[#1F242E]">
                {authMode === 'login' ? 'Welcome Back!' : 'Registration Complete!'}
              </h4>
              <p className="text-xs text-[#7A7369]">
                Connecting to your verified Hiredge workspace...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-[#454038] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DDD5C9] text-xs text-[#1F242E] placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                    />
                  </div>
                </div>
              )}

              {authMode === 'signup' && userRole === 'recruiter' && (
                <div>
                  <label className="block text-xs font-bold text-[#454038] mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Innovations"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DDD5C9] text-xs text-[#1F242E] placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#454038] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#999187] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DDD5C9] text-xs text-[#1F242E] placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#454038]">
                    Password
                  </label>
                  {authMode === 'login' && (
                    <button type="button" className="text-[11px] text-[#C15F3C] hover:underline">
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#DDD5C9] text-xs text-[#1F242E] placeholder-[#AAA399] focus:outline-none focus:border-[#C15F3C] focus:ring-2 focus:ring-[#C15F3C]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999187] hover:text-[#454038]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#C15F3C] hover:bg-[#A84B29] shadow-md shadow-[#C15F3C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{authMode === 'login' ? 'Sign In to Workspace' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Switch Mode Prompt */}
              <div className="pt-2 text-center text-xs text-[#7A7369]">
                {authMode === 'login' ? (
                  <p>
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="font-bold text-[#C15F3C] hover:underline cursor-pointer"
                    >
                      Sign up for free
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

          {/* Ethical Guardrail Footer Note */}
          <div className="mt-6 pt-4 border-t border-[#EDE7DD] flex items-center justify-center gap-2 text-[10px] text-[#8C8478]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted authentication • Bias-free demographic protection</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
