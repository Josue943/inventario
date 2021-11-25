const router = require('express').Router();
const { Op } = require('sequelize');
const moment = require('moment');

const getPaginatedResponse = require('../utils/getPaginatedResponse');
const getPagination = require('../utils/getPagination');
const Person = require('../models/person');
const Product = require('../models/product');
const Sale = require('../models/sale');
const SaleProduct = require('../models/saleProduct');
const sequelize = require('../db');

/*
•	Ver lista de ventas pendientes.

*/
//dd/mm/year
router.get('', async (req, res) => {
  const where = {};

  if (req.query.startDate && req.query.endDate) {
    where.date = {
      [Op.between]: [
        moment(req.query.startDate).startOf('day').toDate(),
        moment(req.query.endDate).endOf('day').toDate(),
      ],
    };
  }

  const pagination = getPagination(req.query.limit, req.query.page);

  const sales = await Sale.findAndCountAll({
    where,
    attributes: { exclude: ['clientId'] },
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ['id', 'name'],
        through: { attributes: ['quantity', 'unitPrice'], as: 'saleDetails' }, // this will remove the rows from the join table (i.e. 'SaleProduct table') in the result set
      },
      { model: Person, as: 'client', attributes: ['id', 'name', 'surnames'] },
    ],
    ...pagination,
  });

  res.send(getPaginatedResponse(sales, req.query.limit));
});

router.get('/:id', async (req, res) => {
  const sale = await Sale.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['clientId'] },
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ['id', 'name'],
        through: { attributes: ['quantity', 'unitPrice'], as: 'saleDetails' }, // this will remove the rows from the join table (i.e. 'SaleProduct table') in the result set
      },
      { model: Person, as: 'client', attributes: ['id', 'name', 'surnames'] },
    ],
  });

  res.send(sale);
});

router.post('', async (req, res) => {
  const { products, ...rest } = req.body;

  const result = await sequelize.transaction(async transaction => {
    const sale = await Sale.create(rest, { transaction });

    const savedProducts = await SaleProduct.bulkCreate(
      products.map(product => ({ ...product, saleId: sale.id })),
      { transaction }
    );
    /*    const promises = savedProducts.map(({ productId, quantity }) =>
      Product.update({ sold: sequelize.literal(`sold + ${quantity}`) }, { where: { id: productId }, transaction })
    );
    const productsUpdated = await Promise.all(promises);
    if (productsUpdated.some(item => !item[0])) throw 'Server Error '; */

    return { sale, products: savedProducts };
  });

  res.status(201).send(result);
});

module.exports = router;
