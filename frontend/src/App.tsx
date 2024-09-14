import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RingList from './pages/RingList';
import PrivateRoute from './components/PrivateRoute';
import { getToken } from './services/auth';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const token = getToken();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/rings" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/rings"
          element={
            <PrivateRoute>
              <RingList />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
