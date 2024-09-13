import toast from "react-hot-toast";

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
