import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormEditRing from "../../components/Forms/EditRing/form-edit-ring";
import type { AnelDb } from "../../utils/zod/ring";
import { getRingById, sendToast } from "../../utils/utils";
import type { ApiResponse } from "../../types/types";
import { CircleArrowLeft } from "lucide-react";

const EditPage = () => {
	const [defaultValues, setDefaultValues] = useState<AnelDb | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		document.title = "Desafio Júnior | Carregando...";

		getRingById(id)
			.then(async (response) => {
				const data = (await response.json()) as ApiResponse<AnelDb>;

				if (!response.ok) {
					document.title = "Desafio Júnior | Anel não encontrado";
					sendToast({
						message: data.message ?? "Ocorreu um erro ao buscar o anel",
						type: "error",
					});
					return;
				}

				document.title = "Desafio Júnior | Editar um anel";
				setDefaultValues(data.data);
			})
			.catch((error) => {
				sendToast({
					message: error.message ?? "Ocorreu um erro ao buscar o anel",
					type: "error",
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	return (
		<main className="container centralize">
			<button className="back-button" type="button">
				<Link to="/">
					<CircleArrowLeft color="#fff" size={20} />
				</Link>
			</button>
			{isLoading ? (
				<p>Carregando</p>
			) : (
				<FormEditRing defaultValues={defaultValues} />
			)}
		</main>
	);
};

export default EditPage;
