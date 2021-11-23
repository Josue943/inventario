const { DataTypes, Model, NOW } = require('sequelize');

const Person = require('./person');
const sequelize = require('../db');

class Sale extends Model {}

Sale.init(
  {
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
  },
  { tableName: 'sales', sequelize, timestamps: false }
);

Sale.belongsTo(Person, { as: 'client', foreignKey: { name: 'clientId', allowNull: false } });

module.exports = Sale;
