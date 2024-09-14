import api from "./axiosConfig";

export const getRings = async (token: string) => {
  return api.get('/rings', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createRing = async (data: any, token: string) => {
  return api.post('/rings', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateRing = async (id: number, data: any, token: string) => {
  return api.put(`/rings/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteRing = async (id: number, token: string) => {
  return api.delete(`/rings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
