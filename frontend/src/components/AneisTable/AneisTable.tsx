import React from "react";
import { Anel } from "@/types/anel";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface AneisTableProps {
	aneis: Anel[];
	onEdit: (anel: Anel) => void;
	onDelete: (id: number) => void;
}

export const AneisTable: React.FC<AneisTableProps> = ({
	aneis,
	onEdit,
	onDelete,
}) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead>Poder</TableHead>
					<TableHead>Portador</TableHead>
					<TableHead>Forjado Por</TableHead>
					<TableHead>Imagem</TableHead>
					<TableHead>Ações</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{aneis.map((anel) => (
					<TableRow key={anel.id}>
						<TableCell>{anel.nome}</TableCell>
						<TableCell>{anel.poder}</TableCell>
						<TableCell>{anel.portador}</TableCell>
						<TableCell>{anel.forjadoPor}</TableCell>
						<TableCell>
							<img
								src={anel.imagem}
								alt={anel.nome}
								className="w-10 h-10 object-cover"
							/>
						</TableCell>
						<TableCell>
							<Button variant="ghost" onClick={() => onEdit(anel)}>
								<Pencil className="h-4 w-4" />
							</Button>
							<Button variant="ghost" onClick={() => onDelete(anel.id)}>
								<Trash className="h-4 w-4" />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
