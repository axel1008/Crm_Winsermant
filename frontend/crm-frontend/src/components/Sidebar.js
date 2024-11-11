import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import {
  AccountBox,
  Dashboard,
  Event,
  Work,
  CheckCircle,
  Layers,
  Subscriptions,
  ShoppingCart,
  Note,
  Message,
  People,
  AssignmentTurnedIn,
  Receipt,
  Report,
  Folder,
  Help,
  Settings,
  ExpandLess,
  ExpandMore,
  Person,
} from '@mui/icons-material';

const Sidebar = ({ isCollapsed, setActiveSection }) => {
  const [openSales, setOpenSales] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);

  const handleClickSales = () => {
    setOpenSales(!openSales);
  };

  const handleClickTeam = () => {
    setOpenTeam(!openTeam);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 80 : 240, // Ajuste del ancho cuando la barra está contraída
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? 80 : 240, // Cambia el tamaño del Drawer
          boxSizing: 'border-box',
          transition: 'width 0.3s', // Transición suave al contraer
          backgroundColor: '#253564', // Fondo oscuro para mayor contraste
          color: '#fff', // Color de texto blanco para mejor visibilidad
          overflowX: 'hidden', // Asegura que el contenido no se desborde horizontalmente
        },
      }}
    >
      <List>
        <ListItem button onClick={() => setActiveSection('mi-perfil')}>
          <ListItemIcon><AccountBox style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Mi Perfil" />}
        </ListItem>

        <ListItem button onClick={() => setActiveSection('clientes')}>
          <ListItemIcon><Person style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Clientes" />}
        </ListItem>

        {[{ text: 'Escritorio', icon: <Dashboard style={{ color: '#fff' }} /> },
          { text: 'Eventos', icon: <Event style={{ color: '#fff' }} /> },
          { text: 'Proyectos', icon: <Work style={{ color: '#fff' }} /> },
          { text: 'Tareas', icon: <CheckCircle style={{ color: '#fff' }} /> },
          { text: 'Referidos', icon: <Layers style={{ color: '#fff' }} /> },
          { text: 'Suscripciones', icon: <Subscriptions style={{ color: '#fff' }} /> },
        ].map((item, index) => (
          <ListItem button key={index} onClick={() => setActiveSection(item.text.toLowerCase())}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {!isCollapsed && <ListItemText primary={item.text} />}
          </ListItem>
        ))}

        <ListItem button onClick={handleClickSales}>
          <ListItemIcon>
            <ShoppingCart style={{ color: '#fff' }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Ventas" />}
          {openSales && !isCollapsed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSales && !isCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => setActiveSection('ventas1')}>
              <ListItemText primary="Ventas 1" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => setActiveSection('ventas2')}>
              <ListItemText primary="Ventas 2" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => setActiveSection('notas')}>
          <ListItemIcon><Note style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Notas" />}
        </ListItem>

        <ListItem button onClick={() => setActiveSection('mensajes')}>
          <ListItemIcon><Message style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Mensajes" />}
        </ListItem>

        <ListItem button onClick={handleClickTeam}>
          <ListItemIcon><People style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Equipo" />}
          {openTeam && !isCollapsed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openTeam && !isCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => setActiveSection('miembros-equipo')}>
              <ListItemText primary="Miembros del equipo" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => setActiveSection('tickets')}>
          <ListItemIcon><AssignmentTurnedIn style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Tickets" />}
        </ListItem>

        <ListItem button onClick={() => setActiveSection('gastos')}>
          <ListItemIcon><Receipt style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Gastos" />}
        </ListItem>

        <ListItem button onClick={() => setActiveSection('informes')}>
          <ListItemIcon><Report style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Informes" />}
        </ListItem>

        <ListItem button onClick={() => setActiveSection('archivos')}>
          <ListItemIcon><Folder style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Archivos" />}
        </ListItem>

        <ListItem button onClick={() => setActiveSection('ayuda-soporte')}>
          <ListItemIcon><Help style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Ayuda y Soporte" />}
        </ListItem>

        <ListItem button onClick={() => setActiveSection('configuraciones')}>
          <ListItemIcon><Settings style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Configuraciones" />}
        </ListItem>

        <ListItem button onClick={() => setActiveSection('pendientes')}>
          <ListItemIcon><CheckCircle style={{ color: '#fff' }} /></ListItemIcon>
          {!isCollapsed && <ListItemText primary="Pendientes" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
