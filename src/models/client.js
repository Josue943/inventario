const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db');

class Client extends Model {}

Client.init(
  {
    documentId: { type: DataTypes.STRING, allowNull: false, unique: true },
    documentType: { type: DataTypes.STRING, defaultValue: 'otro' },
    names: { type: DataTypes.STRING, allowNull: false },
    surnames: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    province: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'clients',
    sequelize,
    timestamps: false,
  }
);

module.exports = Client;
