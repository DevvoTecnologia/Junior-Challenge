import { createContext } from "react";

interface ThemeContextType {
	theme: string;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined,
);
