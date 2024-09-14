import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { FC, ReactNode } from "react";
import { sendToast } from "./utils/utils";
import { parseCookies } from "nookies";
import Spinner from "./components/Spinner/spinner";

interface Props {
	component: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ component }: Props) => {
	const [isLogin, setIsLogin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			const cookies = parseCookies();
			const token = cookies.userToken;
			if (token) {
				setIsLogin(true);
			} else {
				setIsLogin(false);
				sendToast({
					message:
						"Você não está logado. Crie uma conta ou faça login para acessar esta página",
					type: "error",
				});
			}
			setIsLoading(false);
		}, 500);
	}, []);

	if (isLoading) {
		return (
			<main className="container centralize">
				<Spinner
					style={{
						height: 120,
						width: 120,
					}}
				/>
			</main>
		);
	}

	if (!isLogin) {
		return <Navigate to="/login" />;
	}

	return <>{component}</>;
};

export default ProtectedRoute;
