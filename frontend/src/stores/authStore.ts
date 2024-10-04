import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/auth";
const API_URL_USERS = "http://localhost:3000";

interface Anel {
	id: number;
	nome: string;
	poder: string;
	portador: string;
	forjadoPor: string;
	imagem: string;
}

interface User {
	id: number;
	nome: string;
	email: string;
	access_token: string;
	aneis: Anel[];
}

interface AuthState {
	user: User | null;
	login: (email: string, senha: string) => Promise<void>;
	register: (nome: string, email: string, senha: string) => Promise<void>;
	logout: () => void;
	isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: JSON.parse(localStorage.getItem("user") || "null"),

	login: async (email: string, senha: string) => {
		const response = await axios.post(`${API_URL}/login`, { email, senha });
		if (response.data.access_token) {
			const userData: User = {
				id: response.data.id,
				nome: response.data.nome,
				email: response.data.email,
				access_token: response.data.access_token,
				aneis: response.data.aneis,
			};
			localStorage.setItem("user", JSON.stringify(userData));
			set({ user: userData });
		}
	},

	register: async (nome: string, email: string, senha: string) => {
		const response = await axios.post(`${API_URL_USERS}/users`, {
			nome,
			email,
			senha,
		});
		if (response.data) {
			return response.data;
		}
	},

	logout: () => {
		localStorage.removeItem("user");
		set({ user: null });
	},

	isAuthenticated: () => {
		return get().user !== null;
	},
}));
