import axios from 'axios';
import { RingFormState } from '../types/Rings'; 
import { getRingImage } from '../utils/getRingImage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post('/auth/validate', {token});
    return response.data;
  },
  signin: async (email: string, password: string) => {
    const response = await api.post('/auth/login', {email, password});
    return response;
  },
  register: async (email: string, password: string, username: string) => {
    const response = await api.post('/auth/register', {email, password, username});
    return response;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  createRing: async (ringData: RingFormState) => {
    const { ringname, description, carrier, forgedby,} = ringData;
    const image = getRingImage(forgedby);
    const response = await api.post('/ring/create', {ringname, description, carrier, forgedby, image});
    return response;
  },

  listRings: async () => {
    const response = await api.get('/rings');
    return response.data;
  },

  getRing: async (id: string) => {
    const response = await api.post(`/ring/${id}`);
    return response;
  },

  updateRing: async (id: string, ringData: RingFormState) => {
    const { ringname, description, carrier, forgedby } = ringData;
    const image = getRingImage(forgedby);
    const response = await api.patch(`/ring/${id}`, {ringname, description, carrier, forgedby, image});
    return response;
  },

  deleteRing: async (id: string) => {
    const response = await api.delete(`/ring/${id}`);
    return response;
  },
})