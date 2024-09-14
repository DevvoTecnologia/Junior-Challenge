import api from "./axiosConfig";

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data.token;
};

export const signup = async (data: { name: string; email: string; password: string }) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};
