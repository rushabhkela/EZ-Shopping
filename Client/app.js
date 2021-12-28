var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config({ path: "./.env" });
var mongoose = require('mongoose');
const cors = require("cors");
var expressValidator = require('express-validator');
var passport = require('passport');
var session = require('express-session');

require('./passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var prodRouter = require('./routes/products');

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })

global.Cart = require('./models/cartSchema');
global.Order = require('./models/orderSchema');
global.Product = require('./models/productSchema');
global.Promo = require('./models/promoSchema');
global.User = require('./models/userSchema');
global.Vendor = require('./models/vendorSchema');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', prodRouter);

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
