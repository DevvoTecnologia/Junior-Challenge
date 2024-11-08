import axios from 'axios';
import { API_URL } from './AnelService';

export const getPortadores = async () => {
  try {
    const response = await axios.get(`${API_URL}/portador/listar`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Falha ao retornar os portadores');
  }
};
