import { Edit } from "lucide-react";
import "./styles.css";
import { Link } from "react-router-dom";

type Props = {
	ringId: string | undefined;
};

const EditButton = ({ ringId }: Props) => {
	return (
		<button type="button" className="edit-button">
			<Link to={`/edit/${ringId}`}>
				<Edit size={18} color="#fff" />
			</Link>
		</button>
	);
};

export default EditButton;
