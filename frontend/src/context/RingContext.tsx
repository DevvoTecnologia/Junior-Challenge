import {
	createContext,
	useContext,
	type ReactNode,
	type FC,
	useState,
	useCallback,
	useEffect,
} from "react";
import type { AnelDb } from "../utils/zod/ring";
import type { ApiResponse } from "../types/types";
import { sendToast } from "../utils/utils";

type RingContextType = {
	rings: AnelDb[];
	isPending: {
		deleteRing: boolean;
		getAllRings: boolean;
	};
	deleteRing: (ringId: string | undefined) => Promise<void>;
};

const RingContext = createContext<RingContextType>({
	rings: [],
	isPending: {
		deleteRing: false,
		getAllRings: false,
	},
	deleteRing: async () => {},
});

export const useRingContext = () => useContext(RingContext);

export const RingProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [rings, setRings] = useState<AnelDb[]>([]);
	const [isPending, setIsPending] = useState({
		deleteRing: false,
		getAllRings: false,
	});

	const getAllRings = useCallback(async () => {
		setIsPending({
			deleteRing: false,
			getAllRings: true,
		});
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
			setIsPending({
				deleteRing: false,
				getAllRings: false,
			});
		}
	}, []);

	useEffect(() => {
		getAllRings();
	}, [getAllRings]);

	const deleteRing = async (ringId: string | undefined) => {
		if (!ringId) return;

		try {
			setIsPending({
				deleteRing: true,
				getAllRings: false,
			});

			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/rings/${ringId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const data = (await response.json()) as ApiResponse<AnelDb[]>;

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

			setRings(data.data);
		} catch (error) {
			console.log(error);
			sendToast({
				message: "Ocorreu um erro ao remover um anel",
				type: "error",
			});
		} finally {
			setIsPending({
				deleteRing: false,
				getAllRings: false,
			});
		}
	};

	return (
		<RingContext.Provider
			value={{
				deleteRing,
				isPending,
				rings,
			}}
		>
			{children}
		</RingContext.Provider>
	);
};
