import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { CreateRingFormState } from "../components/Form/Form";
import { ringAPI } from "../api/api";

type CreateRingState = {
  _id: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
};

type RingContextType = {
  editingRingId: string | null;
  setEditingRingId: (id: string | null) => void;
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  showEditOverlay: boolean;
  setShowEditOverlay: (show: boolean) => void;
  formData: CreateRingFormState;
  setFormData: React.Dispatch<React.SetStateAction<CreateRingFormState>>;
  rings: CreateRingState[]; 
  fetchRings: () => void; 
}
const RingContext = createContext<RingContextType | undefined>(undefined);

export const RingProvider = ({ children }: { children: ReactNode }) => {
  const [editingRingId, setEditingRingId] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [showEditOverlay, setShowEditOverlay] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateRingFormState>({
    nome: "",
    poder: "",
    portador: "",
    forjadoPor: "",
  });
  const [rings, setRings] = useState<CreateRingState[]>([]);

  const fetchRings = async () => {
    try {
      const data = await ringAPI.getRings();
      data.reverse();
      setRings(data);
    } catch (error) {
      console.error("Erro ao buscar anéis:", error);
    }
  };


  useEffect(() => {
    fetchRings();
  }, []);

  return (
    <RingContext.Provider
      value={{
        editingRingId,
        setEditingRingId,
        showOverlay,
        setShowOverlay,
        showEditOverlay,
        setShowEditOverlay,
        formData,
        setFormData,
        rings, 
        fetchRings, 
      }}
    >
      {children}
    </RingContext.Provider>
  );
};

export const useRingContext = () => {
  const context = useContext(RingContext);
  if (!context) {
    throw new Error("useRingContext deve ser usado dentro de RingProvider");
  }
  return context;
};
