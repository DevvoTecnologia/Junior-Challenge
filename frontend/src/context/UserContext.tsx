import {
	createContext,
	useContext,
	type ReactNode,
	type FC,
	useState,
	useEffect,
} from "react";
import type { ApiResponse } from "../types/types";
import { sendToast } from "../utils/utils";
import type { User, UserDb } from "../utils/zod/user";
import { parseCookies } from "nookies";

type UserContextType = {
	isLogin: boolean;
	isPending: {
		createAccount: boolean;
		login: boolean;
	};
	createAccount: (user: User) => Promise<string | null | undefined>;
	login: (
		email: string,
		password: string,
	) => Promise<string | null | undefined>;
};

const UserContext = createContext<UserContextType>({
	isLogin: false,
	isPending: {
		createAccount: false,
		login: false,
	},
	createAccount: async () => null,
	login: async () => null,
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isLogin, setIsLogin] = useState(false);
	const [isPending, setIsPending] = useState({
		createAccount: false,
		login: false,
	});

	useEffect(() => {
		const { userToken } = parseCookies();

		if (userToken) {
			setIsLogin(true);
		}
	}, []);

	const createAccount = async (
		user: User,
	): Promise<string | null | undefined> => {
		setIsPending((prev) => ({
			...prev,
			createAccount: true,
		}));

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/users`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user),
				},
			);

			const data = (await response.json()) as ApiResponse<UserDb>;

			if (!response.ok) {
				sendToast({
					message: data.message,
					type: "error",
				});
				return null;
			}

			setIsLogin(true);
			sendToast({
				message: data.message,
				type: "success",
			});

			return data.token;
		} catch (error) {
			console.log(error);
			sendToast({
				message: "Ocorreu um erro ao criar um anel",
				type: "error",
			});

			return null;
		} finally {
			setIsPending((prev) => ({
				...prev,
				createAccount: false,
			}));
		}
	};

	const login = async (
		email: string,
		password: string,
	): Promise<string | null | undefined> => {
		setIsPending((prev) => ({
			...prev,
			login: true,
		}));

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/login?email=${email}&password=${password}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const data = (await response.json()) as ApiResponse<UserDb>;

			if (!response.ok) {
				sendToast({
					message: data.message,
					type: "error",
				});
				return null;
			}

			setIsLogin(true);
			sendToast({
				message: data.message,
				type: "success",
			});

			return data.token;
		} catch (error) {
			console.log(error);
			sendToast({
				message: "Ocorreu um erro ao criar um anel",
				type: "error",
			});

			return null;
		} finally {
			setIsPending((prev) => ({
				...prev,
				login: false,
			}));
		}
	};

	return (
		<UserContext.Provider
			value={{
				createAccount,
				isPending,
				isLogin,
				login,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};