import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginLayout from './components/BaseLayout/LoginLayout';
import DashboardLayout from './components/BaseLayout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;