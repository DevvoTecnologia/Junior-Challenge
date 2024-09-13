import { Trash } from "lucide-react";
import "./styles.css";
import Spinner from "../Spinner/spinner";
import { useRingContext } from "../../context/RingContext";

type Props = {
	ringId: string | undefined;
};

const RemoveRing = ({ ringId }: Props) => {
	const { deleteRing, isPending } = useRingContext();

	return (
		<button
			onClick={() => deleteRing(ringId)}
			type="button"
			className="remove-button"
		>
			{isPending.deleteRing ? <Spinner /> : <Trash size={18} color="#fff" />}
		</button>
	);
};

export default RemoveRing;
