import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { Anel, CreateAnelDto } from "@/types/anel";
import { useAuthStore } from "./authStore";

interface AnelState {
	aneis: Anel[];
	loading: boolean;
	error: string | null;
	fetchAneis: () => Promise<void>;
	createAnel: (anelData: CreateAnelDto) => Promise<Anel>;
	updateAnel: (id: number, anelData: Partial<CreateAnelDto>) => Promise<Anel>;
	deleteAnel: (id: number) => Promise<void>;
}

export const useAnelStore = create<AnelState>((set) => ({
	aneis: [],
	loading: false,
	error: null,

	fetchAneis: async () => {
		set({ loading: true, error: null });
		try {
			const authStore = useAuthStore.getState();
			const response = await axios.get<Anel[]>("http://localhost:3000/aneis", {
				headers: { Authorization: `Bearer ${authStore.user?.access_token}` },
			});
			set({ aneis: response.data, loading: false });
		} catch (err) {
			set({ error: "Erro ao buscar anéis", loading: false });
			console.error(err);
		}
	},

	createAnel: async (anelData: CreateAnelDto): Promise<Anel> => {
		set({ loading: true, error: null });
		try {
			const authStore = useAuthStore.getState();
			const response = await axios.post<Anel>(
				"http://localhost:3000/aneis",
				anelData,
				{
					headers: { Authorization: `Bearer ${authStore.user?.access_token}` },
				},
			);
			set((state) => ({
				aneis: [...state.aneis, response.data],
				loading: false,
			}));
			return response.data;
		} catch (err) {
			set({ error: "Erro ao criar anel", loading: false });
			console.error(err);
			throw err;
		}
	},

	updateAnel: async (id: number, anelData: Partial<CreateAnelDto>) => {
		set({ loading: true, error: null });
		try {
			const authStore = useAuthStore.getState();
			const response = await axios.put<Anel>(
				`http://localhost:3000/aneis/${id}`,
				anelData,
				{
					headers: { Authorization: `Bearer ${authStore.user?.access_token}` },
				},
			);
			const updatedAnel = response.data;
			set((state) => ({
				aneis: state.aneis.map((anel) => (anel.id === id ? updatedAnel : anel)),
				loading: false,
			}));
			return updatedAnel;
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const axiosError = err as AxiosError<{ message: string }>;
				if (axiosError.response) {
					set({
						error: axiosError.response.data.message || "Erro ao atualizar anel",
						loading: false,
					});
				} else {
					set({ error: "Erro de rede ao atualizar anel", loading: false });
				}
			} else {
				set({ error: "Erro inesperado ao atualizar anel", loading: false });
			}
			throw err;
		}
	},

	deleteAnel: async (id: number) => {
		set({ loading: true, error: null });
		try {
			const authStore = useAuthStore.getState();
			await axios.delete(`http://localhost:3000/aneis/${id}`, {
				headers: { Authorization: `Bearer ${authStore.user?.access_token}` },
			});
			set((state) => ({
				aneis: state.aneis.filter((anel) => anel.id !== id),
				loading: false,
			}));
		} catch (err) {
			set({ error: "Erro ao deletar anel", loading: false });
			console.error(err);
		}
	},
}));
