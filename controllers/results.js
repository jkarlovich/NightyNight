 var express = require('express');
 var router = express.Router();
 var request = require('request');
 // app.get('/results', function(req, res){
 //    request({
 //      url: 'https://www.brownpapertickets.com/api2/eventlist?id=bT3TEWji9W',
 //      //id: 'bT3TEWji9W'
 //    },
 //      function(error, response, body) {
 //        if(!error && response.statusCode === 200) {
 //          res.send(body);
 //        }
 //    });
 //  });

// router.get('/', function(req, res) {
//   var results = {name: req.query.search};
//   res.render('results', {results: results});
// });


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
      res.render('results', {events: events});
    }
  });
});


module.exports = router;
