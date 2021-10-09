const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../db');

class User extends Model {}

User.init(
  {
    documentId: { type: DataTypes.STRING, allowNull: false, unique: true },
    documentType: { type: DataTypes.STRING, defaultValue: 'otro' },
    admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    names: { type: DataTypes.STRING, allowNull: false },
    surnames: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      },
    },
    enable: { type: DataTypes.BOOLEAN, defaultValue: true },
    avatar: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false,
  }
);

module.exports = User;
