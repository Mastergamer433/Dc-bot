/* eslint-disable no-undef */
const Sequelize = require('sequelize');

const database = new Sequelize(
  __config.mysql.database,
  __config.mysql.username,
  __config.mysql.password,
  {
    host: __config.mysql.host,
    dialect: 'mariadb',
  },
);

module.exports.Economy = database.define('economy', {
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  balance: Sequelize.INTEGER,
});

module.exports.Cooldown = database.define('Cooldown', {
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    unique: true,
  },
  expiry: Sequelize.BIGINT,
  command: Sequelize.STRING,
});
