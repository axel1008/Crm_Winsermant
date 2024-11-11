const express = require('express');
const { createInvoice, getAllInvoices } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/invoices', createInvoice);
router.get('/invoices', getAllInvoices);

module.exports = router;
