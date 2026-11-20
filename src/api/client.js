import axios from 'axios';

// Direct binding to the Spring Boot REST Backend
const API_BASE_URL = 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Health
  checkHealth: () => apiClient.get('/health'),

  // Companies & Employees
  getCompanies: () => apiClient.get('/companies'),
  getCompanyById: (id) => apiClient.get(`/companies/${id}`),
  createCompany: (data) => apiClient.post('/companies', data),
  getEmployees: (companyId, actorId) => 
    apiClient.get(`/companies/${companyId}/employees`, {
      headers: { 'X-Actor-Employee-Id': actorId }
    }),
  addEmployee: (companyId, actorId, data) => 
    apiClient.post(`/companies/${companyId}/employees`, data, {
      headers: { 'X-Actor-Employee-Id': actorId }
    }),
  updateEmployeePermissions: (companyId, employeeId, actorId, data) => 
    apiClient.patch(`/companies/${companyId}/employees/${employeeId}`, data, {
      headers: { 'X-Actor-Employee-Id': actorId }
    }),

  // Jobs
  getCompanyJobs: (companyId, actorId, status) => 
    apiClient.get(`/companies/${companyId}/jobs`, {
      params: status ? { status } : {},
      headers: { 'X-Actor-Employee-Id': actorId }
    }),
  createJobPost: (companyId, actorId, data) => 
    apiClient.post(`/companies/${companyId}/jobs`, data, {
      headers: { 'X-Actor-Employee-Id': actorId }
    }),
  updateJobPost: (companyId, jobId, actorId, data) => 
    apiClient.patch(`/companies/${companyId}/jobs/${jobId}`, data, {
      headers: { 'X-Actor-Employee-Id': actorId }
    }),
  getPublicJobFeed: () => apiClient.get('/jobs/feed'),

  // Resumes & Candidates
  uploadResume: (formData) => 
    apiClient.post('/candidates/upload-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  getCandidates: () => apiClient.get('/candidates'),

  // Matching & Bias Audit
  evaluateSingle: (candId, jobId) => apiClient.post(`/matching/evaluate/${candId}/${jobId}`),
  evaluateAllAndAudit: (jobId) => apiClient.post(`/matching/evaluate-all/${jobId}`),
  getBiasReport: (jobId) => apiClient.get(`/matching/bias-audit/${jobId}`),

  // Curriculum & Analytics
  getGapAnalysis: (candId, jobId) => apiClient.get(`/curriculum/gap-analysis/${candId}/${jobId}`),
  getRegionalDeficits: (district) => apiClient.get(`/curriculum/regional-deficits`, { params: { district } }),
  getPlatformOverview: () => apiClient.get('/analytics/overview'),
};

export default apiClient;
