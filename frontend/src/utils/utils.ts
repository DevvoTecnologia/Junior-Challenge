import toast from "react-hot-toast";
import type { Anel } from "./zod/ring";

export const sendToast = ({
	message,
	type,
}: { message: string; type: "error" | "success" }) => {
	if (type === "success") {
		return toast.success(message, {
			position: "bottom-right",
			duration: 5000,
			style: { border: "2px solid #171717" },
		});
	}

	return toast.error(message, {
		position: "bottom-right",
		duration: 5000,
		style: { border: "2px solid #171717" },
	});
};

export const createNewRing = (formData: Anel): Promise<Response> => {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rings`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then(async (response) => {
				resolve(response);
			})
			.catch((error) => {
				sendToast({
					message: "Ocorreu um erro ao enviar o formulário",
					type: "error",
				});
				reject(error);
			});
	});
};

export const getRingById = (ringId: string | undefined): Promise<Response> => {
	return new Promise((resolve, reject) => {
		if (!ringId) return reject("ID do anel não foi fornecido");
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rings/${ringId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(async (response) => {
				resolve(response);
			})
			.catch((error) => {
				sendToast({
					message: "Ocorreu um erro ao buscar o anel",
					type: "error",
				});
				reject(error);
			});
	});
};

export const editRing = (
	ringId: string | undefined,
	newData: Anel,
): Promise<Response> => {
	return new Promise((resolve, reject) => {
		if (!ringId || !newData) return reject("Dados inválidos");

		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rings/${ringId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newData),
		})
			.then(async (response) => {
				resolve(response);
			})
			.catch((error) => {
				sendToast({
					message: "Ocorreu um erro ao editar um anel",
					type: "error",
				});
				reject(error);
			});
	});
};
