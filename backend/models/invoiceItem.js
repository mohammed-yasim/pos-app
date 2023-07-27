const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const InvoiceItem = sequelize.define('InvoiceItem', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  item_tax_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = InvoiceItem;
