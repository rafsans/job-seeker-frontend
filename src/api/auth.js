import api from './axiosInstance';

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data && response.data.data && response.data.data.token) {
    localStorage.setItem('token', response.data.data.token);
  }
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
