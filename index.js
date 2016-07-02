var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/middlewear');
var request = require('request');
var db = require('./models');
var geocoder = require('geocoder');
var pg = require('pg');
var moment = require('moment');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 240000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

//this takes the badly formatted dates I get back from the eventful API and
//reformats them
app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
});

//this is for the google maps api
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err) {
        // console.error(err);
        response.send('Error ' + err);
      } else {
        response.render('pages/db', { results: result.rows });
      }
    });
  });
});

app.get('/', function(req, res) {
  res.render('index');
});


app.get('/loggedin', function(req, res) {
  if (!req.user) {
    res.send({ msg: 'false' });
  } else {
    res.send({ msg: 'true' });
  }
});

app.get('/profile', isLoggedIn, function(req, res) {
  db.user.find({
    where: {
      id: req.user.id
    },
    include: [db.show]
  }).then(function(info) {
    res.render('profile', { info: info });
  });
});


app.delete('/delete/:id', function(req, res) {
  db.userShows.destroy({
    where: {
      showId: req.params.id,
      userId: req.user.id
    }
  }).then(function(show) {
    res.send({ msg: 'deleted' });
  });
});

app.use('/results', require('./controllers/results'));
app.use('/details', require('./controllers/details'));
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
