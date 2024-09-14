import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePage from "./pages/Create/create";
import HomePage from "./pages/Index";
import { Toaster } from "react-hot-toast";
import { RingProvider } from "./context/RingContext";
import EditPage from "./pages/Edit/edit";
import Header from "./components/Layout/Header/header";
import LoginPage from "./pages/Login/login";
import RegisterPage from "./pages/Register/register";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./protectedRoutes";

const router = createBrowserRouter([
	{
		path: "/create",
		element: <ProtectedRoute component={<CreatePage />} />,
	},
	{
		path: "/edit/:id",
		element: <ProtectedRoute component={<EditPage />} />,
	},
	{
		path: "/Login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/",
		element: <HomePage />,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<React.StrictMode>
		<UserProvider>
			<RingProvider>
				<Toaster />
				<Header />
				<RouterProvider router={router} />
			</RingProvider>
		</UserProvider>
	</React.StrictMode>,
);
