import FormCreateRing from "../../components/Forms/CreateRing/form-create-ring";
import "./styles.css";

const CreatePage = () => {
	return (
		<main className="container">
			<div className="title-container">
				<h1>Formulário de criação um novo anel</h1>
				<p>Insira os dados e crie um novo anel</p>
			</div>
			<FormCreateRing />
		</main>
	);
};

export default CreatePage;
