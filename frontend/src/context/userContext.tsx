import { getAuthUser } from "@/helpers/utils";
import { LoginServices } from "@/services/login";
import { IBodyLogin, IUser } from "@/types/IUser";
import { notification } from "antd";
import { createContext, ReactNode, useContext, useState } from "react";

interface IUserContext {
	handleLogin: ({ name, password }: IBodyLogin) => void;
	user: any;
}

interface IUserProvider {
	children: ReactNode;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IUserProvider) {
	const [user, setUser] = useState<IUser | null>(getAuthUser());

	const handleLogin = ({ name, password }: IBodyLogin) => {
		LoginServices.login({ name, password })
			.then((data) => {
				const token = data.data.accessToken;
				const arrayToken = token.split(".");
				const userData = JSON.parse(atob(arrayToken[1]));

				setUser(userData);
				localStorage.setItem("token", token);
				localStorage.setItem("userData", JSON.stringify(userData));

				notification.success({
					message: "Login realizado com sucesso",
				});
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<UserContext.Provider
				value={{
					handleLogin,
					user,
				}}
			>
				{children}
			</UserContext.Provider>
		</>
	);
}

export const useUser = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUser must be used with UserContext");
	}

	return context;
};
