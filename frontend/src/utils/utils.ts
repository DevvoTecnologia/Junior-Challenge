import toast from "react-hot-toast";
import type { Anel, AnelDb } from "./zod/ring";
import type { ApiResponse } from "../types/types";

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

export const getRingById = (
	ringId: string | undefined,
): Promise<AnelDb | null> => {
	return new Promise((resolve, reject) => {
		if (!ringId) return reject("ID do anel não foi fornecido");
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rings/${ringId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(async (response) => {
				const data = (await response.json()) as ApiResponse<AnelDb>;
				resolve(data.data);
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
