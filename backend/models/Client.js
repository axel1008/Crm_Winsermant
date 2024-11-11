// models/Client.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    canton: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: 'Costa Rica',
    },
    phone: {
      type: DataTypes.STRING,
    },
    comments: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  // Las asociaciones se definirán en el archivo index.js centralizado

  return Client;
};
