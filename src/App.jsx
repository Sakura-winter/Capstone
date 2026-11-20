import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CompanyConsole from './components/CompanyConsole';
import CandidatePortal from './components/CandidatePortal';
import BiasAuditView from './components/BiasAuditView';
import { useApp } from './context/AppContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('company'); // 'company' | 'candidates' | 'bias'

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        {activeTab === 'company' && <CompanyConsole />}
        {activeTab === 'candidates' && <CandidatePortal />}
        {activeTab === 'bias' && <BiasAuditView />}
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-gray-500">
        <p>SkillSync AI — SIH26134 (Government of Maharashtra) • Algorithmic Bias Audited Platform</p>
      </footer>
    </div>
  );
}
