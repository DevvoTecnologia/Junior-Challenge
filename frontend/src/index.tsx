import { StrictMode } from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
