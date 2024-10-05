import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../ThemeContext";
import "../../index.css";

const LoginLayout: React.FC = () => {
	return (
		<div className="min-h-screen bg-background font-sans antialiased">
			<ThemeProvider>
				<Outlet />
			</ThemeProvider>
		</div>
	);
};

export default LoginLayout;
