import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import styles from './App.module.css';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const [fadeClass, setFadeClass] = useState(styles.fadeIn);
  const [backgroundClass, setBackgroundClass] = useState(styles.backgroundHome);
  const [contentVisible, setContentVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setFadeClass(styles.fadeOut); 
    setContentVisible(false);

    const timeout = setTimeout(() => {
      setBackgroundClass(location.pathname === '/' ? styles.backgroundHome : styles.backgroundRegister);
      setFadeClass(styles.fadeIn);

      setTimeout(() => {
        setContentVisible(true);
      }, 500);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className={`${styles.background} ${backgroundClass} ${fadeClass}`}>
      <Header />
      {contentVisible && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
};

export default App;