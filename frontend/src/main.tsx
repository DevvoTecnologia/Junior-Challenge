import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
		/>
	</StrictMode>,
);
