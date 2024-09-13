import { useForm } from "react-hook-form";
import Input from "../../Input/input";
import "./styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Anel, anelSchema } from "../../../utils/zod/ring";
import Button from "../../Button/button";
import { useNavigate } from "react-router-dom";
import { useRingContext } from "../../../context/RingContext";

const FormCreateRing = () => {
	const navigate = useNavigate();
	const { createNewRing, isPending } = useRingContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Anel>({
		resolver: zodResolver(anelSchema),
	});

	const submitFormCreateRing = async (formData: Anel) => {
		const success = await createNewRing(formData);

		if (success) {
			navigate("/");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submitFormCreateRing)}
			className="form-create-ring"
		>
			<div className="title-container">
				<h1>Formulário de criação um novo anel</h1>
				<p>Insira os dados e crie um novo anel</p>
			</div>
			<Input
				id="name"
				{...register("name")}
				label="Nome"
				placeholder="Nome ex: Narya, o anel do fogo"
				error={errors.name?.message}
				disabled={isPending.createNewRing}
			/>
			<Input
				id="power"
				label="Poder"
				{...register("power")}
				placeholder="Poder ex: Seu portador ganha resistência ao fogo"
				error={errors.power?.message}
				disabled={isPending.createNewRing}
			/>
			<Input
				id="bearer"
				label="Portador"
				{...register("bearer")}
				placeholder="Portador ex: Gandalf"
				error={errors.bearer?.message}
				disabled={isPending.createNewRing}
			/>
			<Input
				id="forgedBy"
				label="Forjado Por"
				{...register("forgedBy")}
				placeholder="Forjado por ex: Elfos, Anões, Homens e Sauron"
				error={errors.forgedBy?.message}
				disabled={isPending.createNewRing}
			/>
			<Input
				id="image"
				label="Imagem"
				{...register("image")}
				placeholder="URL da imagem"
				error={errors.image?.message}
				disabled={isPending.createNewRing}
			/>
			<Button isLoading={isPending.createNewRing} type="submit">
				Enviar
			</Button>
		</form>
	);
};

export default FormCreateRing;
