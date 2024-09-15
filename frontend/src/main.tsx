import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './routes/Router.tsx'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
