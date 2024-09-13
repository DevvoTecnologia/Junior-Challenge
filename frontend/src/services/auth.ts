import { api } from "./api";

interface AuthResponse {
	token: string;
	user: {
		id: string;
		username: string;
	};
}

export const login = async (
	username: string,
	password: string,
): Promise<AuthResponse> => {
	try {
		const response = await api.post<AuthResponse>("/login", {
			username,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Erro ao fazer login:", error);
		throw error;
	}
};

export const signUp = async (username: string, password: string) => {
	try {
		const response = await api.post("/register", { username, password });
		return response.data;
	} catch (error) {
		console.error("Erro ao cadastrar:", error);
		throw error;
	}
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
};

export const isAuthenticated = (): boolean => {
	return !!localStorage.getItem("token");
};

export const getToken = (): string | null => {
	return localStorage.getItem("token");
};

export const getUser = (): { id: string; username: string } | null => {
	const userStr = localStorage.getItem("user");
	return userStr ? JSON.parse(userStr) : null;
};

export const checkAuthStatus = (): boolean => {
	const token = localStorage.getItem("token");
	const user = localStorage.getItem("user");
	return !!token && !!user;
};
