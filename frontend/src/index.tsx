import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePage from "./pages/Create/create";
import HomePage from "./pages/Index";

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
		<RouterProvider router={router} />
	</React.StrictMode>,
);
