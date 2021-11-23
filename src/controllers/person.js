const router = require('express').Router();

const getPagination = require('../utils/getPagination');
const getPaginatedResponse = require('../utils/getPaginatedResponse');
const Person = require('../models/person');

router.get('', async (req, res) => {
  const where = {};

  if (req.query.client) where.client = true;
  if (req.query.search) where[Op.or] = setSearch(['name'], req.query.search);

  const pagination = getPagination(req.query.limit, req.query.page);

  const people = await Person.findAndCountAll({ where, ...pagination });
  res.send(getPaginatedResponse(people, req.query.limit));
});

router.post('', async (req, res) => {
  const person = await Person.create(req.body);
  res.status(201).send(person);
});

router.patch('/:id', async (req, res) => {
  const person = await Person.update(req.body, { where: { id: req.params.id } });
  if (!person[0]) return res.status(404).send();
  res.send(person);
});

router.get('/:documentId', async (req, res) => {
  const person = await Person.findOne({ where: { documentId: req.params.documentId } });
  if (!person) return res.status(404).send();
  res.send(person);
});

module.exports = router;
