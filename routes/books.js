const express = require("express");
// const { endsWith } = require("sequelize/types/lib/operators");
// const { RangeNotSatisfiable } = require("http-errors");
const router = express.Router();
const Book = require("../models").Book;

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

//GET Index list of books:
    router.get("/", asyncHandler( async (req, res) => {
        const books = await Book.findAll();
        // const books = await Book.findAll({ order: [["title", "ASC"]]});
        // // console.log(books); 
            res.render("books/index", { book: {books}, title: "Library Book List" });
    }));

//GET Form to add new book entry:
    router.get("/new", (req, res) => {
        res.render("books/new-book", { book: {}, title: "Add New Book" });
    });

//POST Creates a new book to the db via form:
    router.post("/", asyncHandler( async (req, res) => {
        const book = await Book.create(req.body);
        res.redirect("/books/" + book.id);
    }));

//GET Route for individual book by id:
    router.get("/:id", asyncHandler( async (req, res) => {
        const book = await Book.findByPk(req.params.id);     
            if(book){
                console.log("Display Individual Book");
                //Create pug file to render book details!
            }
            else {
        //If !Book.findByPk(req.params.id), no book found:
                throw error;  
            }
    }));

//GET Edits book details:
    router.get("/:id/edit", asyncHandler( async (req, res) => {
        const book = await Book.findByPk(req.params.id);     
            res.render("books/update-book", { book, title: book.title } );
    }));

//POST Updates changes to book:
    router.post("books/:id/edit", asyncHandler(async (req, res) => {
        res.redirect("/books/");
    }));

//GET book to delete:
    router.get("/:id/delete", asyncHandler( async (req, res) => {
        /*Prompts to delete/destroy a book entry;
            [db safety net: paranoid = true]
        Note: It can be helpful to create a new “test” book to delete. */
        console.log("Create pug file for delete view to render!");
            res.redirect("/books/"); //Temporary Route 
        //Construction Route:
            //res.render("books/delete", { book: {}, title: "Delete Book From Library" });
    }));


/*POST route to delete/destroy a book db entry; safety net - paranoid = true:
    It can be helpful to create a new “test” book to delete. */
    
    router.post("books/:id/delete", asyncHandler( async (req, res) => {
        res.redirect("/books");
    }));

module.exports = router;