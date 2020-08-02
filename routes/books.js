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
        const books = await Book.findAll({ order: [["title", "ASC"]]});
            res.render("books/index", { books, title: "Library Book List" });
    }));

//GET Form to add new book entry:
    router.get("/new", (req, res) => {
        res.render("books/new-book", { book: {}, title: "Add New Book" });
    });

//POST Creates a new book to the db via form:
    router.post("/new", asyncHandler( async (req, res) => {
        let book;
            try{
                book = await Book.create(req.body);
                res.redirect("/books/" + book.id);
            } catch(error){
                if(error.name === "SequelizeValidationError") {
                    book = await Book.build(req.body);
                    res.render("books/form-error", { book: {book}, errors: error.errors})
                } else {
                    throw error; //to asyncHandler to catch
                } 

            }
        
    }));

//GET Route for individual book by id to view/edit details:
    router.get("/:id", asyncHandler( async (req, res) => {
        const book = await Book.findByPk(req.params.id);     
            if(book){
                console.log("Display Individual Book");
                //Create pug file to render book details?
                res.render("books/update-book", { book, title: book.title })
            } else {
            //If !Book.findByPk(req.params.id), no book found:
                res.status(404).send("404 Not Found; not here, not lost; not yet made!");
            }
    }));

// //GET Edits book details:
//     router.get("/:id/edit", asyncHandler( async (req, res) => {
//         const book = await Book.findByPk(req.params.id);     
//             res.render("books/update-book", { book, title: book.title } );
//     }));

//POST Updates changes to book:
    router.post("/:id", asyncHandler(async (req, res) => {
        let book;
            try{
                book = await Book.findByPk(req.params.id);
                if(book){
                    await book.update(req.body);
                    res.redirect("/books/");
                } else {
                    res.status(404).send("404 Not Found; not here, not lost; not yet made!");
                }  
            } catch(error){
                if(error.name === "SequelizeValidationError"){
                    book = await Book.build(req.body);
                    book.id = req.params.id;
                    res.render("books/update-book", {book, errors: error.errors, title: "Update Book" });
                } else {
                    res.status(404).send("404 Not Found; not here, not lost; not yet made!");
                }
            }
              
    }));

//GET book to delete:
    router.get("/:id/delete", asyncHandler( async (req, res) => {
        /*Prompts to delete/destroy a book entry*/
        const book = await Book.findByPk(req.params.id);
            if(book){
                res.render("books/delete", { book, title: "Delete Book From Library" });
            } else {
                res.status(404).send("404 Not Found; not here, not lost; not yet made!");
            }
    }));


/*POST route to delete/destroy a book db entry; safety net - paranoid = true:
    It can be helpful to create a new “test” book to delete. */
    
    router.post("/:id/delete", asyncHandler( async (req, res) => {
        const book = await Book.findByPk(req.params.id);
            if(book){
                await book.destroy();
                    res.redirect("/books");
            } else {
                res.status(404).send("404 Not Found; not here, not lost; not yet made!");
            }
    }));

module.exports = router;