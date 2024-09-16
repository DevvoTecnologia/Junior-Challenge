import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RingForm from './pages/form/RingForm';
import ViewRings from './pages/ringList/ViewRings';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RingForm />} />
        <Route path="/aneis" element={<ViewRings />} />
        <Route path="/aneis/:id" element={<RingForm />} />
      </Routes>
    </Router>
  );
};

export default App;
