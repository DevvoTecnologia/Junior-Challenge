import type { Ring } from "@/types/ring";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

interface RingListProps {
	rings: Ring[];
	onEdit: (ring: Ring) => void;
	onDelete: (id: string) => void;
}

export function RingList({ rings, onEdit, onDelete }: RingListProps) {
	return (
		<div className="mt-8">
			<h2 className="text-2xl font-semibold mb-4">Anéis Cadastrados</h2>
			{rings.length === 0 ? (
				<p className="text-gray-500">Nenhum anel cadastrado ainda.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{rings.map((ring) => (
						<Card key={ring.id} className="flex flex-col overflow-hidden">
							<div className="relative pt-[100%]">
								{" "}
								{/* Cria um contêiner quadrado */}
								<img
									src={ring.image || "/placeholder-ring.jpg"}
									alt={ring.name}
									className="absolute top-0 left-0 w-full h-full object-cover"
								/>
							</div>
							<CardContent className="flex-grow p-4">
								<h3 className="font-bold text-lg mb-2">{ring.name}</h3>
								<p className="text-sm">
									<strong>Poder:</strong> {ring.power}
								</p>
								<p className="text-sm">
									<strong>Portador:</strong> {ring.bearer}
								</p>
								<p className="text-sm">
									<strong>Forjado por:</strong> {ring.forgedBy}
								</p>
							</CardContent>
							<CardFooter className="flex justify-between p-4">
								<Button variant="outline" onClick={() => onEdit(ring)}>
									Editar
								</Button>
								<Button variant="destructive" onClick={() => onDelete(ring.id)}>
									Excluir
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
