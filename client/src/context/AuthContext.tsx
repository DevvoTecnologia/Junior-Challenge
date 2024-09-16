import { createContext, useContext, useMemo } from "react";
import { EntrarDTO, RegistrarDTO, UsuarioDTO } from "../types/auth.type";
import useAuth from "../hooks/useAuth";

interface AuthContextType {
	usuario: UsuarioDTO | undefined;
	entrar: (body: EntrarDTO) => Promise<void>;
	registrar: (body: RegistrarDTO) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { usuario, entrar, registrar, logout } = useAuth();
	const contextValue = useMemo(
		() => ({
			usuario,
			entrar,
			registrar,
			logout,
		}),
		[usuario]
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
	return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
