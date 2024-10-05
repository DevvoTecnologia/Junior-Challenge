import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			useAuthStore.getState().logout();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
