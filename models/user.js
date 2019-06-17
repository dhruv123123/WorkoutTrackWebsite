const Sequelize = require('sequelize');
const sequelize = require("../Util/sequalize");

const User = sequelize.define('user',{
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = User;