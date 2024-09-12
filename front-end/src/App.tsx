import { AuthProvider } from './contexts/AuthContext';
import Router from './router';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
