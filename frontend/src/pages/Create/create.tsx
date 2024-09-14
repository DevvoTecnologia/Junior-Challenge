import { useEffect } from "react";
import FormCreateRing from "../../components/Forms/CreateRing/form-create-ring";
import "./styles.css";

const CreatePage = () => {
	useEffect(() => {
		document.title = "Desafio Júnior | Criar um anel";
	}, []);

	return (
		<main className="container centralize">
			<FormCreateRing />
		</main>
	);
};

export default CreatePage;
