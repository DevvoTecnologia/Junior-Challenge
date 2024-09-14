import {
	createContext,
	useContext,
	type ReactNode,
	type FC,
	useState,
} from "react";
import type { Anel, AnelDb } from "../utils/zod/ring";
import type { ApiResponse } from "../types/types";
import { sendToast } from "../utils/utils";
import { parseCookies } from "nookies";

type RingContextType = {
	rings: AnelDb[];
	isPending: {
		deleteRing: boolean;
		getAllRings: boolean;
		createNewRing: boolean;
		editRing: boolean;
	};
	deleteRing: (ringId: string | undefined) => Promise<boolean>;
	createNewRing: (ring: Anel) => Promise<boolean>;
	editRing: (ringId: string | undefined, newData: Anel) => Promise<boolean>;
	getAllRings: () => Promise<void>;
};

const RingContext = createContext<RingContextType>({
	rings: [],
	isPending: {
		deleteRing: false,
		getAllRings: false,
		createNewRing: false,
		editRing: false,
	},
	deleteRing: async () => false,
	createNewRing: async () => false,
	editRing: async () => false,
	getAllRings: async () => {},
});

export const useRingContext = () => useContext(RingContext);

export const RingProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [rings, setRings] = useState<AnelDb[]>([]);
	const [isPending, setIsPending] = useState({
		deleteRing: false,
		getAllRings: false,
		createNewRing: false,
		editRing: false,
	});

	const getAllRings = async () => {
		const { userToken } = parseCookies();

		if (!userToken) return;

		setIsPending((prev) => ({
			...prev,
			getAllRings: true,
		}));

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/rings/user`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
				},
			);

			const data = (await response.json()) as ApiResponse<AnelDb[]>;
			setRings(data.data);
		} catch (error) {
			console.log(error);
			sendToast({
				message: "Ocorreu um erro ao listar os anéis",
				type: "error",
			});
		} finally {
			setIsPending((prev) => ({
				...prev,
				getAllRings: false,
			}));
		}
	};

	const editRing = async (
		ringId: string | undefined,
		newData: Anel,
	): Promise<boolean> => {
		setIsPending((prev) => ({
			...prev,
			editRing: true,
		}));

		try {
			const { userToken } = parseCookies();

			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/rings/${ringId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
					body: JSON.stringify(newData),
				},
			);

			const data = (await response.json()) as ApiResponse<AnelDb[]>;

			if (!response.ok) {
				sendToast({
					message: data.message,
					type: "error",
				});
				return false;
			}

			sendToast({
				message: data.message,
				type: "success",
			});

			getAllRings();
			return true;
		} catch (error) {
			console.log(error);
			sendToast({
				message: "Ocorreu um erro ao editar um anel",
				type: "error",
			});

			return false;
		} finally {
			setIsPending((prev) => ({
				...prev,
				editRing: false,
			}));
		}
	};

	const createNewRing = async (ring: Anel): Promise<boolean> => {
		setIsPending((prev) => ({
			...prev,
			createNewRing: true,
		}));

		try {
			const { userToken } = parseCookies();

			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/rings`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
					body: JSON.stringify(ring),
				},
			);

			const data = (await response.json()) as ApiResponse<AnelDb[]>;

			if (!response.ok) {
				sendToast({
					message: data.message,
					type: "error",
				});
				return false;
			}

			sendToast({
				message: data.message,
				type: "success",
			});

			getAllRings();
			return true;
		} catch (error) {
			console.log(error);
			sendToast({
				message: "Ocorreu um erro ao criar um anel",
				type: "error",
			});

			return false;
		} finally {
			setIsPending((prev) => ({
				...prev,
				createNewRing: false,
			}));
		}
	};

	const deleteRing = async (ringId: string | undefined): Promise<boolean> => {
		if (!ringId) return false;

		setIsPending((prev) => ({
			...prev,
			deleteRing: true,
		}));

		try {
			const { userToken } = parseCookies();

			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/rings/${ringId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
				},
			);

			const data = (await response.json()) as ApiResponse<AnelDb[]>;

			if (!response.ok) {
				sendToast({
					message: data.message,
					type: "error",
				});

				return false;
			}

			sendToast({
				message: data.message,
				type: "success",
			});

			getAllRings();
			return true;
		} catch (error) {
			console.log(error);
			sendToast({
				message: "Ocorreu um erro ao remover um anel",
				type: "error",
			});

			return false;
		} finally {
			setIsPending((prev) => ({
				...prev,
				deleteRing: false,
			}));
		}
	};

	return (
		<RingContext.Provider
			value={{
				deleteRing,
				isPending,
				createNewRing,
				editRing,
				rings,
				getAllRings,
			}}
		>
			{children}
		</RingContext.Provider>
	);
};
