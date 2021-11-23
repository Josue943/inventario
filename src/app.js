const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
require('express-async-errors');

app.use(cors());
app.use(express.json());
app.use('/api/categories', require('./controllers/category'));
app.use('/api/people', require('./controllers/person'));
app.use('/api/products', require('./controllers/product'));
app.use('/api/suppliers', require('./controllers/supplier'));
app.use('/api/sales', require('./controllers/sale'));
app.use('/api/users', require('./controllers/user'));
app.use(errorHandler);

module.exports = app;
