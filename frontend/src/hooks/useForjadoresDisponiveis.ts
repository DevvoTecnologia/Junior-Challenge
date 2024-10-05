import { useState, useEffect } from "react";
import { useAnelStore } from "@/stores/anelStore";

const LIMITE_FORJADORES = {
	Elfos: 3,
	Anões: 7,
	Homens: 9,
	Sauron: 1,
};

export const useForjadoresDisponiveis = () => {
	const [data, setData] = useState<
		{ name: string; disponivel: number; usado: number }[]
	>([]);
	const { aneis, fetchAneis } = useAnelStore();

	useEffect(() => {
		fetchAneis();
	}, [fetchAneis]);

	useEffect(() => {
		const contagem = aneis.reduce(
			(acc, anel) => {
				acc[anel.forjadoPor] = (acc[anel.forjadoPor] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		setData(
			Object.entries(LIMITE_FORJADORES).map(([name, limite]) => ({
				name,
				disponivel: limite - (contagem[name] || 0),
				usado: contagem[name] || 0,
			})),
		);
	}, [aneis]);

	return data;
};
