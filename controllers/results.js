 var express = require('express');
 var router = express.Router();
 var request = require('request');

router.get('/', function(req, res) {
  request({
    url: 'http://api.eventful.com/json/events/search',
    qs: {
      app_key: 'T9BQCjsdtBGJxCZS',
      keywords: req.query.search
    }
  },  function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var events = JSON.parse(body);
      //res.send({events:events});
      //res.send({events: events.events.event[0].image.small.url});
      res.render('results', {events: events, search: req.query.search});
    }
  });
});


module.exports = router;
