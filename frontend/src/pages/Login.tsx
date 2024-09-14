import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { login } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login({ email, password });
      localStorage.setItem('token', token);
      toast.success('Login bem-sucedido!');
      navigate('/rings');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <Box sx={{ width: '400px', margin: 'auto', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      <Typography sx={{ mt: 2 }}>
        Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
      </Typography>{' '}
    </Box>
  );
};

export default Login;
