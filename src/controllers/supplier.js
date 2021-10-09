const router = require('express').Router();
const { Op } = require('sequelize');

const Supplier = require('../models/supplier');
const setSearch = require('../utils/setSearch');

router.get('', async (req, res) => {
  const where = {};
  if (req.query.search) where[Op.or] = setSearch(['name', 'phone'], req.query.search);

  const suppliers = await Supplier.findAll({ where });
  res.send(suppliers);
});

router.post('', async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).send(supplier);
});

router.patch('/:id', async (req, res) => {
  const supplier = await Supplier.update(req.body, { where: { id: req.params.id } });
  if (!supplier[0]) return res.status(404).send();
  res.send(supplier);
});

router.delete('/:id', async (req, res) => {
  const supplier = await Supplier.destroy({ where: { id: req.params.id } });
  if (!supplier) return res.status(404).send();
  res.send();
});

module.exports = router;
