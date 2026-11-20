import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [backendStatus, setBackendStatus] = useState('CHECKING');
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [activeActor, setActiveActor] = useState(null); // The employee currently executing actions
  const [companyJobs, setCompanyJobs] = useState([]);
  const [publicFeed, setPublicFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Initial Health & Companies Loading
  useEffect(() => {
    checkHealth();
    loadCompanies();
    loadPublicFeed();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      const res = await api.checkHealth();
      if (res.data?.status === 'UP') {
        setBackendStatus('ONLINE');
      } else {
        setBackendStatus('DEGRADED');
      }
    } catch {
      setBackendStatus('OFFLINE');
    }
  };

  const loadCompanies = async () => {
    try {
      const res = await api.getCompanies();
      setCompanies(res.data || []);
      if (res.data?.length > 0 && !currentCompany) {
        selectCompany(res.data[0]);
      }
    } catch (err) {
      console.error('Failed to load companies:', err);
    }
  };

  const selectCompany = async (company) => {
    setCurrentCompany(company);
    // When selecting company, fetch its employees
    try {
      // First try to fetch with actor if exists, else with dummy to trigger initial list if permissible
      const empRes = await api.getEmployees(company.id, company.initialAdmin?.id || '00000000-0000-0000-0000-000000000000').catch(() => null);
      if (empRes?.data?.length > 0) {
        setEmployees(empRes.data);
        setActiveActor(empRes.data[0]); // default to first employee / admin
        loadCompanyJobs(company.id, empRes.data[0].id);
      } else if (company.initialAdmin) {
        setEmployees([company.initialAdmin]);
        setActiveActor(company.initialAdmin);
        loadCompanyJobs(company.id, company.initialAdmin.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadCompanyJobs = async (companyId, actorId) => {
    if (!companyId || !actorId) return;
    try {
      const res = await api.getCompanyJobs(companyId, actorId);
      setCompanyJobs(res.data || []);
    } catch (err) {
      console.warn('Could not load company jobs:', err.response?.data?.message || err.message);
    }
  };

  const loadPublicFeed = async () => {
    try {
      const res = await api.getPublicJobFeed();
      setPublicFeed(res.data || []);
    } catch (err) {
      console.error('Failed to load public feed:', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        backendStatus,
        companies,
        currentCompany,
        setCurrentCompany,
        employees,
        setEmployees,
        activeActor,
        setActiveActor,
        companyJobs,
        setCompanyJobs,
        publicFeed,
        loadPublicFeed,
        loadCompanies,
        selectCompany,
        loadCompanyJobs,
        loading,
        setLoading,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
