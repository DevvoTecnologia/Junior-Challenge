import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useAuthContext } from "../context/AuthContext";

type SignInFormState = {
	email: string;
	senha: string;
};

const signInInitialState: SignInFormState = {
	email: "",
	senha: "",
};

export default function Signin() {
	const [loading, setLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<SignInFormState>(signInInitialState);
	const authContext = useAuthContext();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);
		authContext?.entrar(formData).finally(() => setLoading(false));
	}

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Entrar</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

				<Button variant="primary" type="submit">
					{loading ? "Carregando..." : "Entrar"}
				</Button>
			</form>
			<p className="mt-5">
				Não tem uma conta?{" "}
				<Link to="/registrar">
					<Button variant="primary">Registrar</Button>
				</Link>
			</p>
		</div>
	);
}
