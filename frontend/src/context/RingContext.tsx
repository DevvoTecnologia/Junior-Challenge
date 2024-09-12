import {
	createContext,
	useState,
	useContext,
	type ReactNode,
	type FC,
	useEffect,
	useCallback,
} from "react";
import type { Anel, AnelDb } from "../utils/zod/ring";
import type { ApiResponse } from "../types/types";
import { sendToast } from "../utils/utils";

type RingContextType = {
	rings: AnelDb[];
	pendingRings: boolean;
	pendingRemoveRing: boolean;
	deleteRing: (ringId: string | undefined) => Promise<void>;
};

const RingContext = createContext<RingContextType>({
	rings: [],
	pendingRemoveRing: false,
	pendingRings: false,
	deleteRing: async () => {},
});

export const useRingContext = () => useContext(RingContext);

export const RingProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [rings, setRings] = useState<AnelDb[]>([]);
	const [pendingRings, setPendingRings] = useState<boolean>(false);
	const [pendingRemoveRing, setPendingRemoveRing] = useState<boolean>(false);

	const fetchRings = useCallback(async () => {
		setPendingRings(true);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/rings`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			const data = (await response.json()) as ApiResponse<AnelDb[]>;
			setRings(data.data);
		} finally {
			setPendingRings(false);
		}
	}, []);

	useEffect(() => {
		fetchRings();
	}, [fetchRings]);

	const deleteRing = async (ringId: string | undefined) => {
		if (!ringId) return;

		try {
			setPendingRemoveRing(true);

			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/rings/${ringId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const data = (await response.json()) as ApiResponse<Anel>;

			if (!response.ok) {
				sendToast({
					message: data.message,
					type: "error",
				});
				return;
			}

			sendToast({
				message: data.message,
				type: "success",
			});

			await fetchRings();
		} catch (error) {
			console.log(error);
			sendToast({
				message: "Ocorreu um erro ao remover um anel",
				type: "error",
			});
		} finally {
			setPendingRemoveRing(false);
		}
	};

	return (
		<RingContext.Provider
			value={{
				deleteRing,
				rings,
				pendingRemoveRing,
				pendingRings,
			}}
		>
			{children}
		</RingContext.Provider>
	);
};
