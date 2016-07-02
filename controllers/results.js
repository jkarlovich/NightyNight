 var express = require('express');
 var router = express.Router();
 var request = require('request');

 router.get('/', function(req, res) {
   request({
     url: 'http://api.eventful.com/json/events/search',
     qs: {
       app_key: process.env.EVENTFUL_KEY,
       keywords: req.query.search,
       image_sizes: 'small'
     }
   }, function(error, response, body) {
     if (!error && response.statusCode === 200) {
       var data = JSON.parse(body);
       data.events.event.forEach(function(event) {
         if (event.description !== null) {
           event.description = event.description.replace(/<p>|<\/p>|<em>|<\/em>|<a href=.*?>|<\/a>|<br>|<\/br>|<ul>|<\/ul>|<li>|<\/li>|<strong>|<\/strong>|<b>|<\/b>|<i>|<\/i>/g, '');
         }
       });
       res.render('results', { events: data, search: req.query.search });
     }
   });
 });

 module.exports = router;
