import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button color="secondary" onClick={handleLogout}>
      Sair
    </Button>
  );
};

export default LogoutButton;
