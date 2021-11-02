const Category = require('./models/category');
const Client = require('./models/client');
const Person = require('./models/person');
const Product = require('./models/product');
const Sale = require('./models/sale');
const SaleProduct = require('./models/saleProduct');
const Supplier = require('./models/supplier');
const User = require('./models/user');

const sequelize = require('./db');

const products = [
  {
    barCode: '6938104006403',
    name: 'Anti-Chlorine Special Dophin 200ml',
    price: 4250,
    stock: 2,
    minStock: 2,
    categoryId: null,
    sold: 5,
    supplierId: 1,
  },
  {
    barCode: '6938104006571',
    name: 'Bacteria Dophin 200ml',
    costPrice: 0,
    salePrice: 5860,
    wholesalePrice: 0,
    stock: 0,
    minStock: 1,
    maxStock: 6,
    categoryId: null,
  },
  {
    barCode: '6938104006595',
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
    barCode: '6938104010370',
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

const sales = [
  {
    paymentMethod: 'cash',
    total: 5000,
    clientId: 1,
  },
  {
    paymentMethod: 'credit card',
    total: 8000,
    clientId: 2,
  },
];

const saleProducts = [
  {
    saleId: 1,
    productId: 1,
    quantity: 2,
    unitPrice: 800,
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 1,
    unitPrice: 800,
  },
  {
    saleId: 2,
    productId: 1,
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

const persons = [
  {
    documentId: '111111111f1111',
    documentType: 'ggg',
    email: 'josue@hotmail.com',
    name: 'josue',
    surnames: 'cordero',
    phone: '22222222',
  },
  {
    documentId: '22222222',
    documentType: 'ggg',
    email: 'carlos@hotmail.com',
    name: 'carlos',
    surnames: 'jimenez',
    phone: '22222222',
  },
  {
    documentId: '2233333',
    documentType: 'ggg',
    email: 'jose@hotmail.com',
    name: 'jose',
    surnames: 'alvarez',
    phone: '22222222',
  },
];

const suppliers = [{ personId: 1 }];

const clients = [{ personId: 2 }, { personId: 3 }];

const categories = [{ name: 'filtración' }];

(async () => {
  try {
    await sequelize.sync({ force: true });
    await Person.bulkCreate(persons);
    await Supplier.bulkCreate(suppliers);
    await Client.bulkCreate(clients);
    await Category.bulkCreate(categories);
    await Product.bulkCreate(products);
    await Sale.bulkCreate(sales);
    await SaleProduct.bulkCreate(saleProducts);
    /*   await User.bulkCreate(users); */
  } catch (error) {
    console.error(error);
  }
})();
