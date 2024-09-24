import { useEffect, useState } from "react";
import { Ring } from "../@types/ring";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const useRings = () => {
  const [rings, setRings] = useState<Ring[]>([]);

  useEffect(() => {
    loadRings();
  }, []);

  const loadRings = async () => {
    const { data } = await api.get("/rings");
    setRings(data);
  };

  const addRing = async (ring: Omit<Ring, "id">) => {
    try {
      const { data } = await api.post("/rings", ring);
      setRings((prevState) => [...prevState, data]);
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  };

  const updateRing = async (id: number, updateRing: Omit<Ring, "id">) => {
    try {
      await api.put(`/rings/${id}`, updateRing);
      const ringsUpdated = rings.map((ring) =>
        ring.id === id ? { ...ring, updateRing } : ring
      );
      setRings(ringsUpdated);
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  };

  const deleteRing = async (id: number) => {
    await api.delete(`/rings/${id}`);
    const newRings = rings.filter((ring) => ring.id !== id);
    setRings(newRings);
  };

  return { rings, addRing, updateRing, deleteRing };
};
