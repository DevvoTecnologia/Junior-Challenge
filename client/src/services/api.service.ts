import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 10000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const { response } = error;
		if (response.status >= 400 && response.status < 600) {
			alert(`Erro ${response.status}: ${response.data.message}`);
		}
		return Promise.reject(error);
	}
);

export default api;
