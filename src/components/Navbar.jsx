import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, LogIn, ArrowUpRight, Sun, Moon, Info, Settings, HelpCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, onSignOut }) {
  const { toast, theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-40 glass-navbar px-4 lg:px-8 py-3.5 shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Hiredge Logo and Identity with Greek β Symbol Badge */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
          title="Hiredge - Intelligent Career & Hiring"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-xs group-hover:scale-105 transition-transform bg-white border border-[#E0D8CC] dark:border-white/10 shrink-0">
            <img 
              src="/hiredge-logo.jpg" 
              alt="Hiredge Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-[#0D0F14] dark:text-white group-hover:text-[#C15F3C] transition-colors">
                Hiredge
              </span>

              {/* Greek β symbol badge */}
              <div 
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C15F3C]/10 dark:bg-[#C15F3C]/20 border border-[#C15F3C]/25 text-[#C15F3C] shadow-xs cursor-default" 
                title="Beta Release"
              >
                <span className="text-sm font-serif font-bold leading-none -translate-y-[1px]">
                  β
                </span>
              </div>
            </div>
            
            <p className="text-[11px] text-[#78716A] dark:text-gray-400">
              Where Talent Meets Insight
            </p>
          </div>
        </div>

        {/* Center Nav Navigation */}
        <nav className="flex items-center space-x-1 bg-[#EFECE6]/80 dark:bg-gray-800/60 p-1.5 rounded-2xl border border-[#E0DCD4] dark:border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('landing')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-[#C15F3C] text-white shadow-sm shadow-[#C15F3C]/30'
                : 'text-[#615B52] dark:text-gray-300 hover:text-[#1F242E] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#C15F3C] text-white shadow-sm shadow-[#C15F3C]/30'
                : 'text-[#615B52] dark:text-gray-300 hover:text-[#1F242E] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-[#C15F3C] text-white shadow-sm shadow-[#C15F3C]/30'
                : 'text-[#615B52] dark:text-gray-300 hover:text-[#1F242E] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ Drawer</span>
          </button>

          {currentUser && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#C15F3C] text-white shadow-sm shadow-[#C15F3C]/30'
                  : 'text-[#615B52] dark:text-gray-300 hover:text-[#1F242E] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          )}
        </nav>

        {/* Right Section: Custom Settings Button + Theme Switcher + Auth Button */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          
          {/* Custom Settings Button just before Theme changing button */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 15 }}
            whileTap={{ scale: 0.92, rotate: -15 }}
            onClick={() => toast({ type: 'info', message: 'Hiredge Preferences: System Theme, Notification Keys & Security Verified.' })}
            className="p-2.5 rounded-2xl bg-white dark:bg-gray-800 border border-[#DDD5C8] dark:border-white/15 shadow-xs hover:border-[#C15F3C]/50 hover:shadow-sm transition-all cursor-pointer flex items-center justify-center text-[#615B52] dark:text-gray-300 hover:text-[#C15F3C] dark:hover:text-[#F3C3A6]"
            title="Hiredge Preferences & Settings"
          >
            <Settings className="w-4 h-4" />
          </motion.button>

          {/* Custom Animated Theme Switcher Button */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 6 }}
            whileTap={{ scale: 0.92, rotate: -10 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-white dark:bg-gray-800 border border-[#DDD5C8] dark:border-white/15 shadow-xs hover:border-[#C15F3C]/50 hover:shadow-sm transition-all cursor-pointer flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Creamy Light Mode' : 'Switch to Soft Dark Mode'}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-[#F3C3A6]" />
              ) : (
                <Sun className="w-4 h-4 text-[#C15F3C]" />
              )}
            </motion.div>
          </motion.button>

          {/* User Status / Login Button */}
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-3.5 py-2 rounded-2xl text-xs font-bold bg-[#C15F3C] text-white shadow-xs hover:bg-[#A84B29] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Dashboard</span>
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('auth')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border shadow-xs ${
                activeTab === 'auth'
                  ? 'bg-[#C15F3C] text-white border-[#C15F3C] shadow-md shadow-[#C15F3C]/30'
                  : 'bg-white dark:bg-gray-800 text-[#0D0F14] dark:text-white border-[#DDD5C8] dark:border-white/15 hover:border-[#C15F3C]/50 hover:shadow-sm'
              }`}
            >
              <div className={`w-6 h-6 rounded-xl flex items-center justify-center transition-colors ${
                activeTab === 'auth' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[#C15F3C]/10 text-[#C15F3C]'
              }`}>
                <LogIn className="w-3.5 h-3.5" />
              </div>
              <span>Sign In / Login</span>
              <ArrowUpRight className={`w-3.5 h-3.5 transition-colors ${
                activeTab === 'auth' ? 'text-white' : 'text-[#9E968B]'
              }`} />
            </motion.button>
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
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
