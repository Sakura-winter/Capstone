import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthSection from './components/AuthSection';
import HiredgeDashboard from './components/HiredgeDashboard';
import WayfernFooter from './components/WayfernFooter';
import CompanyConsole from './components/CompanyConsole';
import CandidatePortal from './components/CandidatePortal';
import BiasAuditView from './components/BiasAuditView';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'auth' | 'dashboard' | 'company' | 'candidates' | 'bias'
  const [currentUser, setCurrentUser] = useState(null);

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveTab('dashboard');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setActiveTab('landing');
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans transition-colors duration-300" style={{ backgroundColor: 'var(--app-bg)', color: 'var(--app-text)' }}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        {activeTab === 'landing' && (
          <LandingPage 
            onNavigate={setActiveTab} 
            onOpenAuth={() => setActiveTab(currentUser ? 'dashboard' : 'auth')} 
          />
        )}
        {activeTab === 'auth' && (
          <AuthSection 
            onNavigateHome={() => setActiveTab('landing')} 
            onAuthSuccess={handleAuthSuccess}
          />
        )}
        {activeTab === 'dashboard' && (
          <HiredgeDashboard 
            user={currentUser} 
            onSignOut={handleSignOut} 
          />
        )}
        {activeTab === 'company' && <CompanyConsole />}
        {activeTab === 'candidates' && <CandidatePortal />}
        {activeTab === 'bias' && <BiasAuditView />}
        {activeTab === 'about' && (
          <AboutSection onNavigate={setActiveTab} />
        )}
        {activeTab === 'faq' && (
          <FAQSection onNavigate={setActiveTab} />
        )}
      </main>

      {/* Elegant Wayfern-Style Serif Giant Footer */}
      <WayfernFooter />
    </div>
  );
}
