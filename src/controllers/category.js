const router = require('express').Router();
const { Op } = require('sequelize');

const Category = require('../models/category');
const setSearch = require('../utils/setSearch');

//sortBy  order
router.get('', async (req, res) => {
  const where = {};
  if (req.query.search) where[Op.or] = setSearch(['name'], req.query.search);
  const categories = await Category.findAll({ where });

  res.send(categories);
});

router.post('', async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).send(category);
});

router.patch('/:id', async (req, res) => {
  const category = await Category.update(req.body, { where: { id: req.params.id } });
  if (!category[0]) return res.status(404).send();
  res.send(category);
});

router.delete('/:id', async (req, res) => {
  const category = await Category.destroy({ where: { id: req.params.id } });
  if (!category) return res.status(404).send();
  res.send();
});

module.exports = router;
