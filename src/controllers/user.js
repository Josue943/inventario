const router = require('express').Router();
const { Op } = require('sequelize');

const User = require('../models/user');
const setSearch = require('../utils/setSearch');

router.get('', async (req, res) => {
  const where = {};
  if (req.query.search) where[Op.or] = setSearch(['names', 'username', 'email'], req.query.search);
  const users = await User.findAll({ where });
  res.send(users);
});

router.post('', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).send(user);
});

router.patch('/:id', async (req, res) => {
  const user = await User.update(req.body, { where: { id: req.params.id } });
  if (!user[0]) return res.status(404).send();
  res.send();
});

module.exports = router;
