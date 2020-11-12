const express = require('express');
let router = express.Router();
const db = require('../models');

router.route("/")
  .post(async (req, res) => {
    try {
      const newSub = await db.Subscriber.create({
        email: req.body.email,
      });
      res.send(newSub);
    }
    catch(err) {
      console.log('add to mailing list error: ', err)
    }
  });

module.exports = router;
