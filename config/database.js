
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './carambar.db',  // fichier de la base SQLite
  logging: false             // désactive l'affichage des requêtes SQL dans la console
});

module.exports = sequelize;
