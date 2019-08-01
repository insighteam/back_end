var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Tx = require('ethereumjs-tx');
const initConfig = require('./init');
const LogicHelloWorldJSON = require('../build/contracts/manage.json');
const web3 = initConfig.web3;
const user_address = initConfig.user_address;
const user_pk = initConfig.user_pk;
const logic_ledger = initConfig.logic_leger;
const proxy_ledger = initConfig.proxy_ledger;
const registed_user_address = initConfig.registed_user_address;
const gasPrice = initConfig.gas_price;

let hash = '0x011111'; // ipfs 구현 후 수정
var server_address = user_address;
let manage_contract = '0x13FcDeD35083D926f2BC6d64028a8A643B835c3f'
let manage = new web3.eth.Contract(LogicHelloWorldJSON.abi, manage_contract);


const session = require('express-session'); // 세션 설정
const passport = require('passport');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
