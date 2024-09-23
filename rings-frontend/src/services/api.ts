import axios, { AxiosResponse } from 'axios';
import { IRing } from '../types/Ring'; 

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL  
});

const handleApiError = (error: any) => {
  if (error.response) {
    return { success: false, error: error.response.data }; 
  } else {
    return { success: false, error: 'Erro de conexão com o servidor.' };
  }
};

export const getRings = async (): Promise<{ success: boolean, data?: IRing[], error?: any }> => {
  try {
    const response: AxiosResponse<IRing[]> = await api.get('/rings');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: [] };
  }
};

export const createRing = async (data: IRing): Promise<{ success: boolean, data?: IRing, error?: any }> => {
  try {
    const response: AxiosResponse<IRing> = await api.post('/rings', data);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateRing = async (id: string, data: IRing): Promise<{ success: boolean, data?: IRing, error?: any }> => {
  try {
    const response: AxiosResponse<IRing> = await api.put(`/rings/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteRing = async (id: string): Promise<{ success: boolean, error?: any }> => {
  try {
    await api.delete(`/rings/${id}`);
    return { success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export default api;
