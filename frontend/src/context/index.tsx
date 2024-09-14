import { ReactNode } from "react";

import { UserProvider } from "./userContext";

interface AppProviderProps {
	children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
	return <UserProvider>{children}</UserProvider>;
}

export default AppProvider;
