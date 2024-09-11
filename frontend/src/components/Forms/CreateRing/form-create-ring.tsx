import { useForm } from "react-hook-form";
import Input from "../../Input/input";
import "./styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Anel, anelSchema } from "../../../utils/zod/ring";
import Button from "../../Button/button";

const FormCreateRing = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Anel>({
		resolver: zodResolver(anelSchema),
	});

	const createNewRing = (formData: Anel) => {
		console.log(formData);
	};

	return (
		<form onSubmit={handleSubmit(createNewRing)} className="form-create-ring">
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
			/>
			<Input
				id="power"
				label="Poder"
				{...register("power")}
				placeholder="Poder ex: Seu portador ganha resistência ao fogo"
				error={errors.power?.message}
			/>
			<Input
				id="bearer"
				label="Portador"
				{...register("bearer")}
				placeholder="Portador ex: Gandalf"
				error={errors.bearer?.message}
			/>
			<Input
				id="forgedBy"
				label="Forjado Por"
				{...register("forgedBy")}
				placeholder="Forjado por ex: Elfos"
				error={errors.forgedBy?.message}
			/>
			<Input
				id="image"
				label="Imagem"
				{...register("image")}
				placeholder="URL da imagem"
				error={errors.image?.message}
			/>
			<Button type="submit">Enviar</Button>
		</form>
	);
};

export default FormCreateRing;
