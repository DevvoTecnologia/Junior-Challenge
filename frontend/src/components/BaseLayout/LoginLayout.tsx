// components/BaseLayout/LoginLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../ThemeContext/ThemeContext';
import '../../index.css'; // Certifique-se de que este arquivo CSS está acessível

const LoginLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </div>
  );
};

export default LoginLayout;