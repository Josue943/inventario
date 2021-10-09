const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

const Product = require('./product');

class Category extends Model {}

Category.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: 'categories', sequelize, timestamps: false }
);

Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'RESTRICT' });

module.exports = Category;
