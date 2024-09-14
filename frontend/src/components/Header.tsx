import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import LogoutButton from './LogoutButton';

import logo from '../assets/images/logo-devvo.png';

const Header: React.FC = () => {
  return (
    <AppBar position="static" style={{ background: 'black' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6" align="center">
            Gerenciamento de Anéis
          </Typography>
        </Box>

        <Box>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
