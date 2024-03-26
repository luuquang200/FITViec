// config/db/index.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const mysqlConfig = {
    development: {
        host: process.env.MYSQL_DB_HOST,
        username: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        dialect: 'mysql'
    }
};

const sequelize = new Sequelize(mysqlConfig.development);

module.exports = sequelize;