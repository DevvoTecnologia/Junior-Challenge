
import { api } from '../api/services/service'; 

export interface User {
    login: string;
    senha: string;
}

export const addUser = async (login: string, senha: string) => {
    if (!login || !senha) {
        throw new Error("Por favor, preencha todos os campos.");
    }

    try {
        const response = await api({
            method: "post",
            url: "/api/users",
            body: {login, senha}
        });
        return response
    } catch (error: any) {
        throw new Error(error.response?.data.message || 'Erro ao adicionar o usuário.');
    }
};
