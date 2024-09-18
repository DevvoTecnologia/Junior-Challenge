import { create } from 'zustand';
import axios from 'axios';
import { Ring } from '@/types/Ring.ts';
import { useUser } from './use-user.ts';

interface RingState {
  rings: Ring[];
  loading: boolean;
  error: string | null;
  fetchRings: () => Promise<void>;
  createRing: (ringData: Omit<Ring, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Ring>;
  updateRing: (
    ringId: number,
    ringData: Partial<Omit<Ring, 'id' | 'createdAt' | 'updatedAt'>>
  ) => Promise<Ring>;
  deleteRing: (ringId: number) => Promise<boolean>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useRings = create<RingState>((set) => ({
  rings: [],
  loading: false,
  error: null,

  fetchRings: async () => {
    set({ loading: true, error: null });
    const { user } = useUser.getState();
    if (!user) {
      throw new Error('User must be logged in to create a ring.');
    }
    try {
      const response = await axios.get(`${baseUrl}/rings`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      set({ rings: response.data });
    } catch (error: any) {
      set({ error: error.message || 'Error fetching rings' });
    } finally {
      set({ loading: false });
    }
  },

  createRing: async (ringData) => {
    set({ loading: true });
    const { user } = useUser.getState();

    if (!user) {
      throw new Error('Você deve estar logado para criar um anel.');
    }

    try {
      const data = {
        ...ringData,
        bearer: user.user.id,
        forgedBy: user.user.id,
      };

      const response = await axios.post(`${baseUrl}/rings`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      set((state) => ({ rings: [...state.rings, response.data] }));
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || error.message || 'Erro ao criar o anel'
      );
    } finally {
      set({ loading: false });
    }
  },

  updateRing: async (ringId, ringData) => {
    const { user } = useUser.getState();
    if (!user) {
      throw new Error('User must be logged in to update a ring.');
    }

    set({ loading: true });
    try {
      const response = await axios.put(`${baseUrl}/rings/${ringId}`, ringData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      set((state) => ({
        rings: state.rings.map((ring) => (ring.id === ringId ? response.data : ring)),
      }));
      return response.data;
    } catch (error: any) {
      set({ error: error.message || 'Error updating ring' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteRing: async (ringId) => {
    const { user } = useUser.getState();
    if (!user) {
      throw new Error('User must be logged in to delete a ring.');
    }

    set({ loading: true });
    try {
      const result = await axios.delete(`${baseUrl}/rings/${ringId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      set((state) => ({ rings: state.rings.filter((ring) => ring.id !== ringId) }));
      return true;
    } catch (error: any) {
      set({ error: error.message || 'Error deleting ring' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
