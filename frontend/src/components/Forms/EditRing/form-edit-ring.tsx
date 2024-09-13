import { useForm } from "react-hook-form";
import Input from "../../Input/input";
import "./styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Anel, type AnelDb, anelSchema } from "../../../utils/zod/ring";
import Button from "../../Button/button";
import { useState } from "react";
import { editRing, sendToast } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

type Props = {
	defaultValues: AnelDb | null;
};

const FormEditRing = ({ defaultValues }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Anel>({
		resolver: zodResolver(anelSchema),
		defaultValues: defaultValues ?? {
			name: "",
			power: "",
			bearer: "",
			forgedBy: "",
			image: "",
		},
	});

	const submitFormEditRing = (formData: Anel) => {
		setIsLoading(true);
		editRing(defaultValues?.id, formData)
			.then(async (response) => {
				const data = await response.json();

				if (!response.ok) {
					sendToast({
						message: data.message,
						type: "error",
					});
					return;
				}

				sendToast({
					message: data.message,
					type: "success",
				});

				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				sendToast({
					message: "Ocorreu um erro ao enviar o formulário",
					type: "error",
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<form
			onSubmit={handleSubmit(submitFormEditRing)}
			className="form-create-ring"
		>
			<div className="title-container">
				<h1>Formulário de edição de um anel</h1>
				<p>Insira os dados e edite um anel</p>
			</div>
			<Input
				id="name"
				{...register("name")}
				label="Nome"
				placeholder="Nome ex: Narya, o anel do fogo"
				error={errors.name?.message}
				disabled={isLoading}
			/>
			<Input
				id="power"
				label="Poder"
				{...register("power")}
				placeholder="Poder ex: Seu portador ganha resistência ao fogo"
				error={errors.power?.message}
				disabled={isLoading}
			/>
			<Input
				id="bearer"
				label="Portador"
				{...register("bearer")}
				placeholder="Portador ex: Gandalf"
				error={errors.bearer?.message}
				disabled={isLoading}
			/>
			<Input
				id="forgedBy"
				label="Forjado Por"
				{...register("forgedBy")}
				placeholder="Forjado por ex: Elfos, Anões, Homens e Sauron"
				error={errors.forgedBy?.message}
				disabled={isLoading}
			/>
			<Input
				id="image"
				label="Imagem"
				{...register("image")}
				placeholder="URL da imagem"
				error={errors.image?.message}
				disabled={isLoading}
			/>
			<Button isLoading={isLoading} type="submit">
				Enviar
			</Button>
		</form>
	);
};

export default FormEditRing;
