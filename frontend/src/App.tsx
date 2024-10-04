import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import LoginLayout from "./components/BaseLayout/LoginLayout";
import DashboardLayout from "./components/BaseLayout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AneisEditPage from "./pages/AneisEditPage";
import AneisShowPage from "./pages/AneisShowPage";
import AccountPage from "./pages/AccountPage";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext";
import { useAuthStore } from "./stores/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	return isAuthenticated() ? <>{children}</> : <Navigate to="/" replace />;
};

const App = () => {
	return (
		<ThemeProvider>
			<Router>
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
