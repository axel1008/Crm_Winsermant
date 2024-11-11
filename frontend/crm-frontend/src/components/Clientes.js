import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, TextField, Menu, MenuItem, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FilterList, Print, FileDownload, Search, Edit, Delete, VisibilityOff, Visibility } from '@mui/icons-material'; // Añadimos los iconos de visibilidad
import AddClientForm from './AddClientForm'; // Componente de formulario para añadir cliente
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Clientes = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [hiddenColumns, setHiddenColumns] = useState([]); // Para controlar qué columnas están ocultas
  const [openAddClient, setOpenAddClient] = useState(false); // Para abrir y cerrar el modal de añadir cliente

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };
    fetchClients();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleToggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((col) => col !== column));
    } else {
      setHiddenColumns([...hiddenColumns, column]);
    }
    handleFilterClose();
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(clients);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'clientes.xlsx');
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseAddClient = () => {
    setOpenAddClient(false); // Cierra el modal
  };

  return (
    <Box>
      {/* Barra de pestañas y botones en la parte superior */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Filtro desplegable */}
          <IconButton onClick={handleFilterClick}>
            <FilterList />
          </IconButton>
          <Button onClick={() => console.log('Add filter')}>+ Agregar nuevo filtro</Button>

          <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
            <MenuItem onClick={() => handleToggleColumn('id')}>
              {hiddenColumns.includes('id') ? <VisibilityOff /> : <Visibility />} ID
            </MenuItem>
            <MenuItem onClick={() => handleToggleColumn('name')}>
              {hiddenColumns.includes('name') ? <VisibilityOff /> : <Visibility />} Nombre del cliente
            </MenuItem>
            <MenuItem onClick={() => handleToggleColumn('company')}>
              {hiddenColumns.includes('company') ? <VisibilityOff /> : <Visibility />} Compañía
            </MenuItem>
            <MenuItem onClick={() => handleToggleColumn('phone')}>
              {hiddenColumns.includes('phone') ? <VisibilityOff /> : <Visibility />} Teléfono
            </MenuItem>
            <MenuItem onClick={() => handleToggleColumn('projects')}>
              {hiddenColumns.includes('projects') ? <VisibilityOff /> : <Visibility />} Proyectos
            </MenuItem>
            <MenuItem onClick={() => handleToggleColumn('totalBilled')}>
              {hiddenColumns.includes('totalBilled') ? <VisibilityOff /> : <Visibility />} Total facturado
            </MenuItem>
            <MenuItem onClick={() => handleToggleColumn('paymentReceived')}>
              {hiddenColumns.includes('paymentReceived') ? <VisibilityOff /> : <Visibility />} Pago recibido
            </MenuItem>
            <MenuItem onClick={() => handleToggleColumn('amountDue')}>
              {hiddenColumns.includes('amountDue') ? <VisibilityOff /> : <Visibility />} Adeudadas
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Botón para exportar en Excel */}
          <Button startIcon={<FileDownload />} onClick={handleExportExcel}>
            Excel
          </Button>

          {/* Botón para imprimir */}
          <Button startIcon={<Print />} onClick={() => window.print()}>
            Imprimir
          </Button>

          {/* Barra de búsqueda */}
          <TextField
            variant="outlined"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
            sx={{ ml: 2 }}
          />
        </Box>
      </Box>

      {/* Tabla de clientes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {!hiddenColumns.includes('id') && <TableCell>ID</TableCell>}
              {!hiddenColumns.includes('name') && <TableCell>Nombre del cliente</TableCell>}
              {!hiddenColumns.includes('company') && <TableCell>Compañía</TableCell>}
              {!hiddenColumns.includes('phone') && <TableCell>Teléfono</TableCell>}
              {!hiddenColumns.includes('projects') && <TableCell>Proyectos</TableCell>}
              {!hiddenColumns.includes('totalBilled') && <TableCell>Total Facturado</TableCell>}
              {!hiddenColumns.includes('paymentReceived') && <TableCell>Pago Recibido</TableCell>}
              {!hiddenColumns.includes('amountDue') && <TableCell>Adeudadas</TableCell>}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                {!hiddenColumns.includes('id') && <TableCell>{client.id}</TableCell>}
                {!hiddenColumns.includes('name') && <TableCell>{client.name}</TableCell>}
                {!hiddenColumns.includes('company') && <TableCell>{client.company}</TableCell>}
                {!hiddenColumns.includes('phone') && <TableCell>{client.phone}</TableCell>}
                {!hiddenColumns.includes('projects') && <TableCell>{client.projects}</TableCell>}
                {!hiddenColumns.includes('totalBilled') && <TableCell>{client.totalBilled}</TableCell>}
                {!hiddenColumns.includes('paymentReceived') && <TableCell>{client.paymentReceived}</TableCell>}
                {!hiddenColumns.includes('amountDue') && <TableCell>{client.amountDue}</TableCell>}
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para añadir cliente */}
      <Dialog open={openAddClient} onClose={handleCloseAddClient}>
        <DialogTitle>Añadir Cliente</DialogTitle>
        <DialogContent>
          <AddClientForm onClose={handleCloseAddClient} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddClient} color="secondary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Clientes;
