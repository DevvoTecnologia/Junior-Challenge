import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>     
    <App />  
   
  </StrictMode>,
)
