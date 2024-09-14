import { useForm } from "react-hook-form";
import Button from "../../Button/button";
import Input from "../../Input/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Register, registerSchema } from "../../../utils/zod/register";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { setCookie } from "nookies";

const FormRegister = () => {
	const { createAccount, isPending } = useUserContext();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Register>({
		resolver: zodResolver(registerSchema),
	});

	const submitFormRegister = async (formData: Register) => {
		const account = await createAccount({
			email: formData.email,
			password: formData.password,
		});

		if (account) {
			setCookie(null, "userToken", account, {
				maxAge: 30 * 24 * 60 * 60,
				path: "/",
			});

			navigate("/");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submitFormRegister)}
			className="form-create-ring"
		>
			<div className="title-container">
				<h1>Crie uma conta</h1>
				<p>Insira os dados e crie uma conta</p>
			</div>
			<Input
				id="email"
				{...register("email")}
				label="E-mail"
				type="email"
				placeholder="Digite seu e-mail"
				error={errors.email?.message}
				maxLength={32}
				disabled={isPending.createAccount}
			/>
			<Input
				id="password"
				{...register("password")}
				label="Senha"
				type="password"
				placeholder="Digite sua senha"
				error={errors.password?.message}
				maxLength={32}
				disabled={isPending.createAccount}
			/>
			<Input
				id="confirmPassword"
				{...register("confirmPassword")}
				label="Confirme sua senha"
				type="password"
				placeholder="Digite novamente sua senha"
				error={errors.confirmPassword?.message}
				maxLength={32}
				disabled={isPending.createAccount}
			/>
			<Button isLoading={isPending.createAccount} type="submit">
				Enviar
			</Button>
		</form>
	);
};

export default FormRegister;
