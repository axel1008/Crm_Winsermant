const Client = require('../models/Client');
const Invoice = require('../models/Invoice');

// Controlador para obtener los datos del cliente
exports.getClientData = async (req, res) => {
  try {
    // Lógica para obtener los datos de los clientes
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error al obtener los datos de clientes:', error);
    res.status(500).json({ message: 'Error al obtener los datos de clientes' });
  }
};

// Controlador para crear un nuevo cliente
exports.createClient = async (req, res) => {
  try {
    const { name, company, owner, address, province, canton, country, phone, comments } = req.body;
    const newClient = await Client.create({
      name, company, owner, address, province, canton, country, phone, comments
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ message: 'Error al crear el cliente' });
  }
};

// Controlador para obtener clientes por propietario
exports.getClientsByOwner = async (req, res) => {
  try {
    const ownerId = req.user.id; // Asumiendo que el ID del propietario está en el token de usuario autenticado
    const clients = await Client.findAll({ where: { owner: ownerId } });
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error al obtener los clientes del propietario:', error);
    res.status(500).json({ message: 'Error al obtener los clientes del propietario' });
  }
};

// Controlador para actualizar el propietario de un cliente
exports.updateClientOwner = async (req, res) => {
  try {
    const { clientId, newOwner } = req.body;
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    client.owner = newOwner;
    await client.save();
    res.status(200).json({ message: 'Propietario actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar el propietario del cliente:', error);
    res.status(500).json({ message: 'Error al actualizar el propietario del cliente' });
  }
};

// Controlador para obtener las facturas de un cliente
exports.getClientWithInvoices = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findByPk(clientId, {
      include: [{ model: Invoice, as: 'invoices' }]
    });
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error al obtener las facturas del cliente:', error);
    res.status(500).json({ message: 'Error al obtener las facturas del cliente' });
  }
};
