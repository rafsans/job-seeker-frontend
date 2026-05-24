import api from './axiosInstance';

export const getJobs = async (filters = {}) => {
  const response = await api.get('/jobs', { params: filters });
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};


export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};
