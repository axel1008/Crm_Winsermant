import React, { useState } from 'react';
import { Box, Tabs, Tab, ButtonGroup, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import VistaGeneral from './VistaGeneral';
import Clientes from './Clientes';
import Contactos from './Contactos';
import AddClientForm from './AddClientForm'; // Importar el formulario de añadir cliente

const ClientSection = () => {
  const [activeTab, setActiveTab] = useState(0); // Controla la pestaña activa
  const [openAddClient, setOpenAddClient] = useState(false); // Controla el estado del diálogo para añadir cliente

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Función para abrir el modal de añadir cliente
  const handleAddClientOpen = () => {
    setOpenAddClient(true);
  };

  // Función para cerrar el modal de añadir cliente
  const handleAddClientClose = () => {
    setOpenAddClient(false);
  };

  return (
    <Box>
      {/* Barra de pestañas y botones en la parte superior */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Vista General" />
          <Tab label="Clientes" />
          <Tab label="Contactos" />
        </Tabs>

        {/* Botones de acción */}
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Manejar Etiquetas</Button>
          <Button>Importar Clientes</Button>
          <Button variant="contained" onClick={handleAddClientOpen}>Añadir Cliente</Button>
        </ButtonGroup>
      </Box>

      {/* Renderizar el contenido según la pestaña seleccionada */}
      {activeTab === 0 && <VistaGeneral />}
      {activeTab === 1 && <Clientes />}
      {activeTab === 2 && <Contactos />}

      {/* Modal o diálogo para añadir cliente */}
      <Dialog open={openAddClient} onClose={handleAddClientClose}>
        <DialogTitle>Añadir Nuevo Cliente</DialogTitle>
        <DialogContent>
          <AddClientForm onClose={handleAddClientClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ClientSection;
