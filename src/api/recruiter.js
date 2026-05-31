import api from './axiosInstance';

// ─── Company / Profile ──────────────────────────────────────────────────
export const getRecruiterProfile = async () => {
  const response = await api.get('/recruiter/profile');
  return response.data;
};

export const getPublicCompany = async (companyId) => {
  const response = await api.get(`/recruiter/company/${companyId}`);
  return response.data;
};

export const updateRecruiterProfile = async (payload) => {
  const response = await api.put('/recruiter/profile', payload);
  return response.data;
};

// ─── Jobs ───────────────────────────────────────────────────────────────
export const getRecruiterJobs = async () => {
  const response = await api.get('/recruiter/jobs');
  return response.data;
};

export const createRecruiterJob = async (payload) => {
  const response = await api.post('/recruiter/jobs', payload);
  return response.data;
};

export const updateRecruiterJob = async (jobId, payload) => {
  const response = await api.put(`/recruiter/jobs/${jobId}`, payload);
  return response.data;
};

export const deleteRecruiterJob = async (jobId) => {
  const response = await api.delete(`/recruiter/jobs/${jobId}`);
  return response.data;
};

export const getJobApplications = async (jobId) => {
  const response = await api.get(`/recruiter/jobs/${jobId}/applications`);
  return response.data;
};

export const updateApplicationStatus = async (applicationId, payload) => {
  const response = await api.patch(`/recruiter/jobs/${applicationId}/status`, payload);
  return response.data;
};

// ─── Applicants ─────────────────────────────────────────────────────────
export const getRecentApplicants = async (params = {}) => {
  const response = await api.get('/recruiter/applicants', { params });
  return response.data;
};
