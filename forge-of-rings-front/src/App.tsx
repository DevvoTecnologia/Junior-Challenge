import { BrowserRouter } from 'react-router-dom'

import './App.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Router } from './routes/Router'
import { Header } from './components/Header/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  )
}

export default App
