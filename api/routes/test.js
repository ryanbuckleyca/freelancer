var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ testObject: 'from api/routes/test.js' });
});

module.exports = router;
