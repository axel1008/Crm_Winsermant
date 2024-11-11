import React, { useEffect, useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, MenuItem, Select, Box, Menu, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GridViewIcon from '@mui/icons-material/GridView';
import WorkIcon from '@mui/icons-material/Work';
import TvIcon from '@mui/icons-material/Tv';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PublicIcon from '@mui/icons-material/Public';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de que el token esté decodificado correctamente
import { ThemeContext } from '../ThemeContext';

const Topbar = ({ toggleSidebar, setActiveSection }) => {
  const [filter, setFilter] = useState('Tarea'); // Estado para el filtro seleccionado
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú del perfil
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Acceso al contexto del tema

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodifica el token para obtener los datos del usuario
      const decodedToken = jwtDecode(token);
      if (decodedToken.username) {
        setUsername(decodedToken.username);
      }
    }
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Función para abrir el menú del perfil
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú del perfil
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    window.location.href = '/';
    // Elimina el historial de navegación para evitar que el usuario pueda volver atrás
    window.history.pushState(null, null, window.location.href);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{
        justifyContent: 'space-between',
        backgroundColor: '#88898b',
        right: '15px',
        width: '100%',
        marginTop: '-25px', // Eliminar el espacio superior
      
      }}>
        {/* Sección de iconos nuevos a la izquierda */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Tooltip title="Contraer barra lateral">
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar} sx={{ mr: 2,  color: 'white'}}>
              <MenuIcon  />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pendientes">
            <IconButton edge="start" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Proyectos favoritos">
            <IconButton edge="start" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <GridViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clientes favoritos">
            <IconButton edge="start" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <WorkIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Lista de paneles">
            <IconButton edge="start" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <TvIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tareas">
            <IconButton edge="start" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <AccessAlarmIcon style={{ color: 'red' }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Sección de búsqueda con filtro */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '30px',
          backgroundColor: '#f1f1f1',
          padding: '5px 15px',
      
        }}>
          <Select
            value={filter}
            onChange={handleFilterChange}
            variant="standard"
            disableUnderline
            sx={{ mr: 2 }}
          >
            <MenuItem value="Tarea">Tarea</MenuItem>
            <MenuItem value="Proyecto">Proyecto</MenuItem>
            <MenuItem value="Cliente">Cliente</MenuItem>
            <MenuItem value="Pendientes">Pendientes</MenuItem>
          </Select>
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%' }}
          />
          <IconButton><SearchIcon /></IconButton>
        </Box>

        {/* Sección de iconos originales a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Tooltip title="Añadir">
            <IconButton edge="end" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Idioma">
            <IconButton edge="end" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <PublicIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Recordatorios">
            <IconButton edge="end" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <AccessAlarmIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notificaciones">
            <IconButton edge="end" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mensajes">
            <IconButton edge="end" color="inherit" sx={{ mr: 2,  color: 'white' }}>
              <MailIcon />
            </IconButton>
          </Tooltip>

          {/* Sección del perfil con el menú */}
          <Tooltip title="Perfil">
            <Typography variant="body1" sx={{ cursor: 'pointer', ml: 2, color: 'white', marginRight: '36px'}} onClick={handleMenuOpen}>
              {username ? username : 'Usuario'}
            </Typography>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem>
              Modo oscuro
              <Switch checked={darkMode} onChange={toggleDarkMode} />
            </MenuItem>
            <MenuItem onClick={() => setActiveSection('mi-perfil')}>Mi Perfil</MenuItem>
            <MenuItem onClick={() => setActiveSection('change-password')}>Cambiar Contraseña</MenuItem>
            <MenuItem>Mis Preferencias</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
