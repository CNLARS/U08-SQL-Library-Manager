const express = require("express");
// const { RangeNotSatisfiable } = require("http-errors");
const router = express.Router();

const Book = require("../models").Book;
// const { books } = require('../library');

//Async handler for each route to run try/catch
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
    } catch (error){
            next(error);
        }
    }
}

//GET routes:

//Index list of books:
router.get("/", asyncHandler( async (req, res) => {
    const books = await Book.findAll();
    // // console.log(books); { order: [["title", "ASC"]]}
        res.render("books/index", { books, title: "Library Book List" });
    })
);

//Form to add new book entry:
router.get("/new", (req, res) => {
    res.render("books/new-book", { book: {}, title: "Add New Book" });
});

//Route for book details to update/edit by id
router.get("/:id", asyncHandler( async (req, res) => {
    const book = await Book.findByPk(req.params.id);     
        if(book){
            res.render("books/update-book", { book, title: book.title } );
        }
    })
);

//Creates a new book to the database:
router.post("/", asyncHandler( async (req, res) => {
    const book = await Book.create(req.body);
    res.redirect("/books/" + book.id);
    })
);

router.post("/books/:id", asyncHandler( async (req, res, next) => {
    //Updates book info in db:
    res.redirect("/books");
    })
);

router.get("/books/:id/delete", asyncHandler( async (req, res, next) => {
    /*Prompts to delete/destroy a book db entry;
        safety net - paranoid = true:
    It can be helpful to create a new “test” book to delete. */

    res.render("/books/delete", { book: {}, title: "Delete Book From Library" });
    })
);

//POST routes:

/*Prompts to delete/destroy a book db entry;
        safety net - paranoid = true:
    It can be helpful to create a new “test” book to delete. */
router.post("/books/:id/delete", asyncHandler( async (req, res, next) => {
      

    res.redirect("/books");
    })
);

module.exports = router;

/* 
Global error handler in app.js using Express middleware logs error to the console
 and renders an error message in the browser if the user
  navigates to a non-existent book :id or experiences an unexpected error.


 */