import React, { useState, useEffect } from "react";
import { AnelForm } from "../AnelForm/AnelForm";
import { AneisTable } from "../AneisTable/AneisTable";
import { EditAnelModal } from "../EditAnelModal/EditAnelModal";
import { useAneis } from "@/hooks/useAneis";
import { Loader2 } from "lucide-react";
import { Anel, CreateAnelDto } from "@/types/anel";
import { toast } from "react-toastify";
import axios from "axios";

export const AnelManager: React.FC = () => {
	const {
		aneis,
		loading,
		error,
		createAnel,
		updateAnel,
		deleteAnel,
		fetchAneis,
	} = useAneis();
	const [editingAnel, setEditingAnel] = useState<Anel | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		fetchAneis();
	}, [fetchAneis]);

	useEffect(() => {
		if (!error) return;
		toast.error(error);
	}, [error]);

	const handleSubmit = async (data: CreateAnelDto) => {
		try {
			await createAnel(data);
			toast.success("Anel criado com sucesso!");
		} catch (err: unknown) {
			handleError(err);
		}
	};

	const handleUpdate = async (id: number, data: Partial<CreateAnelDto>) => {
		try {
			await updateAnel(id, data);
			toast.success("Anel atualizado com sucesso!");
			setIsModalOpen(false);
		} catch (err: unknown) {
			handleError(err);
		}
	};

	const handleError = (err: unknown) => {
		if (!axios.isAxiosError(err) || !err.response) {
			toast.error("Erro inesperado ao criar/atualizar anel.");
			return;
		}

		const { status, data } = err.response;
		if (status !== 400) {
			toast.error("Erro ao criar/atualizar anel. Por favor, tente novamente.");
			return;
		}

		const message = data.message || "";
		if (message.includes("Limite de anéis excedido")) {
			toast.error("Limite de anéis excedido para este criador.");
		} else if (message.includes("Criador inválido")) {
			toast.error("Criador inválido especificado.");
		} else {
			toast.error("Erro ao criar anel. Verifique os dados e tente novamente.");
		}
	};

	const handleEdit = (anel: Anel) => {
		setEditingAnel(anel);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteAnel(id);
			toast.success("Anel deletado com sucesso!");
		} catch {
			toast.error("Erro ao deletar anel. Por favor, tente novamente.");
		}
	};

	return (
		<div className="space-y-8">
			{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
			<AnelForm onSubmit={handleSubmit} />
			<AneisTable aneis={aneis} onEdit={handleEdit} onDelete={handleDelete} />
			<EditAnelModal
				anel={editingAnel}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onUpdate={handleUpdate}
			/>
		</div>
	);
};
