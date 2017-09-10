var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose =require('mongoose')
require('dotenv').config()

var index = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');

mongoose.connect('mongodb://adnin31:enggakadapasswordnya@ecommerce-shard-00-00-pmhx7.mongodb.net:27017,ecommerce-shard-00-01-pmhx7.mongodb.net:27017,ecommerce-shard-00-02-pmhx7.mongodb.net:27017/hacktivoverflow?ssl=true&replicaSet=ecommerce-shard-0&authSource=admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/questions', questions)

module.exports = app;
