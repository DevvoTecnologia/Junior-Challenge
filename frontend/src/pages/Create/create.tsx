import { useEffect } from "react";
import FormCreateRing from "../../components/Forms/CreateRing/form-create-ring";
import "./styles.css";
import { CircleArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CreatePage = () => {
	useEffect(() => {
		document.title = "Desafio Júnior | Criar um anel";
	}, []);

	return (
		<main className="container centralize">
			<button className="back-button" type="button">
				<Link to="/">
					<CircleArrowLeft color="#fff" size={20} />
				</Link>
			</button>
			<FormCreateRing />
		</main>
	);
};

export default CreatePage;
