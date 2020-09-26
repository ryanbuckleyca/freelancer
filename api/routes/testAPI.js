var express = require("express");
var router = express.Router();

router.get("/testAPI", function(req, res, next) {
  res.send('this is a response sent back from Express server at localhost:9000/testAPI');
});

module.exports = router;
