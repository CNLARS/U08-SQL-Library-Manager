const express = require("express");
const { RangeNotSatisfiable } = require("http-errors");
const router = express.Router();

const Book = require("../models").Book;
// const { books } = require('../library');

//Async handler for each route to run try/catch
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error){
            // if (error.name === "SequelizeValidationError") {
            //     const errors = error.errors.map(err => err.message);
            //     console.error(`Errors Discovered: ${errors.length}, Error(s): `, errors);
            // }
            res.status(500).send(error);
            next(error);
        }
    }
}

//GET:

//Full list of books:
router.get("/", asyncHandler( async (req, res) => {
    await Book.findAll().then( () => {
        res.render("books/index", { book: {}, title: "Library Books" });
        });
    })
);

//Create add new book entry:
router.get("/new", (req, res) => {
    res.render("books/new-book", { book: {}, title: "Add New Book" });
});

//Route for book details by id
router.get(":id", asyncHandler( async (req, res) => {
    //Shows update book form or 404
    const book = await Book.findByPk(req.params.id)     
        if(book){
            res.render("books/update-book", { book: {book}, title: "Edit Book Details" } );
        } else {
            console.log("?");
            // res.status(404).render("books/page_not_found", { book: {}, title: "Page Not Found" });
        }
    })
);

router.post("/", asyncHandler( async (req, res) => {
    //Creates a new book to the database:
    const book = await Book.create();
    // console.log(req.body);
    res.redirect("/books/" + books.id);
    })
);



router.post("/books/:id", asyncHandler( async (req, res) => {
    //Updates book info in db:
    res.redirect("/books");
    })
);

router.get("/books/:id/delete", asyncHandler( async (req, res) => {
    /*Prompts to delete/destroy a book db entry;
        safety net - paranoid = true:
    It can be helpful to create a new “test” book to delete. */

    res.render("/books/delete", { book: {}, title: "Delete Book From Library" });
    })
);

router.post("/books/:id/delete", asyncHandler( async (req, res) => {
      /*Prompts to delete/destroy a book db entry;
        safety net - paranoid = true:
    It can be helpful to create a new “test” book to delete. */

    res.redirect("/books");
    })
);

module.exports = router;

/* 
Global error handler in app.js using Express middleware logs error to the console
 and renders an error message in the browser if the user
  navigates to a non-existent book :id or experiences an unexpected error.

Note: Reference to the Practice Error Handling in Express Workshop
         to avoid route specific rendering.
 */