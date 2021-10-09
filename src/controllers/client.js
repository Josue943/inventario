const router = require('express').Router();
const { Op } = require('sequelize');

const Client = require('../models/client');
const setSearch = require('../utils/setSearch');

router.get('', async (req, res) => {
  const where = {};
  if (req.query.search) where[Op.or] = setSearch(['names'], req.query.search);
  const clients = await Client.findAll({ where });
  res.send(clients);
});

router.post('', async (req, res) => {
  const client = await Client.create(req.body);
  res.status(201).send(client);
});

router.patch('/:id', async (req, res) => {
  const client = await Client.update(req.body, { where: { id: req.params.id } });
  if (!client[0]) return res.status(404).send();
  res.send();
});

module.exports = router;
