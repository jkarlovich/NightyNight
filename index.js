var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/middlewear');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});


app.get('/nearby', function(req, res) {
  request({
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    qs: {
      key: 'AIzaSyBJUrtRrvAu952jdcqhxfM_f97EfQaZEek',
      location: '47.608,-122.343',
      rankby: 'distance',
      keyword: 'restaurant'
    }
  }, function(error, response, body) {
    var foobar = JSON.parse(body);
    res.send({foobar: foobar});
  });
});

app.use('/results', require('./controllers/results'));
app.use('/details', require('./controllers/details'));
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
