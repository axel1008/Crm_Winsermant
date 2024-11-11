import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Button, Grid, Paper, Divider } from '@mui/material';
import { CameraAlt as CameraIcon, Edit as EditIcon } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const ProfileSection = () => {
  const [profilePic, setProfilePic] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  
  const [openProjects, setOpenProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [totalWorkedHours, setTotalWorkedHours] = useState(0);
  const [totalProjectHours, setTotalProjectHours] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setNombre(decodedToken.nombre);
      setApellido(decodedToken.apellido);
      setEmail(decodedToken.email);

      const fetchUserStats = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/projects/stats', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { openProjects, completedProjects, totalWorkedHours, totalProjectHours } = response.data;

          setOpenProjects(openProjects);
          setCompletedProjects(completedProjects);
          setTotalWorkedHours(totalWorkedHours);
          setTotalProjectHours(totalProjectHours);
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      };

      fetchUserStats();
    }
  }, []);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        backgroundColor: '#1E1E2F',
        color: '#fff',
        borderRadius: '15px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        {/* Sección de la imagen de perfil */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Profile Picture"
            src={profilePic || '/static/images/avatar/1.jpg'}
            sx={{ width: 120, height: 120, border: '2px solid #4CAF50' }}
          />
          <Box sx={{ ml: 3 }}>
            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
              {`${nombre} ${apellido}`}
              <EditIcon sx={{ ml: 1, fontSize: '1rem', cursor: 'pointer' }} />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {email}
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<CameraIcon />}
              sx={{ mt: 2, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }}
            >
              Subir Imagen
              <input type="file" hidden onChange={handleUploadImage} />
            </Button>
          </Box>
        </Box>

        {/* Métricas en tiempo real alineadas a la derecha */}
        <Grid container spacing={3} sx={{ width: '50%', textAlign: 'center', alignItems: 'center', position: 'relative' }}>
          <Grid item xs={6} sx={{ position: 'relative' }}>
            <Typography variant="h5">{openProjects}</Typography>
            <Typography variant="body2">Open Projects</Typography>
          </Grid>

          <Grid item xs={6} sx={{ position: 'relative' }}>
            <Typography variant="h5">{completedProjects}</Typography>
            <Typography variant="body2">Projects Completed</Typography>
          </Grid>

          {/* Línea divisoria horizontal */}
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <Divider sx={{ width: '100%', borderWidth: '2px', backgroundColor: '#fff' }} />
            {/* Línea divisoria vertical en el centro */}
            <Divider orientation="vertical" sx={{ position: 'absolute', top: '-50px', left: '50%', height: 'calc(100% + 100px)', borderWidth: '2px', backgroundColor: '#fff' }} />
          </Grid>

          <Grid item xs={6} sx={{ position: 'relative' }}>
            <Typography variant="h5">{totalWorkedHours}</Typography>
            <Typography variant="body2">Total de Horas Trabajadas</Typography>
          </Grid>

          <Grid item xs={6} sx={{ position: 'relative' }}>
            <Typography variant="h5">{totalProjectHours}</Typography>
            <Typography variant="body2">Total de Horas del Proyecto</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ProfileSection;
