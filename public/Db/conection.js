const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,
  define: {
    underscored: true,
    freezeTableName: true
  }
});

module.exports = { sequelize };
