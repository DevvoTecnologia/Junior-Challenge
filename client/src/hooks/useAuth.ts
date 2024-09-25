import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EntrarDTO, RegistrarDTO, UsuarioDTO } from "../types/auth.type";
import Cookies from "js-cookie";
import AuthService from "../services/auth.service";

export default function useAuth() {
	const [usuario, setUsuario] = useState<UsuarioDTO | undefined>(undefined);
	const navigate = useNavigate();

	const buscarUsuario = async () => {
		AuthService.buscarUsuario()
			.then((data) => {
				setUsuario(data);
				navigate("/aneis");
			})
			.catch(() => navigate("/entrar"));
	};

	const entrar = async (body: EntrarDTO) => {
		return AuthService.entrar(body).then((data) => {
			setUsuario(data);
			navigate("/aneis");
		});
	};

	const registrar = async (body: RegistrarDTO) => {
		return AuthService.registrar(body).then((data) => {
			setUsuario(data);
			navigate("/aneis");
		});
	};

	const logout = () => {
		setUsuario(undefined);
		navigate("/entrar");
	};

	return { logout, registrar, entrar, usuario };
}
