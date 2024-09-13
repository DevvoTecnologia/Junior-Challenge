import axios from 'axios';
import { create } from 'zustand';
import { useUser } from './use-user.ts';
import { CreateRingType, Ring } from '@/types/Ring.ts';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/rings`;

type RingProps = {
  rings: Ring[];
  loading: boolean;
  error: string | null;
  fetchRings: (order?: 'asc' | 'desc') => Promise<void>;
  createRing: (ringData: CreateRingType) => Promise<Ring | { error: string }>; // Assinatura correta
  updateRing: (ringId: number, ringData: Partial<Ring>) => Promise<void>;
  deleteRing: (ringId: number) => Promise<void>;
};

export const useRings = create<RingProps>((set, get) => ({
  rings: [],
  loading: false,
  error: null,

  fetchRings: async (order = 'desc') => {
    const user = useUser.getState().user;

    if (!user) {
      set({ error: 'User is not authenticated' });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await axios.get<Ring[]>(baseUrl, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { order },
      });
      set({ rings: response.data });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching rings';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  createRing: async (ringData) => {
    const user = useUser.getState().user;

    if (!user) {
      set({ error: 'User is not authenticated' });
      return { error: 'User is not authenticated' };
    }
    try {
      const response = await axios.post<Ring>(baseUrl, ringData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      set((state) => ({ rings: [...state.rings, response.data] }));
      console.log(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating ring';
      set({ error: errorMessage });
      return { error: errorMessage };
    }
  },

  updateRing: async (ringId, ringData) => {
    const user = useUser.getState().user;

    if (!user) {
      set({ error: 'User is not authenticated' });
      return;
    }

    try {
      const response = await axios.put<Ring>(`${baseUrl}/${ringId}`, ringData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      set((state) => ({
        rings: state.rings.map((ring) =>
          ring.id === response.data.id ? response.data : ring
        ),
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating ring';
      set({ error: errorMessage });
    }
  },

  deleteRing: async (ringId) => {
    const user = useUser.getState().user;

    if (!user) {
      set({ error: 'User is not authenticated' });
      return;
    }

    try {
      await axios.delete(`${baseUrl}/${ringId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      set((state) => ({ rings: state.rings.filter((ring) => ring.id !== ringId) }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting ring';
      set({ error: errorMessage });
    }
  },
}));
