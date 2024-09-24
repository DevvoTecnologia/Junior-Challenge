import { IUser } from "@/types/IUser";

export const getAuthUser = (): IUser | null => {
	if (!localStorage) {
		throw new Error("localStorage is not defined");
	}

	try {
		const storageData: string | null = localStorage.getItem("userData");
		const userData: IUser | null = storageData ? JSON.parse(storageData) : null;

		return userData;
	} catch (error) {
		return null;
	}
};
