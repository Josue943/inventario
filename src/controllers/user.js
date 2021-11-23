const router = require('express').Router();
const { Op } = require('sequelize');

const User = require('../models/user');
const Person = require('../models/person');
const setSearch = require('../utils/setSearch');
const getPagination = require('../utils/getPagination.js');
const getPaginatedResponse = require('../utils/getPaginatedResponse.js');

router.get('', async (req, res) => {
  const where = {};
  if (req.query.search) where[Op.or] = setSearch(['name', 'surnames', 'phone'], req.query.search);

  const pagination = getPagination(req.query.limit, req.query.page);

  const users = await User.findAndCountAll({
    attributes: { exclude: ['personId', 'password'] },
    include: {
      model: Person,
      as: 'details',
      where,
      attributes: { exclude: ['province', 'canton', 'district', 'client'] },
    },
    ...pagination,
  });

  res.send(getPaginatedResponse(users, pagination.limit));
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

router.delete('/:id', async (req, res) => {
  const user = await User.destroy({ where: { id: req.params.id } });
  if (!user) return res.status(404).send();
  res.send();
});

module.exports = router;
