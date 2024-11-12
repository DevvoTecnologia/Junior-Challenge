import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "../../services/api";

interface Ring {
  id: number;
  nome: string;
  poder: string;
  imagem: string;
  forjadoPor: string;
  portador: string;
}

interface RingContextData {
  rings: Ring[];
  loadRings: () => void;
}

const RingContext = createContext<RingContextData>({
  rings: [],
  loadRings: () => {},
});

interface RingProviderProps {
  children: ReactNode;
}

export const RingProvider: React.FC<RingProviderProps> = ({ children }) => {
  const [rings, setRings] = useState<Ring[]>([]);

  function loadRings() {
    api.get("/ring").then((response) => setRings(response.data));
  }

  function createRing() {
    api.post("/ring").then(loadRings);
  }

  useEffect(() => {
    loadRings();
  }, []);

  return (
    <RingContext.Provider value={{ rings, loadRings }}>
      {children}
    </RingContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useRing = (): RingContextData => {
  const context = useContext(RingContext);
  if (!context) {
    throw new Error("useRing must be used within a RingProvider");
  }
  return context;
};
