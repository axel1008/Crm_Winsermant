import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import axios from 'axios'; // Para manejar las peticiones al backend

const AddClientForm = ({ onClose }) => {
  const [clientData, setClientData] = useState({
    name: '',
    company: '',
    owner: '', 
    address: '',
    province: '',
    canton: '',
    country: 'Costa Rica', // Por defecto Costa Rica
    phone: '',
    comments: ''
  });

  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  // Obtener todos los usuarios del backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos del cliente al backend
      await axios.post('http://localhost:5000/api/clients', clientData);
      alert('Cliente añadido correctamente');
      onClose(); // Cerrar el formulario modal después de añadir el cliente
    } catch (error) {
      console.error('Error al añadir el cliente:', error);
      alert('Hubo un error al añadir el cliente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" name="name" value={clientData.name} onChange={handleInputChange} required />
        <TextField label="Compañía" name="company" value={clientData.company} onChange={handleInputChange} required />
        
        {/* Selector de propietario */}
        <TextField
  select
  label="Propietario"
  name="owner"
  value={clientData.owner}
  onChange={handleInputChange}
  required
>
  {users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.nombre} {user.apellido} {/* Mostrar nombre y apellido del usuario */}
    </MenuItem>
  ))}
</TextField>



        <TextField label="Dirección" name="address" value={clientData.address} onChange={handleInputChange} />
        <TextField
          select
          label="Provincia"
          name="province"
          value={clientData.province}
          onChange={handleInputChange}
          required
        >
          {['Alajuela', 'Heredia', 'San José', 'Limón', 'Puntarenas', 'Guanacaste'].map((province) => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Cantón" name="canton" value={clientData.canton} onChange={handleInputChange} />
        <TextField label="Teléfono" name="phone" value={clientData.phone} onChange={handleInputChange} />
        <TextField label="Comentarios" name="comments" value={clientData.comments} onChange={handleInputChange} multiline rows={4} />
        <Button type="submit" variant="contained">Guardar Cliente</Button>
      </Box>
    </form>
  );
};

export default AddClientForm;
