const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('acuario', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-06:00',
});

module.exports = sequelize;
