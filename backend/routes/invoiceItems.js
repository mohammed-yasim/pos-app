const express = require('express');
const router = express.Router();
const { InvoiceItem, Product } = require('../models');

// GET all invoice items
router.get('/', async (req, res) => {
  try {
    const invoiceItems = await InvoiceItem.findAll({ include: [Product] });
    res.json(invoiceItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a specific invoice item by ID
router.get('/:id', async (req, res) => {
  const invoiceItemId = req.params.id;
  try {
    const invoiceItem = await InvoiceItem.findByPk(invoiceItemId, { include: [Product] });
    if (!invoiceItem) {
      return res.status(404).json({ message: 'Invoice item not found' });
    }
    res.json(invoiceItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new invoice item
router.post('/', async (req, res) => {
  const { invoice_id, product_id, quantity, unit_price, item_tax_amount } = req.body;
  try {
    const newInvoiceItem = await InvoiceItem.create({
      invoice_id,
      product_id,
      quantity,
      unit_price,
      item_tax_amount,
    });
    res.status(201).json(newInvoiceItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT (update) an existing invoice item
router.put('/:id', async (req, res) => {
  const invoiceItemId = req.params.id;
  const { invoice_id, product_id, quantity, unit_price, item_tax_amount } = req.body;
  try {
    const invoiceItem = await InvoiceItem.findByPk(invoiceItemId);
    if (!invoiceItem) {
      return res.status(404).json({ message: 'Invoice item not found' });
    }

    // Update the invoice item properties
    invoiceItem.invoice_id = invoice_id;
    invoiceItem.product_id = product_id;
    invoiceItem.quantity = quantity;
    invoiceItem.unit_price = unit_price;
    invoiceItem.item_tax_amount = item_tax_amount;

    await invoiceItem.save();
    res.json(invoiceItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE an invoice item
router.delete('/:id', async (req, res) => {
  const invoiceItemId = req.params.id;
  try {
    const invoiceItem = await InvoiceItem.findByPk(invoiceItemId);
    if (!invoiceItem) {
      return res.status(404).json({ message: 'Invoice item not found' });
    }

    await invoiceItem.destroy();
    res.status(204).json({ message: 'Invoice item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
