import type { Ring } from "@/types/ring";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

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
				<Carousel
					opts={{ align: "center" }}
					className="w-full max-w-5xl mx-auto"
				>
					<CarouselContent className="-ml-4">
						{rings.map((ring) => (
							<CarouselItem
								key={ring.id}
								className="pl-4 md:basis-1/2 lg:basis-1/3"
							>
								<Card className="flex flex-col overflow-hidden h-[500px]">
									<div className="relative pt-[60%]">
										<img
											src={ring.image || "/placeholder-ring.jpg"}
											alt={ring.name}
											className="absolute top-0 left-0 w-full h-full object-fit"
										/>
									</div>
									<CardContent className="flex-grow p-6">
										<h3 className="font-bold text-xl mb-3">{ring.name}</h3>
										<p className="text-base mb-2">
											<strong>Poder:</strong> {ring.power}
										</p>
										<p className="text-base mb-2">
											<strong>Portador:</strong> {ring.bearer}
										</p>
										<p className="text-base mb-2">
											<strong>Forjado por:</strong> {ring.forgedBy}
										</p>
									</CardContent>
									<CardFooter className="flex justify-between p-6">
										<Button variant="outline" onClick={() => onEdit(ring)}>
											Editar
										</Button>
										<Button
											variant="destructive"
											onClick={() => onDelete(ring.id)}
										>
											Excluir
										</Button>
									</CardFooter>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			)}
		</div>
	);
}
