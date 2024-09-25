import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Button from "../components/Button";

type SignUpFormState = {
	nome: string;
	email: string;
	senha: string;
	confirmarSenha: string;
};

const signUpInitialState: SignUpFormState = {
	nome: "",
	email: "",
	senha: "",
	confirmarSenha: "",
};

export default function Signup() {
	const [loading, setLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<SignUpFormState>(signUpInitialState);
	const authContext = useAuthContext();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);
		authContext?.registrar(formData).finally(() => setLoading(false));
	}

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Cadastrar</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nome..."
					name="nome"
					value={formData.nome}
					onChange={handleChange}
				/>
				<input
					type="email"
					placeholder="Email..."
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="Senha..."
					name="senha"
					value={formData.senha}
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="Confirmar senha..."
					name="confirmarSenha"
					value={formData.confirmarSenha}
					onChange={handleChange}
				/>

				<Button variant="primary" type="submit">
					{loading ? "Carregando..." : "Cadastrar"}
				</Button>
			</form>
			<p className="mt-5">
				Já tem uma conta?{" "}
				<Link to="/entrar">
					<Button variant="primary">Entrar</Button>
				</Link>
			</p>
		</div>
	);
}
