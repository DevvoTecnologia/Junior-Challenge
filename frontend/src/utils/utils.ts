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
