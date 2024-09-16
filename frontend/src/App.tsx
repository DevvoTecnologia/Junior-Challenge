import { useContext, useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { RingsPage } from './pages/Rings';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { AuthContext } from './contexts/Auth/AuthContext';


function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (auth.user) {
      if (Array.isArray(auth.user)) {
        if (auth.user[0] && 'username' in auth.user[0]) {
          setUserName(auth.user[0].username);
        } else {
          setUserName(undefined);
        }
      } else if (typeof auth.user === 'object' && 'username' in auth.user) {
        setUserName(auth.user.username);
      } else {
        setUserName(undefined);
      }
    } else {
      setUserName(undefined);
    }
  }, [auth.user]);

  const handleLogout = async () => {
    await auth.signout();
    navigate('/');
  };

  return (
    <>
      <div className="App">
        <header className="bg-gray-800 text-yellow-300 shadow-md">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-3xl font-bold text-yellow-500 hover:text-yellow-400 transition duration-300">
              Anéis da Terra-Média
            </h1>

            <nav className="flex items-center space-x-6 text-lg">
              <Link to="/" className="text-white hover:text-yellow-400 transition duration-300">Home</Link>
              {auth.user && <Link to="/rings" className="text-white hover:text-yellow-400 transition duration-300">Anéis</Link>}
              {auth.user && (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Sair
                </button>
              )}
              <span className="ml-4 text-yellow-200 font-semibold">
                {auth.user ? `Olá, ${userName}` : 'Bem-vindo'}
              </span>
            </nav>
          </div>
        </header>

        <main className="min-h-screen bg-gray-900 py-8 text-yellow-200">
          <Routes>
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/rings" element={<RequireAuth><RingsPage /></RequireAuth>} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-yellow-300 py-4 ">
          <div className="container mx-auto text-center">
            <p>© 2024 Anéis da Terra-Média. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
