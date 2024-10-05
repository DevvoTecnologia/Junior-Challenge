import React from "react";
import { Anel } from "@/types/anel";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface AnelCardVerticalProps {
	anel: Anel;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

export const AnelCardVertical: React.FC<AnelCardVerticalProps> = ({
	anel,
	onEdit,
	onDelete,
}) => {
	return (
		<div className="w-full max-w-[300px] h-[400px] bg-[#FBDF7A] dark:bg-[#2C3E50] rounded-xl shadow-md flex flex-col p-4 mx-auto">
			<div className="h-1/2 mb-4">
				<img
					src={anel.imagem}
					alt={anel.nome}
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<div className="flex-grow flex flex-col justify-between">
				<div>
					<h3 className="font-bold text-xl mb-2 dark:text-[#F1C40F]">
						{anel.nome}
					</h3>
					<p className="text-sm mb-2 dark:text-[#ECF0F1]">{anel.poder}</p>
					<p className="text-sm dark:text-[#BDC3C7]">
						<span className="font-bold dark:text-[#F1C40F]">Portador:</span>{" "}
						{anel.portador}
					</p>
					<p className="text-sm dark:text-[#BDC3C7]">
						<span className="font-bold dark:text-[#F1C40F]">Forjado por:</span>{" "}
						{anel.forjadoPor}
					</p>
				</div>
				<div className="flex justify-end space-x-2 mt-2">
					<Button
						variant="outline"
						size="icon"
						onClick={() => onEdit(anel.id)}
						className="dark:bg-[#34495E] dark:text-[#ECF0F1] dark:hover:bg-[#2C3E50]"
					>
						<Pencil className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => onDelete(anel.id)}
						className="dark:bg-[#34495E] dark:text-[#ECF0F1] dark:hover:bg-[#2C3E50]"
					>
						<Trash className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};
