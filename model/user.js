const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');

var User = sequelize.define('users', {
    email:Sequelize.STRING,
    password:Sequelize.STRING,
});

module.exports = User;
