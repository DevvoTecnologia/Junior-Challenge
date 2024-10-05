import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { Anel, CreateAnelDto } from "@/types/anel";

export const useAneis = () => {
	const [aneis, setAneis] = useState<Anel[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { user } = useAuthStore();

	const fetchAneis = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get<Anel[]>("http://localhost:3000/aneis", {
				headers: { Authorization: `Bearer ${user?.access_token}` },
			});
			setAneis(response.data);
		} catch {
			setError("Erro ao buscar anéis");
		} finally {
			setLoading(false);
		}
	}, [user]);

	const createAnel = async (anelData: CreateAnelDto) => {
		setLoading(true);
		try {
			const response = await axios.post<Anel>(
				"http://localhost:3000/aneis",
				anelData,
				{
					headers: { Authorization: `Bearer ${user?.access_token}` },
				},
			);
			setAneis((prevAneis) => [...prevAneis, response.data]);
			return response.data;
		} finally {
			setLoading(false);
		}
	};

	const updateAnel = async (id: number, anelData: Partial<CreateAnelDto>) => {
		setLoading(true);
		try {
			const response = await axios.put<Anel>(
				`http://localhost:3000/aneis/${id}`,
				anelData,
				{
					headers: { Authorization: `Bearer ${user?.access_token}` },
				},
			);
			setAneis((prevAneis) =>
				prevAneis.map((anel) => (anel.id === id ? response.data : anel)),
			);
			return response.data;
		} finally {
			setLoading(false);
		}
	};

	const deleteAnel = async (id: number) => {
		setLoading(true);
		try {
			await axios.delete(`http://localhost:3000/aneis/${id}`, {
				headers: { Authorization: `Bearer ${user?.access_token}` },
			});
			setAneis((prevAneis) => prevAneis.filter((anel) => anel.id !== id));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			fetchAneis();
		}
	}, [user, fetchAneis]);

	return {
		aneis,
		loading,
		error,
		createAnel,
		updateAnel,
		deleteAnel,
		fetchAneis,
	};
};
