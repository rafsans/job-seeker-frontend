import api from './axiosInstance';

export const getCandidateProfile = async () => {
  const res = await api.get('/candidate/profile/me');
  return res.data.data;
};


export const updateCandidateProfile = async (payload) => {
  const res = await api.put('/candidate/profile', payload);
  return res.data.data;
};


export const getEducations = async () => {
  const res = await api.get('/candidate/educations');
  return res.data.data;
};

export const createEducation = async (payload) => {
  const res = await api.post('/candidate/educations', payload);
  return res.data.data;
};

export const updateEducation = async (id, payload) => {
  const res = await api.put(`/candidate/educations/${id}`, payload);
  return res.data.data;
};

export const deleteEducation = async (id) => {
  const res = await api.delete(`/candidate/educations/${id}`);
  return res.data;
};

export const getExperiences = async () => {
  const res = await api.get('/candidate/experiences');
  return res.data.data;
};

export const createExperience = async (payload) => {
  const res = await api.post('/candidate/experiences', payload);
  return res.data.data;
};

export const updateExperience = async (id, payload) => {
  const res = await api.put(`/candidate/experiences/${id}`, payload);
  return res.data.data;
};

export const deleteExperience = async (id) => {
  const res = await api.delete(`/candidate/experiences/${id}`);
  return res.data;
};

export const getCandidateSkills = async () => {
  const res = await api.get('/candidate/skills');
  return res.data.data;
};
export const getAllSkills = async () => {
  const res = await api.get('/candidate/skills/master');
  return res.data.data;
};
export const addSkill = async (skillIds) => {
  const res = await api.post('/candidate/skills', { skills: skillIds });
  return res.data;
};

export const removeSkill = async (id) => {
  const res = await api.delete(`/candidate/skills/${id}`);
  return res.data;
};

export const getCertifications = async () => {
  const res = await api.get('/candidate/certifications');
  return res.data.data;
};

export const createCertification = async (payload) => {
  const res = await api.post('/candidate/certifications', payload);
  return res.data.data;
};

export const updateCertification = async (id, payload) => {
  const res = await api.put(`/candidate/certifications/${id}`, payload);
  return res.data.data;
};

export const deleteCertification = async (id) => {
  const res = await api.delete(`/candidate/certifications/${id}`);
  return res.data;
};
