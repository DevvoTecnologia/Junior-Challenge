import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Tela inicial ou outra tela
import RingCarousel from './components/RingCarousel'; // Tela de visualização do carrossel
import RingManager from './components/RingManager'; // Tela de gerenciamento de anéis

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-rings" element={<RingCarousel />} />
          <Route path="/manage-rings" element={<RingManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
