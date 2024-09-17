import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/axios";
import { IRing } from "../@types/IRing";
import { ERROR, SUCCESS } from "../constants";

interface RingProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  rings: IRing[];
  getRingList(): Promise<void>;
  handleEditRing: (data: IRing) => void;
  handleDeleteRing: (id: string) => Promise<void>;
  handleCreateRing: (data: IRing) => Promise<void>;
}

export const RingContext = createContext({} as ContextProps);

export function RingProvider({ children }: RingProviderProps) {
  const [rings, setRings] = useState<IRing[]>([]);

  const getRingList = async () => {
    return await api.get<IRing[]>('/').then(response => setRings(response.data));
  }

  const handleCreateRing = async (data: IRing) => {
    try {
      await api.post('/ring', data).then(() => {
        toast("Novo anel criado!", SUCCESS);
        getRingList();
      }).catch(() => {
        toast("Ops, algo deu errado!", ERROR);
      })
    } catch (error) {
      console.log(error)
      toast("Ops, algo deu errado!", ERROR);
    }
  }

  const handleEditRing = async (data: IRing) => {
    try {
      await api.put<IRing>(`/ring/${data.id}`, {
        name: data.name,
        carrier: data.carrier,
        forged: data.forged,
        power: data.power,
      }).catch(error => {
        console.log("Error", error);
        toast("Ops, algo deu errado!", ERROR);
      })
      toast("Anel atualizado com sucesso!", SUCCESS);

      getRingList();
    } catch (error) {
      console.log(error)
      toast("Ops, algo deu errado!", ERROR);
    }
  }

  const handleDeleteRing = async (id: string) => {
    await api.delete<IRing>(`/ring/${id}`).then(() => {
      toast("Anel deletado!", SUCCESS);
      getRingList();
    }).catch(() => {
      toast("Ops, algo deu errado!", ERROR);
    });
  }

  useEffect(() => {
    getRingList();
  }, []);

  return (
    <RingContext.Provider value={{
      rings,
      getRingList,
      handleEditRing,
      handleDeleteRing,
      handleCreateRing
    }}>
      {children}
    </RingContext.Provider>
  )
}