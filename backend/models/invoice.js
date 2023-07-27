const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Invoice = sequelize.define('Invoice', {
  invoice_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total_tax_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Invoice;
