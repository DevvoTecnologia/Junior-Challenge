import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App';

import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
