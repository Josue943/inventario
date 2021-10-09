const Category = require('./models/category');
const Client = require('./models/client');
const Product = require('./models/product');
const Sale = require('./models/sale');
const SaleProduct = require('./models/saleProduct');
const Supplier = require('./models/supplier');
const User = require('./models/user');

const sequelize = require('./db');

const products = [
  {
    id: '6938104006403',
    name: '1/ Anti- Chlorine Special Dophin 200ml',
    costPrice: 0,
    salePrice: 4250,
    wholesalePrice: 0,
    stock: 2,
    minStock: 2,
    maxStock: 6,
    categoryId: null,
    sold: 5,
  },
  {
    id: '6938104006571',
    name: '14 / Bacteria Dophin 200ml',
    costPrice: 0,
    salePrice: 5860,
    wholesalePrice: 0,
    stock: 0,
    minStock: 1,
    maxStock: 6,
    categoryId: null,
  },
  {
    id: '6938104006595',
    name: '15 / P S B Dophin 200ml',
    costPrice: 0,
    salePrice: 5250,
    wholesalePrice: 0,
    stock: 4,
    minStock: 2,
    maxStock: 6,
    categoryId: null,
    sold: 3,
  },
  {
    id: '6938104010370',
    name: 'Bomba De Aire RC-003',
    costPrice: 0,
    salePrice: 12950,
    wholesalePrice: 0,
    stock: 7,
    minStock: 0,
    maxStock: 0,
    categoryId: 1,
  },
];

const suppliers = [
  {
    address: null,
    documentId: 'kdjfdksjfkdsjkfds',
    documentType: 'otro',
    email: 'josue@hotmail.com',
    managerName: 'jorge',
    name: 'coca cola',
    phone: '454521358',
  },
  {
    address: null,
    documentId: '1111111111111',
    documentType: 'otro',
    email: 'carlos@hotmail.com',
    managerName: 'mario',
    name: 'dos pinos',
    phone: '22222222',
  },
  {
    address: null,
    documentId: 'dfsdfds',
    documentType: 'otro',
    email: 'katy@hotmail.com',
    managerName: 'maria',
    name: 'pepsi',
    phone: '99999',
  },
];

const sales = [
  {
    cashPayment: true,
    total: 5000,
  },
  {
    cashPayment: false,
    total: 8000,
  },
];

const saleProducts = [
  {
    saleId: 1,
    productId: '6938104006403',
    quantity: 2,
    unitPrice: 800,
  },
  {
    saleId: 1,
    productId: '6938104006571',
    quantity: 1,
    unitPrice: 800,
  },
  {
    saleId: 2,
    productId: '6938104006403',
    quantity: 3,
    unitPrice: 1200,
  },
];

const users = [
  {
    documentId: '1111111111111',
    documentType: 'ggg',
    email: 'josue@hotmail.com',
    managerName: 'mario',
    names: 'josue',
    surnames: 'cordero',
    phone: '22222222',
    genre: 'mas',
    username: 'josue',
    email: 'josue@hotmail.com',
    password: '123456',
    avatar: 'gg',
  },
];

const clients = [
  {
    documentId: '111111111f1111',
    documentType: 'ggg',
    email: 'josue@hotmail.com',
    names: 'josue',
    surnames: 'cordero',
    phone: '22222222',
  },
];

const categories = [{ name: 'filtración' }];

(async () => {
  try {
    await sequelize.sync({ force: true });
    await Category.bulkCreate(categories);
    await Client.bulkCreate(clients);
    await Product.bulkCreate(products);
    await Sale.bulkCreate(sales);
    await SaleProduct.bulkCreate(saleProducts);
    await Supplier.bulkCreate(suppliers);
    await User.bulkCreate(users);
  } catch (error) {
    console.error(error);
  }
})();
