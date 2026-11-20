import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { api } from '../api/client';
import { Building2, Users, Briefcase, Plus, Shield, Check, Lock, ChevronRight, Globe, MapPin } from 'lucide-react';

const ALL_PERMISSIONS = [
  'COMPANY_MANAGE',
  'EMPLOYEE_MANAGE',
  'JOB_CREATE',
  'JOB_EDIT',
  'JOB_VIEW'
];

export default function CompanyConsole() {
  const { 
    companies, 
    currentCompany, 
    selectCompany, 
    employees, 
    setEmployees, 
    activeActor, 
    companyJobs, 
    loadCompanyJobs, 
    loadCompanies, 
    loadPublicFeed,
    showToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('jobs'); // 'jobs' | 'team' | 'createCompany'
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  // New Company Form state
  const [newCompany, setNewCompany] = useState({
    name: '',
    domainOrWebsite: '',
    industry: '',
    location: 'Pune',
    creatorFullName: '',
    creatorEmail: '',
    creatorRoleTitle: 'Founder & CEO'
  });

  // New Employee Form state
  const [newEmployee, setNewEmployee] = useState({
    fullName: '',
    email: '',
    roleOrTitle: 'Recruiter',
    permissions: ['JOB_VIEW', 'JOB_CREATE']
  });

  // New Job Form state
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requiredSkills: 'Java, Spring Boot, SQL, Docker',
    location: 'Pune',
    workMode: 'HYBRID',
    status: 'PUBLISHED',
    requiredExperienceYears: 2.0
  });

  // Check if active actor has permission
  const hasPermission = (perm) => {
    return activeActor?.permissions?.includes(perm);
  };

  // Flow A: Create Company
  const handleCreateCompany = async (e) => {
    e.preventDefault();
    if (!newCompany.name.trim()) return;
    try {
      const res = await api.createCompany(newCompany);
      showToast(`Company '${res.data.name}' created with Super Admin!`, 'success');
      await loadCompanies();
      selectCompany(res.data);
      setActiveSubTab('jobs');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create company', 'error');
    }
  };

  // Flow B: Add Team Member
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!hasPermission('EMPLOYEE_MANAGE')) {
      showToast(`Permission Denied: Actor '${activeActor?.fullName}' lacks 'EMPLOYEE_MANAGE'`, 'error');
      return;
    }
    try {
      const res = await api.addEmployee(currentCompany.id, activeActor.id, newEmployee);
      showToast(`Employee '${res.data.fullName}' added successfully!`, 'success');
      setEmployees([...employees, res.data]);
      setShowAddMemberModal(false);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add employee', 'error');
    }
  };

  // Toggle permission flag for employee
  const handleTogglePermission = async (employee, perm) => {
    if (!hasPermission('EMPLOYEE_MANAGE')) {
      showToast(`Permission Denied: You need 'EMPLOYEE_MANAGE' to alter permissions.`, 'error');
      return;
    }
    const currentPerms = new Set(employee.permissions || []);
    if (currentPerms.has(perm)) {
      currentPerms.delete(perm);
    } else {
      currentPerms.add(perm);
    }

    try {
      const res = await api.updateEmployeePermissions(currentCompany.id, employee.id, activeActor.id, {
        permissions: Array.from(currentPerms)
      });
      setEmployees(employees.map(e => e.id === employee.id ? res.data : e));
      showToast(`Updated permissions for ${employee.fullName}`, 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Permission update failed', 'error');
    }
  };

  // Flow C: Create Job Post
  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!hasPermission('JOB_CREATE')) {
      showToast(`Forbidden (403): Actor '${activeActor?.fullName}' lacks 'JOB_CREATE' permission!`, 'error');
      return;
    }
    try {
      const skillList = newJob.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);
      await api.createJobPost(currentCompany.id, activeActor.id, {
        ...newJob,
        requiredSkills: skillList
      });
      showToast(`Job '${newJob.title}' posted as ${newJob.status}!`, 'success');
      setShowCreateJobModal(false);
      loadCompanyJobs(currentCompany.id, activeActor.id);
      loadPublicFeed();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to post job', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Company Switcher Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 rounded-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {currentCompany ? currentCompany.name : 'Select or Create Company'}
              </h2>
              {currentCompany && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Tenant: {currentCompany.industry || 'Technology'}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 flex items-center space-x-2 mt-0.5">
              <span>{currentCompany?.location || 'Maharashtra, IN'}</span>
              <span>•</span>
              <a href={`https://${currentCompany?.domainOrWebsite}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                {currentCompany?.domainOrWebsite || 'skillsync.local'}
              </a>
            </p>
          </div>
        </div>

        {/* Company Switcher Dropdown & Add Button */}
        <div className="flex items-center space-x-2">
          {companies.length > 0 && (
            <select
              value={currentCompany?.id || ''}
              onChange={(e) => {
                const found = companies.find(c => c.id === e.target.value);
                if (found) selectCompany(found);
              }}
              className="bg-gray-900 border border-white/10 text-xs text-gray-200 px-3 py-2 rounded-xl focus:outline-none"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}

          <button
            onClick={() => setActiveSubTab('createCompany')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30 hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Company</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveSubTab('jobs')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeSubTab === 'jobs' ? 'bg-indigo-600/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Posts Console ({companyJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('team')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeSubTab === 'team' ? 'bg-indigo-600/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team & Permissions ({employees.length})</span>
        </button>
      </div>

      {/* SUB-VIEW 1: Jobs Console */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-200">
              Company Job Listings ({currentCompany?.name})
            </h3>

            <button
              onClick={() => {
                if (!hasPermission('JOB_CREATE')) {
                  showToast(`Access Denied: Current actor lacks 'JOB_CREATE' permission!`, 'error');
                  return;
                }
                setShowCreateJobModal(true);
              }}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Job Post (JOB_CREATE)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyJobs.map(job => (
              <div key={job.id} className="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      job.status === 'PUBLISHED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {job.status}
                    </span>
                    <span className="text-[11px] text-gray-400">{job.workMode}</span>
                  </div>

                  <h4 className="text-base font-semibold text-white mt-2">{job.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{job.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills?.map(s => (
                      <span key={s} className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/20">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="text-[10px] text-gray-500 flex justify-between">
                    <span>Exp: {job.requiredExperienceYears} yrs</span>
                    <span>By: {job.createdByEmployeeName || 'Admin'}</span>
                  </div>
                </div>
              </div>
            ))}

            {companyJobs.length === 0 && (
              <div className="col-span-full glass-panel p-8 text-center rounded-xl text-gray-400 text-xs">
                No job postings created for this company yet. Click 'Create Job Post' to add one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: Team & Permissions Table */}
      {activeSubTab === 'team' && (
        <div className="glass-panel rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Employee & Permission Matrix</h3>
              <p className="text-xs text-gray-400">
                Grant or revoke granular operations. Guarded by <code className="text-cyan-400">EMPLOYEE_MANAGE</code>.
              </p>
            </div>

            <button
              onClick={() => {
                if (!hasPermission('EMPLOYEE_MANAGE')) {
                  showToast(`Access Denied: Current actor lacks 'EMPLOYEE_MANAGE' permission!`, 'error');
                  return;
                }
                setShowAddMemberModal(true);
              }}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-600/30"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Team Member</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/60 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Role Title</th>
                  <th className="py-3 px-4">Permissions (Click to Toggle)</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-white/5 transition-all">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{emp.fullName}</div>
                      <div className="text-[11px] text-gray-400">{emp.email}</div>
                    </td>

                    <td className="py-3 px-4 text-gray-300">
                      {emp.roleOrTitle}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {ALL_PERMISSIONS.map(perm => {
                          const active = emp.permissions?.includes(perm);
                          return (
                            <button
                              key={perm}
                              onClick={() => handleTogglePermission(emp, perm)}
                              className={`text-[10px] px-2 py-0.5 rounded-md font-mono transition-all border ${
                                active
                                  ? 'bg-indigo-600/30 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                                  : 'bg-gray-800 text-gray-500 border-white/5 hover:text-gray-300'
                              }`}
                            >
                              {active ? `✓ ${perm}` : perm}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: Add Company Form */}
      {activeSubTab === 'createCompany' && (
        <div className="glass-panel p-6 rounded-2xl max-w-xl mx-auto space-y-4">
          <h3 className="text-lg font-bold text-white">Flow A: Onboard New Enterprise Company</h3>
          <p className="text-xs text-gray-400">
            Provisions the company and configures the initial creator employee as a Super Admin with all permissions.
          </p>

          <form onSubmit={handleCreateCompany} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-300 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={newCompany.name}
                onChange={e => setNewCompany({ ...newCompany, name: e.target.value })}
                placeholder="e.g. Tata Advanced Systems"
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Website / Domain</label>
                <input
                  type="text"
                  value={newCompany.domainOrWebsite}
                  onChange={e => setNewCompany({ ...newCompany, domainOrWebsite: e.target.value })}
                  placeholder="tata.com"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Location / District</label>
                <input
                  type="text"
                  value={newCompany.location}
                  onChange={e => setNewCompany({ ...newCompany, location: e.target.value })}
                  placeholder="Pune"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] font-semibold text-cyan-400">Initial Super Admin Provisioning</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Founder / Admin Name</label>
                <input
                  type="text"
                  value={newCompany.creatorFullName}
                  onChange={e => setNewCompany({ ...newCompany, creatorFullName: e.target.value })}
                  placeholder="e.g. Rajesh Patil"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Admin Email</label>
                <input
                  type="email"
                  value={newCompany.creatorEmail}
                  onChange={e => setNewCompany({ ...newCompany, creatorEmail: e.target.value })}
                  placeholder="admin@tata.com"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3">
              <button
                type="button"
                onClick={() => setActiveSubTab('jobs')}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium"
              >
                Create Company & Admin
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 1: Add Employee */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Add Team Member (EMPLOYEE_MANAGE)</h3>

            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newEmployee.fullName}
                  onChange={e => setNewEmployee({ ...newEmployee, fullName: e.target.value })}
                  placeholder="e.g. Swati Deshmukh"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newEmployee.email}
                  onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  placeholder="swati@company.com"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Role Title</label>
                <input
                  type="text"
                  value={newEmployee.roleOrTitle}
                  onChange={e => setNewEmployee({ ...newEmployee, roleOrTitle: e.target.value })}
                  placeholder="Recruiter"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1.5">Initial Permissions</label>
                <div className="space-y-1">
                  {ALL_PERMISSIONS.map(p => (
                    <label key={p} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newEmployee.permissions.includes(p)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewEmployee({ ...newEmployee, permissions: [...newEmployee.permissions, p] });
                          } else {
                            setNewEmployee({ ...newEmployee, permissions: newEmployee.permissions.filter(x => x !== p) });
                          }
                        }}
                        className="rounded bg-gray-800 border-white/10 text-indigo-600 focus:ring-0"
                      />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-gray-800 text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 text-white font-medium"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Create Job Post */}
      {showCreateJobModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Create Job Post (Guarded by JOB_CREATE)</h3>
              <span className="text-[10px] text-cyan-400 font-mono">Actor: {activeActor?.fullName}</span>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Senior Java Spring Boot Architect"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Job Description *</label>
                <textarea
                  rows="3"
                  required
                  value={newJob.description}
                  onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Describe core responsibilities and technical context..."
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={newJob.requiredSkills}
                  onChange={e => setNewJob({ ...newJob, requiredSkills: e.target.value })}
                  placeholder="Java, Spring Boot, Microservices, Docker, SQL"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-gray-300 mb-1">Work Mode</label>
                  <select
                    value={newJob.workMode}
                    onChange={e => setNewJob({ ...newJob, workMode: e.target.value })}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-2 py-2 text-white"
                  >
                    <option value="ONSITE">Onsite</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="REMOTE">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Status</label>
                  <select
                    value={newJob.status}
                    onChange={e => setNewJob({ ...newJob, status: e.target.value })}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-2 py-2 text-white"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Min Exp (Yrs)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newJob.requiredExperienceYears}
                    onChange={e => setNewJob({ ...newJob, requiredExperienceYears: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-2 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateJobModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
