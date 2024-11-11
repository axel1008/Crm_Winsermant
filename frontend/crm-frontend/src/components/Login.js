import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      console.log('Respuesta del servidor:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al autenticar:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 2, sm: 3, md: 4 }, // Ajuste de padding según el tamaño de pantalla
          maxWidth: { xs: '100%', sm: '400px' }, // Ajuste del ancho en pantallas pequeñas
          boxShadow: { xs: 'none', sm: '0px 4px 12px rgba(0, 0, 0, 0.1)' }, // Sombra ligera en pantallas más grandes
          borderRadius: { xs: 0, sm: '10px' }, // Sin borde en móviles, con borde en pantallas grandes
          backgroundColor: { xs: 'transparent', sm: '#fff' }, // Fondo blanco en pantallas grandes, transparente en móviles
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
