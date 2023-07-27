const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a specific customer by ID
router.get('/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new customer
router.post('/', async (req, res) => {
  const { customer_name, customer_address, customer_email, customer_phone } = req.body;
  try {
    const newCustomer = await Customer.create({
      customer_name,
      customer_address,
      customer_email,
      customer_phone,
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT (update) an existing customer
router.put('/:id', async (req, res) => {
  const customerId = req.params.id;
  const { customer_name, customer_address, customer_email, customer_phone } = req.body;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Update the customer's properties
    customer.customer_name = customer_name;
    customer.customer_address = customer_address;
    customer.customer_email = customer_email;
    customer.customer_phone = customer_phone;

    await customer.save();
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a customer
router.delete('/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();
    res.status(204).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
