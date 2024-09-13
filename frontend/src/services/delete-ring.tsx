import { api } from "./api";

export const deleteRing = async (id: string): Promise<void> => {
	try {
		await api.delete(`/delete-ring/${id}`);
	} catch (error) {
		console.error("Erro ao excluir o anel:", error);
		throw error;
	}
};
