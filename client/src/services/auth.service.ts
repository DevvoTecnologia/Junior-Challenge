import { EntrarDTO, RegistrarDTO, UsuarioDTO } from "../types/auth.type";
import api from "./api.service";

export default class AuthService {
	static async entrar(body: EntrarDTO): Promise<UsuarioDTO> {
		return api.post<UsuarioDTO>("/auth/entrar", body).then(({ data }) => data);
	}
	static async registrar(body: RegistrarDTO): Promise<UsuarioDTO> {
		return api.post<UsuarioDTO>("/auth/registrar", body).then(({ data }) => data);
	}

	static async buscarUsuario(): Promise<UsuarioDTO> {
		return api.get<UsuarioDTO>("/auth/usuario").then(({ data }) => data);
	}
}
