import { useForm } from "react-hook-form";
import Input from "../../Input/input";
import "./styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Anel, type AnelDb, anelSchema } from "../../../utils/zod/ring";
import Button from "../../Button/button";
import { useNavigate } from "react-router-dom";
import { useRingContext } from "../../../context/RingContext";

type Props = {
	defaultValues: AnelDb | null;
};

const FormEditRing = ({ defaultValues }: Props) => {
	const navigate = useNavigate();
	const { editRing, isPending } = useRingContext();
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

	const submitFormEditRing = async (formData: Anel) => {
		const success = await editRing(defaultValues?.id, formData);

		if (success) {
			navigate("/");
		}
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
				disabled={isPending.editRing}
				maxLength={32}
			/>
			<Input
				id="power"
				label="Poder"
				{...register("power")}
				placeholder="Poder ex: Seu portador ganha resistência ao fogo"
				error={errors.power?.message}
				disabled={isPending.editRing}
				maxLength={32}
			/>
			<Input
				id="bearer"
				label="Portador"
				{...register("bearer")}
				placeholder="Portador ex: Gandalf"
				error={errors.bearer?.message}
				disabled={isPending.editRing}
				maxLength={32}
			/>
			<Input
				id="forgedBy"
				label="Forjado Por"
				{...register("forgedBy")}
				placeholder="Forjado por ex: Elfos, Anões, Homens e Sauron"
				error={errors.forgedBy?.message}
				disabled={isPending.editRing}
				maxLength={32}
			/>
			<Input
				id="image"
				label="Imagem"
				{...register("image")}
				placeholder="URL da imagem"
				error={errors.image?.message}
				disabled={isPending.editRing}
			/>
			<Button isLoading={isPending.editRing} type="submit">
				Enviar
			</Button>
		</form>
	);
};

export default FormEditRing;
