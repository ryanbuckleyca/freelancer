var express = require('express');
var router = express.Router();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('cheque-mate', 'apinrise', '', {
  host: 'localhost',
  dialect: 'postgres'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
  sequelize.authenticate();
    res.send('Connection has been established successfully.');
  } catch (error) {
    res.send('Unable to connect to the database:', error);
  }
});

module.exports = router;
