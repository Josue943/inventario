const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    costPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    salePrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    wholesalePrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    maxStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'products',
    sequelize,
    timestamps: false,
  }
);

module.exports = Product;
