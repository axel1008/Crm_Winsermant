import React, { useState, useEffect } from 'react';
import Topbar from './topbar';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection'; // Importamos el perfil
import ChangePassword from './ChangePassword'; // Importamos el cambio de contraseña
import ClientSection from './ClientSection'; // Importamos la sección de clientes
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard'); // Estado para manejar la sección activa

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Bloquear la navegación hacia atrás
  useEffect(() => {
    const handlePopState = (event) => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const renderContent = () => {
    // Muestra contenido diferente según la sección activa
    switch (activeSection) {
      case 'mi-perfil':
        return <ProfileSection />; // Muestra el perfil del usuario
      case 'change-password':
        return <ChangePassword />; // Muestra la sección de cambiar contraseña
      case 'clientes':
        return <ClientSection />; // Muestra la sección de clientes
      default:
        return (
          <div>
            <Typography variant="h4">Bienvenido al Dashboard</Typography>
            <Typography variant="body1">Este es el panel principal del CRM.</Typography>
          </div>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar isCollapsed={isCollapsed} setActiveSection={setActiveSection} />
      <Box component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          paddingTop: '24px',  // Ajuste de padding superior
          paddingRight: '0px', // Ajuste de padding a la derecha
          paddingLeft: '0px',  // Ajuste de padding a la izquierda
          overflowY: 'auto' 
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} setActiveSection={setActiveSection} />
        {renderContent()}
      </Box>
    </Box>
  );  
};

export default Dashboard;
