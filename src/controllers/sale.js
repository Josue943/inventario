const router = require('express').Router();
const { Op } = require('sequelize');

const sequelize = require('../db');
const Product = require('../models/product');
const Sale = require('../models/sale');
const SaleProduct = require('../models/saleProduct');

//dd/mm/year
router.get('', async (req, res) => {
  const where = {};

  //format 2021-10-02
  if (req.query.startDate && req.query.endDate)
    where.date = { [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)] };

  const sales = await Sale.findAll({
    where,
    include: {
      model: Product,
      as: 'products',
      attributes: ['id', 'name'],
      through: { attributes: ['quantity', 'unitPrice'], as: 'saleDetails' }, // this will remove the rows from the join table (i.e. 'SaleProduct table') in the result set
    },
  });
  res.send(sales);
});

router.post('', async (req, res) => {
  const { products, ...rest } = req.body;

  const result = await sequelize.transaction(async transaction => {
    const sale = await Sale.create(rest, { transaction });

    const savedProducts = await SaleProduct.bulkCreate(
      products.map(product => ({ ...product, saleId: sale.id })),
      { transaction }
    );

    const promises = savedProducts.map(({ productId, quantity }) =>
      Product.update({ sold: sequelize.literal(`sold + ${quantity}`) }, { where: { id: productId }, transaction })
    );

    const productsUpdated = await Promise.all(promises);
    if (productsUpdated.some(item => !item[0])) throw 'Server Error ';

    return { sale, products: savedProducts };
  });

  res.status(201).send(result);
});

module.exports = router;
