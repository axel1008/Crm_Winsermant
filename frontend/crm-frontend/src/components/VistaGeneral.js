// src/components/VistaGeneral.js

import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, LinearProgress } from '@mui/material';
import { BusinessCenter, Contacts } from '@mui/icons-material';
import axios from 'axios';

const VistaGeneral = () => {
  const [clientData, setClientData] = useState({
    totalClients: 0,
    totalContacts: 0,
    registeredToday: 0,
    registeredLast7Days: 0,
    unpaidInvoices: 0,
    partiallyPaidInvoices: 0,
    overdueInvoices: 0,
    openProjects: 0,
    completedProjects: 0,
    projectsOnHold: 0,
    cancelledProjects: 0,
  });

  useEffect(() => {
    // Llamada al backend para obtener los datos
    const fetchClientData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/client-data');
        setClientData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de los clientes', error);
      }
    };

    fetchClientData();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Vista General */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 2 }}>
          <BusinessCenter color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h6">Total de Clientes</Typography>
          <Typography variant="h3" color="primary">{clientData.totalClients}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 2 }}>
          <Contacts color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h6">Total de Contactos</Typography>
          <Typography variant="h3" color="primary">{clientData.totalContacts}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Contactos Registrados Hoy</Typography>
          <Typography variant="h3" color="primary">{clientData.registeredToday}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Contactos Registrados en los últimos 7 días</Typography>
          <Typography variant="h3" color="primary">{clientData.registeredLast7Days}</Typography>
        </Paper>
      </Grid>

      {/* Facturas Impagas */}
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">El cliente tiene facturas impagas</Typography>
          <Typography variant="body1">{(clientData.unpaidInvoices / clientData.totalClients) * 100 || 0}% del total de clientes</Typography>
          <LinearProgress variant="determinate" value={(clientData.unpaidInvoices / clientData.totalClients) * 100 || 0} color="primary" sx={{ height: 10, borderRadius: 5, mt: 1 }} />
          <Typography variant="h3" color="primary">{clientData.unpaidInvoices}</Typography>
        </Paper>
      </Grid>

      {/* Facturas Vencidas */}
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">El cliente tiene facturas vencidas</Typography>
          <Typography variant="body1">{(clientData.overdueInvoices / clientData.totalClients) * 100 || 0}% del total de clientes</Typography>
          <LinearProgress variant="determinate" value={(clientData.overdueInvoices / clientData.totalClients) * 100 || 0} color="secondary" sx={{ height: 10, borderRadius: 5, mt: 1 }} />
          <Typography variant="h3" color="primary">{clientData.overdueInvoices}</Typography>
        </Paper>
      </Grid>

      {/* Proyectos */}
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Proyectos</Typography>
          <Typography variant="body2">Los clientes tienen proyectos abiertos</Typography>
          <Typography variant="body1">{clientData.openProjects}</Typography>
          <Typography variant="body2">Los clientes han completado proyectos</Typography>
          <Typography variant="body1">{clientData.completedProjects}</Typography>
          <Typography variant="body2">Los clientes tienen proyectos en espera</Typography>
          <Typography variant="body1">{clientData.projectsOnHold}</Typography>
          <Typography variant="body2">El cliente ha cancelado proyectos</Typography>
          <Typography variant="body1">{clientData.cancelledProjects}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VistaGeneral;
