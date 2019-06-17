const Sequelize = require("sequelize");
const sequelize = new Sequelize('practiseapp','root','Current-Root-Password',{
    dialect:'mysql',
    host:'localhost'
});
module.exports = sequelize;