const express = require('express');
const router = express.Router();
const { Invoice, Customer, InvoiceItem, Product } = require('../models');

// GET all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Customer }, { model: InvoiceItem, include: [Product] }],
    });
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a specific invoice by ID
router.get('/:id', async (req, res) => {
  const invoiceId = req.params.id;
  try {
    const invoice = await Invoice.findByPk(invoiceId, {
      include: [{ model: Customer }, { model: InvoiceItem, include: [Product] }],
    });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new invoice
router.post('/', async (req, res) => {
  const { customer_id, invoice_date, items } = req.body;

  try {
    // Create the invoice
    const newInvoice = await Invoice.create({
      customer_id,
      invoice_date,
    });

    // Create invoice items and associate them with the invoice
    for (const item of items) {
      const { product_id, quantity, unit_price, item_tax_amount } = item;
      await InvoiceItem.create({
        invoice_id: newInvoice.invoice_id,
        product_id,
        quantity,
        unit_price,
        item_tax_amount,
      });
    }

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT (update) an existing invoice
router.put('/:id', async (req, res) => {
  const invoiceId = req.params.id;
  const { customer_id, invoice_date, items } = req.body;

  try {
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Update the invoice properties
    invoice.customer_id = customer_id;
    invoice.invoice_date = invoice_date;
    await invoice.save();

    // Delete existing invoice items associated with the invoice
    await InvoiceItem.destroy({ where: { invoice_id: invoiceId } });

    // Create new invoice items and associate them with the invoice
    for (const item of items) {
      const { product_id, quantity, unit_price, item_tax_amount } = item;
      await InvoiceItem.create({
        invoice_id: invoiceId,
        product_id,
        quantity,
        unit_price,
        item_tax_amount,
      });
    }

    res.json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE an invoice
router.delete('/:id', async (req, res) => {
  const invoiceId = req.params.id;
  try {
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    await invoice.destroy();
    res.status(204).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;