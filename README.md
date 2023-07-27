# pos-app

├── backend/
|    ├── db.js
|    ├── index.js
|    ├── models/
|    |    ├── customer.js
|    |    ├── product.js
|    |    ├── invoice.js
|    |    ├── invoiceItem.js
|    |    └── dayBook.js
|    └── routes/
|         ├── customers.js
|         ├── products.js
|         ├── invoices.js
|         ├── invoiceItems.js
|         └── dayBook.js
├── frontend/
|    ├── public/
|    |    ├── index.html
|    |    └── ...
|    ├── src/
|    |    ├── components/
|    |    |    ├── CustomerList.js
|    |    |    ├── ProductList.js
|    |    |    ├── InvoiceList.js
|    |    |    ├── DayBookList.js
|    |    |    └── ...
|    |    ├── pages/
|    |    |    ├── CustomersPage.js
|    |    |    ├── ProductsPage.js
|    |    |    ├── InvoicesPage.js
|    |    |    ├── DayBookPage.js
|    |    |    └── ...
|    |    ├── App.js
|    |    ├── index.js
|    |    └── ...
|    ├── package.json
|    ├── package-lock.json
|    └── ...
├── .env
├── .gitignore
├── package.json   // The root package.json for the entire project
├── package-lock.json
└── ...
