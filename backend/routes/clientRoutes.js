const express = require('express');
const { 
  getClientData, 
  createClient, 
  getClientsByOwner, 
  updateClientOwner, 
  getClientWithInvoices 
} = require('../controllers/clientController'); // Asegúrate de que estas funciones existan en tu controlador

const router = express.Router();

router.get('/client-data', getClientData);
router.post('/clients', createClient);
router.get('/clients/owner', getClientsByOwner);
router.put('/clients/owner', updateClientOwner);
router.get('/clients/:id/invoices', getClientWithInvoices); // Ajuste para obtener las facturas de un cliente

module.exports = router;
