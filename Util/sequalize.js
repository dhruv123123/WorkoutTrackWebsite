const Sequelize = require("sequelize");
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);
const sequelize = new Sequelize('practiseapp','root','Current-Root-Password',{
    dialect:'mysql',
    host:'localhost',

});

const sequelizeSessionStore = new SessionStore({
    db: sequelize,
});

module.exports = sequelizeSessionStore;
module.exports = sequelize;