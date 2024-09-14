import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import Router from "./routes";
import AppProvider from "./context";

function App() {
	return (
		<>
			<BrowserRouter>
				<AppProvider>
					<GlobalStyle />
					<Router />
				</AppProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
