// models/Invoice.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Invoice = sequelize.define('Invoice', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('unpaid', 'paid', 'partial'),
      allowNull: false,
      defaultValue: 'unpaid',
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients', // Usa el nombre de la tabla, no la variable del modelo
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: true,
  });

  // Las asociaciones se definirán en el archivo index.js centralizado

  return Invoice;
};
