import { useEffect } from "react";
import FormRegister from "../../components/Forms/Register/form-register";

const RegisterPage = () => {
	useEffect(() => {
		document.title = "Desafio Júnior | Crie uma conta";
	}, []);

	return (
		<main className="container centralize">
			<FormRegister />
		</main>
	);
};

export default RegisterPage;
