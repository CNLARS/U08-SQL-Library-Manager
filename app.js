var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./routes/index');
var books = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/books', books);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

/* 
Global error handler in app.js using Express middleware logs error to the console
 and renders an error message in the browser if the user
  navigates to a non-existent book :id or experiences an unexpected error.
 */

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  if(res.status === 404){
//     Note: Reference to the Practice Error Handling in Express Workshop
    //  to avoid route specific rendering:
        console.log("Testing404 Not Found");
    res.render("books/page-not-found", { book: {}, title: "Page Not Found" });
        } else {
                // render the error page
                    console.log("Error Testing123");
                res.status(err.status || 500).render('error');
        }
});

module.exports = app;