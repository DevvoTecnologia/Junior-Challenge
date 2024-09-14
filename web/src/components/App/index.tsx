import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '../../AppRouter';

import './styles.css';

export function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="screen">
        <h1 className="title">
          <span>Rings</span>Vault
        </h1>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
