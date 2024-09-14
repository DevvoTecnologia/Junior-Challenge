import { api } from "./services/service";

interface LoginResponse {
    [key: string]: unknown; 
  }
  
  export const login = async (login: string, senha: string): Promise<LoginResponse> => {
    try {
      const response = await api({
        method: "post",
        url: "/api/login",
        body: { login, senha }
      });
  
      return response.data as LoginResponse;

    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error("Email não encontrado.");
        } else if (error.response.status === 401) {
          throw new Error("Senha inválida.");
        }
      }
      console.error("Erro ao fazer login:", error);
      throw new Error("Login falhou. Verifique suas credenciais.");
    }
  };
  