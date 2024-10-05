import { useState, useEffect } from "react";
import { useAnelStore } from "@/stores/anelStore";

export const useAneisPorForjador = () => {
	const [data, setData] = useState<{ name: string; value: number }[]>([]);
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

		setData(Object.entries(contagem).map(([name, value]) => ({ name, value })));
	}, [aneis]);

	return data;
};
