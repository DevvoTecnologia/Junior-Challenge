import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RingList from './pages/ListRing';
import CreateRingPage from './pages/CreateRing';
import UpdateRingPage from './pages/UpdateRing';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RingList />} />
        <Route path="/create" element={<CreateRingPage />} />
        <Route path="/update/:id" element={<UpdateRingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
