const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const customersRoutes = require('./routes/customers');
const productsRoutes = require('./routes/products');
const invoicesRoutes = require('./routes/invoices');
const invoiceItemsRoutes = require('./routes/invoiceItems');
const dayBookRoutes = require('./routes/dayBook');

app.use('/api/customers', customersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/invoices', invoicesRoutes);
app.use('/api/invoiceItems', invoiceItemsRoutes);
app.use('/api/dayBook', dayBookRoutes);

// Set up model associations
const { Customer, Product, Invoice, InvoiceItem, DayBook } = require('./models');

// Customer - Invoice association (One-to-Many)
Customer.hasMany(Invoice, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
Invoice.belongsTo(Customer, { foreignKey: 'customer_id' });

// Invoice - InvoiceItem association (One-to-Many)
Invoice.hasMany(InvoiceItem, { foreignKey: 'invoice_id', onDelete: 'CASCADE' });
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoice_id' });

// Product - InvoiceItem association (One-to-Many)
Product.hasMany(InvoiceItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
InvoiceItem.belongsTo(Product, { foreignKey: 'product_id' });

// Start the server
app.get('/',(r,s)=>{
  db.sync().then(data=>{
    s.send(`${data}`)
  }).catch(e=>{
    s.send(`${e}`)

  })
})

db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
