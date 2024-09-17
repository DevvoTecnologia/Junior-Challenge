import axios, { AxiosResponse } from 'axios';
import { CreateRingFormState } from '../components/Form/Form';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/rings',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

type CreateRingState = {
  _id: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
}; 
const resBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(resBody),
  post: (url: string, body: CreateRingFormState) =>
    instance.post(url, JSON.stringify(body))
      .then(resBody)
      .catch((error) => {
        console.error('Erro ao criar anel:', error.response.data);
      }),
  put: (url: string, body: {}) => instance.put(url, body).then(resBody),
  delete: (url: string) => instance.delete(url).then(resBody),
};

export const ringAPI = {
  getRings: (): Promise<CreateRingState[]> => requests.get(''),
  getRing: (id: string): Promise<CreateRingFormState> => requests.get(`/${id}`),
  createRing: (ring: CreateRingFormState): Promise<CreateRingFormState> => requests.post('', ring),
  updateRing: (ring: CreateRingFormState, id: string): Promise<CreateRingFormState> =>
    requests.put(`/${id}`, ring),
  deleteRing: (id: string): Promise<void> => requests.delete(`/${id}`),
};