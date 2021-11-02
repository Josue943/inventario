const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db');

class Person extends Model {}

Person.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    surnames: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    documentId: { type: DataTypes.STRING, allowNull: false, unique: true },
    documentType: { type: DataTypes.STRING, defaultValue: 'otro' },
  },
  {
    tableName: 'persons',
    sequelize,
    timestamps: false,
  }
);

module.exports = Person;
