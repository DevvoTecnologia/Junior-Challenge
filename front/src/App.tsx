import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="font-poppins">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive={false} />
          <Route path="/login" element={<Login />} caseSensitive={false} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
