import React from 'react';
import { Tabs, Tab } from '@mui/material';

const ProfileTabs = ({ value, handleChange }) => {
  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab label="Información General" />
      <Tab label="Enlaces Sociales" />
      <Tab label="Descripción del Usuario" />
      <Tab label="Configuración de Cuenta" />
      <Tab label="Mis Preferencias" />
    </Tabs>
  );
};

export default ProfileTabs;
