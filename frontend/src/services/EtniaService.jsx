import axios from 'axios';
import { API_URL } from './AnelService';

export const getEtnias = async () => {
  try {
    const response = await axios.get(`${API_URL}/etnia/listar`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Falha ao retornar as etnias');
  }
};
