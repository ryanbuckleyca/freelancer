const express = require('express');
let router = express.Router();
const db = require('../models');

// TODO: should require authentication

router
  .route("/:auth0_id")
  // GET USER - api/users/:auth0_id
  .get(async (req, res, next) => {
    console.log('GET USER by auth_id: ', req.params.auth0_id)
    try {
      const user = await db.User.findOne({
        where: { auth0_id: req.params.auth0_id }
      })
      console.log("SUCCESS: found user by auth0_id: req.params.auth0_id = ", user)
      user && res.send(user);
    }
    catch(err) {
      console.log("ERROR: find user by auth0_id: req.params.auth0_id = ", err);
    }
  })
  // UPDATE USER
  .put(async (req, res) => {
    console.log('update user called with req.body:', req.body);
    try {
      const updateResult = await db.User.update(req.body, {
        where: { id: req.body.id },
        returning: true
      });
      const dbUser = updateResult[1][0];
      res.send(dbUser)
    }
    catch(err) { console.log('update user error: ', err) }
  });

router
  // CREATE USER
  .route("/")
  .post(async (req, res, next) => {
    console.log('create user called with req.body:', req.body);
    const newUser = await db.User.create({
      auth0_id: req.body.auth0_id,
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      street1: req.body.street1
      street2: req.body.street2
      city: req.body.city
      state: req.body.state
      zip: req.body.zip
      country: req.body.country
      // TODO: maybe just spread req.body?
    });
    console.log("created new unsaved user: ", newUser);
    const save = await newUser.save();
    console.log("inserted into database: ", save);
    res.send(newUser);
  });



module.exports = router;
