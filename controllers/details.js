 var express = require('express');
 var router = express.Router();
 var request = require('request');
 var db = require('../models');
 var open = require('open');

router.get('/:id', function(req, res){
  request({
    url:'http://api.eventful.com/json/events/get',
    qs: {
      app_key: process.env.EVENTFUL_KEY,
      id: req.params.id
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var details = JSON.parse(body);
      //res.send({details:details});
      res.render('details',{details: details});
    }
  });
});

router.post('/save', function(req, res) {
  db.show.findOrCreate({
    where: {
      title: req.body.title,
      venue: req.body.venue,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      lat: req.body.lat,
      long: req.body.long,
      url: req.body.url
    }
  }).spread(function(show){
    db.user.find({
      where: {
        id: req.user.id
      }
    }).then(function(user){
      user.addShow(show);
      res.render('profile');
      console.log(show.url);
      open(show.url, function (err) {
        if ( err ) throw err;
      });
    });
  }).catch(function(err){
    res.status(500).render('error');
  });
});

module.exports = router;
