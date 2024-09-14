import { useEffect } from "react";
import FormLogin from "../../components/Forms/Login/form-login";

const LoginPage = () => {
	useEffect(() => {
		document.title = "Desafio Júnior | Login";
	}, []);

	return (
		<main className="container centralize">
			<FormLogin />
		</main>
	);
};

export default LoginPage;
