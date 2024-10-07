import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createRing = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/rings`, data);
    return response.data;
  } catch (error) {
    // throw error.response?.data || 'Erro ao enviar os dados';
  }
};