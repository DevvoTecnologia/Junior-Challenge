import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create({
	baseURL: "http://localhost:3000/",
});

api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
