import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import type { FC, ReactNode } from "react";
import { sendToast } from "./utils/utils";
import { useUserContext } from "./context/UserContext";

interface Props {
	component: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ component }: Props) => {
	const { isLogin } = useUserContext();
	const hasToastBeenShown = useRef(false);

	useEffect(() => {
		if (!isLogin && !hasToastBeenShown.current) {
			hasToastBeenShown.current = true;
			sendToast({
				message:
					"Você não está logado. Crie uma conta ou faça login para acessar esta página",
				type: "error",
			});
		}
	}, [isLogin]);

	if (!isLogin) {
		return <Navigate to="/login" replace />;
	}

	return <>{component}</>;
};

export default ProtectedRoute;
