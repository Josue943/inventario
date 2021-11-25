const { Op, Sequelize } = require('sequelize');
const router = require('express').Router();

const getPagination = require('../utils/getPagination');
const getPaginatedResponse = require('../utils/getPaginatedResponse');
const Product = require('../models/product');
const setSearch = require('../utils/setSearch');
const upload = require('../middlewares/upload');

router.get('', async (req, res) => {
  const helper = { order: [['id', 'ASC']], where: {} };

  if (req.query.category) helper.where.categoryId = req.query.category;

  if (req.query.stock) helper.where.stock = { [Op.lte]: Sequelize.col('minStock') };

  if (req.query.search) helper.where[Op.or] = setSearch(['barCode', 'name'], req.query.search);

  if (req.query.expiration) helper.where.expiration = { [Op.ne]: null };

  if (req.query.sortBy) helper.order.unshift([req.query.sortBy, req.query.order || 'ASC']);

  if (req.query.enabled) helper.where.enabled = true;

  const pagination = getPagination(req.query.limit, req.query.page);

  const products = await Product.findAndCountAll({ ...helper, ...pagination });
  res.send(getPaginatedResponse(products, req.query.limit));
});

router.put('/:id/image', upload.single('image'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const image = url + '/images/' + req.file.filename;
  await Product.update({ image }, { where: { id: req.params.id } });
  res.send();
});

router.post('', async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).send(product);
});

router.patch('/:id', async (req, res) => {
  const product = await Product.update(req.body, { where: { id: req.params.id } });
  if (!product[0]) return res.status(404).send();
  res.send();
});

router.delete('/:id', async (req, res) => {
  const product = await Product.destroy({ where: { id: req.params.id } });
  if (!product) return res.status(404).send();
  res.send();
});

module.exports = router;
