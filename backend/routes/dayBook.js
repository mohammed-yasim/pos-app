const express = require('express');
const router = express.Router();
const { DayBook } = require('../models');

// GET all day-book transactions
router.get('/', async (req, res) => {
  try {
    const dayBookTransactions = await DayBook.findAll();
    res.json(dayBookTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a specific day-book transaction by ID
router.get('/:id', async (req, res) => {
  const transactionId = req.params.id;
  try {
    const dayBookTransaction = await DayBook.findByPk(transactionId);
    if (!dayBookTransaction) {
      return res.status(404).json({ message: 'Day-book transaction not found' });
    }
    res.json(dayBookTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new day-book transaction
router.post('/', async (req, res) => {
  const { transaction_date, transaction_type, transaction_description, amount } = req.body;
  try {
    const newTransaction = await DayBook.create({
      transaction_date,
      transaction_type,
      transaction_description,
      amount,
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT (update) an existing day-book transaction
router.put('/:id', async (req, res) => {
  const transactionId = req.params.id;
  const { transaction_date, transaction_type, transaction_description, amount } = req.body;
  try {
    const dayBookTransaction = await DayBook.findByPk(transactionId);
    if (!dayBookTransaction) {
      return res.status(404).json({ message: 'Day-book transaction not found' });
    }

    // Update the day-book transaction properties
    dayBookTransaction.transaction_date = transaction_date;
    dayBookTransaction.transaction_type = transaction_type;
    dayBookTransaction.transaction_description = transaction_description;
    dayBookTransaction.amount = amount;

    await dayBookTransaction.save();
    res.json(dayBookTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a day-book transaction
router.delete('/:id', async (req, res) => {
  const transactionId = req.params.id;
  try {
    const dayBookTransaction = await DayBook.findByPk(transactionId);
    if (!dayBookTransaction) {
      return res.status(404).json({ message: 'Day-book transaction not found' });
    }

    await dayBookTransaction.destroy();
    res.status(204).json({ message: 'Day-book transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
