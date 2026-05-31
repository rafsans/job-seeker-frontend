import api from './axiosInstance';

export const getAllCategories = async () => {
  const response = await api.get('/master/categories');
  return response.data.data; // assuming { success: true, data: [...] }
};
