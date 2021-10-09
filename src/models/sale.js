const { DataTypes, Model, NOW } = require('sequelize');

const sequelize = require('../db');

class Sale extends Model {}

Sale.init(
  {
    cashPayment: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

module.exports = Sale;
