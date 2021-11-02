const { Model } = require('sequelize');

const Person = require('./person');
const sequelize = require('../db');

class Client extends Model {}

Client.init(
  {},
  {
    tableName: 'clients',
    sequelize,
    timestamps: false,
  }
);

Client.belongsTo(Person, { foreignKey: { allowNull: false, name: 'personId' }, as: 'details' });

module.exports = Client;
