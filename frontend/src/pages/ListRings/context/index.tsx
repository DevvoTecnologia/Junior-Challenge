import NAVIGATION_CONSTANTS from "@/constants/navigation";
import { RingServices } from "@/services/rings";
import { IRings } from "@/types/IRings";
import {
	createContext,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface IRingsContext {
	allRings?: IRings[];
	handleEditRing: (id: string) => void;
	showModalDelete: boolean;
	setShowModalDelete: React.Dispatch<SetStateAction<boolean>>;
	dataToDelete?: IRings;
	setDataToDelete: React.Dispatch<SetStateAction<IRings | undefined>>;
	loading: boolean;
	setLoading: React.Dispatch<SetStateAction<boolean>>;
	handleDeleteRing: (id: string) => Promise<any>;
	handleCreateRing: () => void;
}

interface IRingsProvider {
	children: ReactNode;
}

export const RingsContext = createContext<IRingsContext>({} as IRingsContext);

export function RingsProvider({ children }: IRingsProvider) {
	const navigate = useNavigate();
	const [allRings, setAllRings] = useState<IRings[]>();
	const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
	const [dataToDelete, setDataToDelete] = useState<IRings | undefined>(
		undefined
	);
	const [loading, setLoading] = useState<boolean>(false);

	const getAllRings = async () => {
		const allRingsGetted = await RingServices.getAll();

		setAllRings(allRingsGetted.data);
	};

	const handleDeleteRing = async (id: string): Promise<any> => {
		await RingServices.delete(id);
	};

	const handleEditRing = async (id: string) => {
		const urlEdit: any = NAVIGATION_CONSTANTS.RING_EDIT;
		const urlSplittedEdit = urlEdit.split("/:", [1]);

		navigate(`${urlSplittedEdit}/${id}`);
	};

	const handleCreateRing = async () => {
		navigate(NAVIGATION_CONSTANTS.RINGS_NEW);
	};

	useEffect(() => {
		getAllRings();
	}, []);

	return (
		<>
			<RingsContext.Provider
				value={{
					allRings,
					handleEditRing,
					showModalDelete,
					setShowModalDelete,
					dataToDelete,
					setDataToDelete,
					handleDeleteRing,
					loading,
					setLoading,
					handleCreateRing,
				}}
			>
				{children}
			</RingsContext.Provider>
		</>
	);
}

export const useListRings = () => {
	const context = useContext(RingsContext);

	if (!context) {
		throw new Error("useListRings must be used with RingsContext");
	}

	return context;
};
