import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContentLayout } from "@/components/BaseLayout/ContentLayout";
import { AneisCard } from "@/components/AneisCard/AneisCard";
import { AnelCardVertical } from "@/components/AnelCardVertical/AnelCardVertical";
import { EditAnelModal } from "@/components/EditAnelModal/EditAnelModal";
import { useAnelStore } from "@/stores/anelStore";
import { Loader2 } from "lucide-react";
import { Anel } from "@/types/anel";
import { toast } from "react-toastify";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const AneisShowPage: React.FC = () => {
	const { aneis, loading, error, fetchAneis, deleteAnel, updateAnel } =
		useAnelStore();
	const [editingAnelId, setEditingAnelId] = useState<number | null>(null);
	const [localLoading, setLocalLoading] = useState(false);

	useEffect(() => {
		fetchAneis();
	}, [fetchAneis]);

	const handleEdit = (id: number) => {
		setEditingAnelId(id);
	};

	const handleCloseModal = () => {
		setEditingAnelId(null);
	};

	const handleDelete = async (id: number) => {
		if (window.confirm("Tem certeza que deseja deletar este anel?")) {
			setLocalLoading(true);
			try {
				await deleteAnel(id);
				toast.success("Anel deletado com sucesso!");
			} catch {
				toast.error("Erro ao deletar o anel");
			} finally {
				setLocalLoading(false);
			}
		}
	};

	const handleUpdate = async (id: number, data: Partial<Anel>) => {
		setLocalLoading(true);
		try {
			await updateAnel(id, data);
			toast.success("Anel atualizado com sucesso!");
			handleCloseModal();
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(`Erro ao atualizar o anel: ${error.response.data.message}`);
			} else {
				toast.error("Erro ao atualizar o anel");
			}
		} finally {
			setLocalLoading(false);
		}
	};

	const renderContent = () => {
		if (loading || localLoading) {
			return (
				<div className="flex justify-center items-center h-full">
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					<span>Carregando anéis...</span>
				</div>
			);
		}

		if (aneis.length === 0) {
			return <p>Nenhum anel encontrado. Crie seu primeiro anel!</p>;
		}

		return (
			<>
				<div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
					{aneis.map((anel) => (
						<AneisCard
							key={anel.id}
							anel={anel}
							onDelete={handleDelete}
							onEdit={handleEdit}
						/>
					))}
				</div>

				<div className="sm:hidden">
					<Carousel>
						<CarouselContent>
							{aneis.map((anel) => (
								<CarouselItem key={anel.id}>
									<AnelCardVertical
										anel={anel}
										onDelete={handleDelete}
										onEdit={handleEdit}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="absolute top-1/2 -left-2 transform -translate-y-1/2" />
						<CarouselNext className="absolute top-1/2 -right-2 transform -translate-y-1/2" />
					</Carousel>
				</div>
			</>
		);
	};

	return (
		<ContentLayout>
			<div className="mb-12">
				<h1 className="font-title text-4xl text-center">Anéis Forjados</h1>
			</div>
			{error && <div className="text-red-500 mb-4">{error}</div>}
			{renderContent()}
			<EditAnelModal
				anel={aneis.find((a) => a.id === editingAnelId) || null}
				isOpen={!!editingAnelId}
				onClose={handleCloseModal}
				onUpdate={handleUpdate}
			/>
		</ContentLayout>
	);
};

export default AneisShowPage;
