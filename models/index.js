const Sequelize = require("sequelize");

//Connects database to the SQL constructor
const sequelize = new Sequelize({
    dialect: 'sqlite',
    // storage: "../library.db"
});

const db = {
    sequelize,
    Sequelize,
    models:{}
};

db.models.Book = require("./book.js")(sequelize);

module.exports = db;