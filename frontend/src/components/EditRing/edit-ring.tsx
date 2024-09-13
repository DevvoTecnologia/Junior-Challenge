import { Edit } from "lucide-react";
import "./styles.css";

type Props = {
	ringId: string | undefined;
};

const EditRing = ({ ringId }: Props) => {
	return (
		<button type="button" className="edit-button">
			<a href={`/edit/${ringId}`}>
				<Edit size={18} color="#fff" />
			</a>
		</button>
	);
};

export default EditRing;
