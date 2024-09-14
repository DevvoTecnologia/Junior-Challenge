import { useForm } from "react-hook-form";
import Button from "../../Button/button";
import Input from "../../Input/input";
import { type Login, loginSchema } from "../../../utils/zod/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { setCookie } from "nookies";
import { motion } from "framer-motion";

const FormLogin = () => {
	const { login, isPending } = useUserContext();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>({
		resolver: zodResolver(loginSchema),
	});

	const submitFormLogin = async (formData: Login) => {
		const account = await login(formData.email, formData.password);

		if (account) {
			setCookie(null, "userToken", account, {
				maxAge: 30 * 24 * 60 * 60,
				path: "/",
			});

			navigate("/");
		}
	};

	return (
		<motion.form
			initial={{ opacity: 0, y: -20 }}
			whileInView={{ opacity: 1, y: 0 }}
			onSubmit={handleSubmit(submitFormLogin)}
			className="form-create-ring"
		>
			<div className="title-container">
				<h1>Faça o login</h1>
				<p>Insira os dados e então faça o login</p>
			</div>
			<Input
				id="email"
				{...register("email")}
				label="E-mail"
				type="email"
				placeholder="Digite seu e-mail"
				maxLength={32}
				error={errors.email?.message}
				disabled={isPending.login}
			/>
			<Input
				id="password"
				{...register("password")}
				label="Senha"
				type="password"
				placeholder="Digite sua senha"
				maxLength={32}
				error={errors.password?.message}
				disabled={isPending.login}
			/>
			<Button isLoading={isPending.login} type="submit">
				Enviar
			</Button>
		</motion.form>
	);
};

export default FormLogin;
