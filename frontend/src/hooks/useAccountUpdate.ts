import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";

interface UpdateAccountData {
	nome?: string;
	email?: string;
	imagem?: string;
}

export const useAccountUpdate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { user, updateUser } = useAuthStore();

	const updateAccount = async (data: UpdateAccountData, senhaAtual: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await axios.put(
				"http://localhost:3000/users/profile",
				{ ...data, senhaAtual },
				{
					headers: { Authorization: `Bearer ${user?.access_token}` },
				},
			);

			updateUser(response.data);
			setIsLoading(false);
		} catch (err) {
			setError(
				"Falha ao atualizar a conta. Verifique sua senha e tente novamente.",
			);
			setIsLoading(false);
			throw err;
		}
	};

	return { updateAccount, isLoading, error };
};
