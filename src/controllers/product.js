const router = require('express').Router();
const { Op } = require('sequelize');

const sequelize = require('../db');
const Product = require('../models/product');
const setSearch = require('../utils/setSearch');

router.get('', async (req, res) => {
  const helper = { order: [], where: {} };

  if (req.query.category) helper.where.categoryId = req.query.category;

  if (req.query.stock) helper.where.stock = { [Op.lte]: sequelize.col('minStock') };

  if (req.query.search) helper.where[Op.or] = setSearch(['id', 'name'], req.query.search);

  if (req.query.sortBy) helper.order.push([req.query.sortBy, req.query.order || 'ASC']);

  const products = await Product.findAll(helper);
  res.send(products);
});

router.post('', async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).send(product);
});

router.patch('/:id', async (req, res) => {
  const product = await Product.update(req.body, { where: { id: req.params.id } });
  if (!product[0]) return res.status(404).send();
  res.send(product);
});

router.delete('/:id', async (req, res) => {
  const product = await Product.destroy({ where: { id: req.params.id } });
  if (!product) return res.status(404).send();
  res.send();
});

module.exports = router;
