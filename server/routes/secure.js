const router = require('express').Router();
const db = require('../models');

router
  .route("/")
  // GET SECURE ROUTE (checkJwt required in server.js)
  .get(async (req, res) => {
    console.log('/api/secure has been called')
    try {
      const ryan = await db.User.findOne(
        { where: { id: 1 } } // should return Ryan Buckley
      );
      res.send(ryan);
    } catch (error) {
      res.send({ 'error': error });
    }
  });

module.exports = router;
