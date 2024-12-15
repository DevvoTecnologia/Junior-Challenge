import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './pages/Home';
import CreateRingForm from './pages/CreateRingForm';
import RingsView from './pages/RingView';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditRing from './pages/EditRingForm';

const App: React.FC = () => {
  return (
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
          <Router>
              <Header />
              <div className="flex-grow-1">
                  <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/view" element={<RingsView />} />
                  <Route path="/create" element={<CreateRingForm />} />
                  <Route path="/edit/:id" element={<EditRing/>} />                 
                  </Routes>
              </div>
              <Footer />
          </Router>
      </div>
  );
};

export default App;