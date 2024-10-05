import { useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	useNavigate,
} from "react-router-dom";
import LoginLayout from "./components/BaseLayout/LoginLayout";
import DashboardLayout from "./components/BaseLayout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AneisEditPage from "./pages/AneisEditPage";
import AneisShowPage from "./pages/AneisShowPage";
import AccountPage from "./pages/AccountPage";
import { ThemeProvider } from "./components/ThemeContext";
import { useAuthStore } from "./stores/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	return isAuthenticated() ? <>{children}</> : <Navigate to="/" replace />;
};

const AuthCheck = () => {
	const navigate = useNavigate();
	const checkTokenExpiration = useAuthStore(
		(state) => state.checkTokenExpiration,
	);

	useEffect(() => {
		const checkAuth = () => {
			if (!checkTokenExpiration()) {
				navigate("/");
			}
		};

		checkAuth();
		const intervalId = setInterval(checkAuth, 60000);

		return () => clearInterval(intervalId);
	}, [checkTokenExpiration, navigate]);

	return null;
};

const App = () => {
	return (
		<ThemeProvider>
			<Router>
				<AuthCheck />
				<Routes>
					<Route path="/" element={<LoginLayout />}>
						<Route index element={<LoginPage />} />
					</Route>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<DashboardLayout />
							</ProtectedRoute>
						}
					>
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="account" element={<AccountPage />} />
						<Route path="aneis">
							<Route path="create" element={<AneisEditPage />} />
							<Route path="show" element={<AneisShowPage />} />
						</Route>
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
