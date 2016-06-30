 var express = require('express');
 var router = express.Router();
 var request = require('request');
 var db = require('../models');
 var open = require('open');
 var isLoggedIn = require('../middleware/middlewear')

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
      if (details.description !== null){
        details.description = details.description.replace(/<p>|<\/p>|<em>|<\/em>|<a href=.*?>|<\/a>|<br>|<\/br>|<ul>|<\/ul>|<li>|<\/li>|<strong>|<\/strong>|<b>|<\/b>|<i>|<\/i>/g, "");
      };
      request({
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        qs: {
          key: process.env.GOOGLE_KEY,
          location: details.latitude + "," + details.longitude,
          rankby: 'distance',
          keyword: 'restaurant'
      }
    }, function(error, response, body) {
      var restaurants = JSON.parse(body);
      res.render('details', {details: details, restaurants: restaurants});
      //res.send({restaurants:restaurants});
      })
    }
  });
});

router.post('/save', isLoggedIn, function(req, res) {
  console.log("title:", req.body.title);
  console.log("venue:", req.body.venue);
  console.log("city:", req.body.city);
  console.log("state:", req.body.state);
  console.log("zip :", req.body.zip);
  console.log("lat:", req.body.lat);
  console.log("long:", req.body.long);
  console.log("url:", req.body.url);
    db.show.findOrCreate({
      where: {
        title: req.body.title,
        venue: req.body.venue,
        city: req.body.city,
      },
      default: {
        state: req.body.state,
        zip: req.body.zip,
        lat: req.body.lat,
        long: req.body.long,
        url: req.body.url}
    }).spread(function(show){
      db.user.find({
        where: {
          id: req.user.id
        },
        include: [db.show]
      }).then(function(user){
        // console.log("user:", user, "show:", show);
        // console.log("show.url:", show.url);
        user.addShow(show);
        res.redirect('/profile');
      });
    }).catch(function(err){
      res.status(500).render('error');
    });
});

module.exports = router;
