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
                        msg: 'Book must have title; even "Untitled" is a title.',
                    },
                },
        },

        author: {
            type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Cite your source; name the author!",
                    },
                    notNull: {
                        msg: "Book needs an author to give credit where credit is due.",
                    },
                },
        },

        genre: Sequelize.STRING,
            year: Sequelize.INTEGER,

    }, { paranoid: true, sequelize }
    
    );

    return Book;
};