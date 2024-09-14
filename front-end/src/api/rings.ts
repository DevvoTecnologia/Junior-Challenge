import { api } from "./services/service";

export interface RingBase {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: 'Elfos' | 'Anões' | 'Homens' | 'Sauron';
    imagem: string;
}

export interface Ring extends RingBase {
    id: number;
}

export interface RingForCreation extends RingBase {}


export const getRings = async (): Promise<Ring[]> => {
    try {
        const response = await api({
            method: "get",
            url: "/api/anel",
        });

        if (response && response.data) {
            return response.data as Ring[];
        } else {
            throw new Error("Resposta da API não contém dados.");
        }
    } catch (error: any) {
        console.error("Erro ao buscar serviços:", error);
        throw error;
    }
};

export const addRing = async (ring: RingForCreation) => {

    if (!ring.nome || !ring.poder || !ring.portador || !ring.forjadoPor || !ring.imagem) {
        throw new Error("Por favor, preencha todos os campos.");
    }
    
    try {
        const response = await api({
            method: "post",
            url: "/api/anel",
            body: ring
        });
        
        return response
        
    } catch (error: any) {
        throw new Error(error.message || 'Erro ao adicionar o anel.');
    }
};

export const updateRing = async (ringId: number, updatedRing: Ring) => {
    try {
        const response = await api({
            method: "put",
            url: `/api/anel/${ringId}`,
            body: updatedRing
        });

        if (response.data && typeof response.data === 'string') {
            throw new Error(response.data);
        }
    } catch (error: any) {
        throw new Error(error.message || 'Erro ao adicionar o anel.');
    }
};

export const getRingById = async (ringId: number): Promise<Ring> => {
    try {
        const response = await api({
            method: "get",
            url: `/api/anel/${ringId}`,
        });

        if (response && response.data) {
            return response.data as Ring;
        } else {
            throw new Error("Resposta da API não contém dados.");
        }
    } catch (error: any) {
        console.error("Erro ao buscar anel:", error);
        throw new Error(error.message || 'Erro ao buscar o anel.');
    }
};

export const deleteRing = async (ringId:number, updateRings: (rings: Ring[]) => void ) => {
    try {
        const response = await api({
            method: "delete",
            url: `/api/anel/${ringId}`,
        });
        const updatedRings = await getRings();
        updateRings(updatedRings);
        
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar serviço:", error);
        throw error;
    }
};