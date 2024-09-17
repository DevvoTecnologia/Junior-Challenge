import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Páginas
import Home from './pages/Home/Home';
import Forge from './pages/Forge/Forge';
import Reforger from './pages/Reforger/Reforger';

// Estilos
import './assets/styles/globalStyles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forge" element={<Forge />} />
        <Route path='/reforger' element={<Reforger />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
