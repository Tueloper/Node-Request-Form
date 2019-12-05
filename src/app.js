var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const keys = require('./../config/keys');
const chalk = require('chalk')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//mongoose connection
mongoose.connect(
  keys.mongoURI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  function(err, client) {
    if (err) console.log(chalk.redBright("Database Connection Failed"));
    if (client)
      console.log(chalk.gray.inverse.italic("Database Connection Passed"));
  }
);
let db = mongoose.connection;

db.once('open', () => console.log('Connected to database'));

// checks if connection to db is a success
db.on('error', console.error.bind(console, 'Database connection error:'));

mongoose.Promise = global.Promise;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', [indexRouter, usersRouter]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;