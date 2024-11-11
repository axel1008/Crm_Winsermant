const Invoice = require('../models/Invoice');

exports.createInvoice = async (req, res) => {
  try {
    const { clientId, totalAmount, dueDate } = req.body;

    const invoice = await Invoice.create({
      clientId,
      totalAmount,
      dueAmount: totalAmount, // Al crear, el monto debido es el total
      dueDate,
      status: 'unpaid'
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la factura' });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las facturas' });
  }
};
