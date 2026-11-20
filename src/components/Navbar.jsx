import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Building2, UserCircle, Briefcase, FileSearch, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { backendStatus, currentCompany, activeActor, employees, setActiveActor, toast } = useApp();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Logo and Live Status */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-lg">
              S
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-gray-200 to-indigo-200 bg-clip-text text-transparent">
                SkillSync AI
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                SIH26134
              </span>
            </div>
            
            {/* Live Backend Pulse */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  backendStatus === 'ONLINE' ? 'bg-emerald-400' : 'bg-rose-400'
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  backendStatus === 'ONLINE' ? 'bg-emerald-500' : 'bg-rose-500'
                }`} />
              </span>
              <span className="text-gray-400 font-mono text-[11px]">
                Backend: <strong className={backendStatus === 'ONLINE' ? 'text-emerald-400' : 'text-rose-400'}>
                  {backendStatus} (Port 8080)
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Center Nav Navigation */}
        <nav className="flex items-center space-x-1 bg-gray-900/60 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab('company')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'company'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Company Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('candidates')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'candidates'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            <span>Resume & Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('bias')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'bias'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Bias Audit (DIR)</span>
          </button>
        </nav>

        {/* Right Actor / Permission Switcher */}
        <div className="flex items-center space-x-3">
          {currentCompany && (
            <div className="flex items-center space-x-2 bg-gray-900/80 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
              <UserCircle className="w-4 h-4 text-cyan-400" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400">Acting As (X-Actor-Employee-Id):</span>
                <select
                  value={activeActor?.id || ''}
                  onChange={(e) => {
                    const selected = employees.find(emp => emp.id === e.target.value);
                    if (selected) setActiveActor(selected);
                  }}
                  className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id} className="bg-gray-900 text-white">
                      {emp.fullName} ({emp.roleOrTitle})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Toast Notification Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-xl text-xs font-medium ${
              toast.type === 'error'
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-200'
                : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
