import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Registrar from "./pages/Registrar";
import Signin from "./pages/Entrar";
import AnelForm from "./pages/anelform/AnelForm";
import AnelLista from "./pages/anellista/AnelLista";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Header />
				<Routes>
					<Route path="/" element={<>Home</>} />
					<Route path="/entrar" element={<Signin />} />
					<Route path="/registrar" element={<Registrar />} />
					<Route path="/aneis" element={<AnelLista />} />
					<Route path="/aneis/novo" element={<AnelForm />} />
					<Route path="/aneis/:id" element={<AnelForm />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
