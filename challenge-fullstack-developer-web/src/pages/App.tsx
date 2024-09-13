import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';

import { history } from '../helpers/history';

import { ROUTES } from '../routes';

import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import Ring from './Ring';

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CREATE_ACCOUNT} element={<CreateAccount />} />
        <Route path={ROUTES.HOME} element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
        />
        <Route path={ROUTES.RING} element={
          <PrivateRoute>
            <Ring />
          </PrivateRoute>
        }
        />
      </Routes>
    </div>
  );
}

export default App;