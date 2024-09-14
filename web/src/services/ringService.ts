import axios, { AxiosInstance } from 'axios';
import { RequestRing } from '../types/requestRing';
import { ResponseRing } from '../types/resposneRing';

class RingService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getForges(): Promise<string[]> {
    try {
      const response = await this.apiClient.get('/rings/forgers');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.error);
      }

      throw new Error(
        'Houve um erro ao buscar forjadores, tente novamente mais tarde',
      );
    }
  }

  public async getAll(): Promise<ResponseRing[]> {
    try {
      const response = await this.apiClient.get('/rings');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.error);
      }

      throw new Error(
        'Houve um erro ao buscar anéis, tente novamente mais tarde',
      );
    }
  }

  public async getById(id: string): Promise<ResponseRing> {
    try {
      const response = await this.apiClient.get(`/rings/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.error);
      }

      throw new Error(
        'Houve um erro ao buscar anel, tente novamente mais tarde',
      );
    }
  }

  public async create(ringData: RequestRing): Promise<void> {
    try {
      await this.apiClient.post('/rings', ringData);
      return;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.error);
      }

      throw new Error(
        'Houve um erro ao criar anel, tente novamente mais tarde',
      );
    }
  }

  public async update(id: string, ringData: RequestRing): Promise<void> {
    try {
      await this.apiClient.put(`/rings/${id}`, ringData);
      return;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.error);
      }

      throw new Error(
        'Houve um erro ao editar anel, tente novamente mais tarde',
      );
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/rings/${id}`);
      return;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.error);
      }

      throw new Error(
        'Houve um erro ao exluir anel, tente novamente mais tarde',
      );
    }
  }
}

export const ringServiceInstance = new RingService();
