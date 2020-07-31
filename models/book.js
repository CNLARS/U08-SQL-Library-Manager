"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
//Book model properties and their data types:
    Book.init({
        title: {
            type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Judge not a book by it's cover, but please do provide a title.",
                    },
                    notNull: {
                        msg: "Book must have title.",
                    },
                },
        },

        author: {
            type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Author name is requested, and cannot be empty",
                    },
                    notNull: {
                        msg: "Every Book needs an Author, every Author needs a book",
                    },
                },
        },

        genre: Sequelize.STRING,
            year: Sequelize.INTEGER,

    }, { paranoid: true, sequelize }
    
    );

    return Book;
};