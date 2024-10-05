import { Anel } from "@/types/anel";

interface AneisCardProps {
	anel: Anel;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
}

export const AneisCard: React.FC<AneisCardProps> = ({
	anel,
	onDelete,
	onEdit,
}) => {
	return (
		<div className="w-full max-w-[400px] sm:max-w-[300px] lg:max-w-[400px] p-8 bg-[#FBDF7A] dark:bg-[#2C3E50] rounded-xl shadow-md flex relative">
			<div className="w-1/3 pr-4">
				<img
					src={anel.imagem}
					alt={anel.nome}
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<div className="w-2/3 flex flex-col justify-between">
				<div>
					<h3 className="font-bold text-base mb-1 dark:text-[#F1C40F]">
						{anel.nome}
					</h3>
					<p className="text-xs mb-2 dark:text-[#ECF0F1]">{anel.poder}</p>
				</div>
				<div className="text-sm dark:text-[#BDC3C7]">
					<p>
						<span className="font-bold dark:text-[#F1C40F]">Portador:</span>{" "}
						{anel.portador}
					</p>
					<p>
						<span className="font-bold dark:text-[#F1C40F]">Forjado por:</span>{" "}
						{anel.forjadoPor}
					</p>
				</div>
			</div>
			<div className="absolute top-4 right-2 flex space-x-2">
				<button
					onClick={() => onEdit(anel.id)}
					className="text-gray-600 hover:text-gray-800 dark:text-[#ECF0F1] dark:hover:text-[#F1C40F]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
					</svg>
				</button>
				<button
					onClick={() => onDelete(anel.id)}
					className="text-gray-600 hover:text-gray-800 dark:text-[#ECF0F1] dark:hover:text-[#F1C40F]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};
