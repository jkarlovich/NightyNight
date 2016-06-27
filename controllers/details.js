 var express = require('express');
 var router = express.Router();
 var request = require('request');

router.get('/:id', function(req, res){
  request({
    url:'http://api.eventful.com/json/events/get',
    qs: {
      app_key: 'T9BQCjsdtBGJxCZS',
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



module.exports = router;
