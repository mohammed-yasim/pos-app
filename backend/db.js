const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false, // Disable logging (you can enable it for debugging if needed)
});

module.exports = db;
