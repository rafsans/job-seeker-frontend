import api from './axiosInstance';

// Mengambil list pekerjaan (Public/Candidate)
export const getJobs = async (filters = {}) => {
  const response = await api.get('/jobs', { params: filters });
  return response.data;
};

// Mengambil detail pekerjaan (Public/Candidate)
export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/detail/${jobId}`);
  return response.data;
};

// Candidate: Apply ke job
export const applyJob = async (payload) => {
  const response = await api.post('/jobs/apply', payload);
  return response.data;
};

// Candidate: Save job
export const saveJob = async (payload) => {
  const response = await api.post('/jobs/save', payload);
  return response.data;
};

// Candidate: Unsave job
export const unsaveJob = async (jobId) => {
  const response = await api.delete(`/jobs/save/${jobId}`);
  return response.data;
};

// Candidate: Get saved jobs
export const getSavedJobs = async () => {
  const response = await api.get('/jobs/saved');
  return response.data;
};

// Candidate: Get applications
export const getMyApplications = async () => {
  const response = await api.get('/jobs/applications');
  return response.data;
};
