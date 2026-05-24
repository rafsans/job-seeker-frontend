import api from './axiosInstance';

export const savePersonalInfo = async (data) => {
  const response = await api.post('/candidate/onboarding/personal', data);
  return response.data;
};

export const saveEducationInfo = async (data) => {
  const response = await api.post('/candidate/onboarding/education', data);
  return response.data;
};

export const saveExperienceInfo = async (data) => {
  const response = await api.post('/candidate/onboarding/experience', data);
  return response.data;
};

export const saveSkillsCertsInfo = async (data) => {
  const response = await api.post('/candidate/onboarding/skills-certs', data);
  return response.data;
};

export const saveResumeInfo = async (data) => {
  const response = await api.post('/candidate/onboarding/resume', data);
  return response.data;
};

export const uploadResume = async (formData) => {
  const response = await api.put('/candidate/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getMasterSkills = async () => {
  const response = await api.get('/candidate/skills/master');
  return response.data;
};

export const getOnboardingData = async () => {
  const response = await api.get('/candidate/onboarding');
  return response.data;
};

export const saveRecruiterOnboarding = async (data) => {
  const payload = {
    name: data.name,
    description: data.description,
    industry: data.industry,
    company_size: data.companySize,
    website: data.website || '',
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    province: data.province,
    country: data.country,
    logo_url: '',
  };
  const response = await api.post('/recruiter/onboarding', payload);
  return response.data;
};

export const getRecruiterOnboarding = async () => {
  const response = await api.get('/recruiter/onboarding');
  return response.data;
};
