import type { Ring } from "@/types/ring";
import type { RingFormData } from "@/validators/ring-schema";
import { api } from "./api";

export const updateRing = async (
	id: string,
	ringData: RingFormData,
): Promise<Ring> => {
	try {
		const response = await api.put<Ring>(`/update-ring/${id}`, ringData);
		return response.data;
	} catch (error) {
		console.error("Erro ao atualizar o anel:", error);
		throw error;
	}
};
