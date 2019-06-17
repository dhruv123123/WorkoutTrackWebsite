const Sequelize = require('sequelize');
const sequelize = require("../Util/sequalize");

const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: Sequelize.STRING,
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

module.exports = Product;