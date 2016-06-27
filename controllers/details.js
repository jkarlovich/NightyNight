 var express = require('express');
 var router = express.Router();
 var request = require('request');

router.get('/:id', function(req, res){
  res.send('hello');
});


module.exports = router;
