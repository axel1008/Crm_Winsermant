const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importa los modelos
const UserModel = require('./User');
const ClientModel = require('./Client');
const InvoiceModel = require('./Invoice');
const ProjectModel = require('./Project');

// Inicializa los modelos correctamente
const User = UserModel(sequelize, Sequelize.DataTypes);
const Client = ClientModel(sequelize, Sequelize.DataTypes);
const Invoice = InvoiceModel(sequelize, Sequelize.DataTypes);
const Project = ProjectModel(sequelize, Sequelize.DataTypes);

// Definir las asociaciones entre los modelos
User.hasMany(Client, { foreignKey: 'owner', as: 'clients' });
Client.belongsTo(User, { foreignKey: 'owner', as: 'ownerUser' });
Client.hasMany(Invoice, { foreignKey: 'clientId', as: 'invoices' });
Invoice.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });

// Exporta la instancia de Sequelize y los modelos
module.exports = {
  sequelize,
  User,
  Client,
  Invoice,
  Project,
};
