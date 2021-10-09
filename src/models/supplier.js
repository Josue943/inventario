const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Supplier extends Model {}

Supplier.init(
  {
    address: { type: DataTypes.STRING, allowNull: true },
    documentId: { type: DataTypes.STRING, allowNull: false, unique: true },
    documentType: { type: DataTypes.STRING, defaultValue: 'otro' },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    managerName: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'suppliers', sequelize, timestamps: false }
);

module.exports = Supplier;
