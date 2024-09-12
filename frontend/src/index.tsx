import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePage from "./pages/Create/create";
import HomePage from "./pages/Index";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
	{
		path: "/create",
		element: <CreatePage />,
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
		<Toaster />
		<RouterProvider router={router} />
	</React.StrictMode>,
);
