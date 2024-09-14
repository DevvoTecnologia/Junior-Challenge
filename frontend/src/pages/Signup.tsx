// src/pages/Signup.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { signup, login } from '../services/auth'; // Importa o login também
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    try {
      await signup({ name, email, password });
      toast.success('Cadastro realizado com sucesso!');

      const token = await login({ email, password });
      localStorage.setItem('token', token);

      navigate('/rings');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao fazer cadastro');
    }
  };

  return (
    <Box sx={{ width: '400px', margin: 'auto', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
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
        <TextField
          fullWidth
          label="Repetir Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Cadastrar
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
