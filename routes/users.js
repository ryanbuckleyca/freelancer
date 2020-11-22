const express = require('express');
let router = express.Router();
const db = require('../models');
const checkJwt = require('./authenticate');
const updateAuthUser = require('./updateAuthUser')
const deleteAuthUser = require('./deleteAuthUser')

// TODO: should require authentication

// login redirects to GET /:auth0_id
// user does not yet exist in debug
// user must submit in order to complete registration
// posting profile will get Auth0 token

router
  .route("/:auth0_id")
  // GET USER - api/users/:auth0_id
  .get(async (req, res, next) => {
    console.log('route /:auth0_id hit')
    try {
      const user = await db.User.findOne({
        where: { auth0_id: req.params.auth0_id }
      })
      console.log("SUCCESS: found user by auth0_id: req.params.auth0_id = ", user)
      // will return null if no users are found
      res.send(user)
    }
    catch(err) {
      console.log("ERROR: find user by auth0_id: req.params.auth0_id = ", err);
    }
  })
  // UPDATE/NEW USER
  .put(async (req, res, next) => {
    console.log('update user called with req.body:', req.body);
    req.body && delete req.body.id // prevent overwriting id
    try {
      const updateResult = await db.User.update(req.body, {
        where: { auth0_id: req.body.auth0_id },
        returning: true
      });
      const dbUser = updateResult[1][0];
      console.log('dbUser = ', dbUser)
      const updateAuthRes = await updateAuthUser(dbUser);
      console.log('result of updateAuthUser(): ', updateAuthRes)
      res.send(dbUser)
    }
    catch(err) { console.log('update user error: ', err) }
  })
  // DELETE client
  .delete((req, res) => {
    console.log('destroy user req.params is ', req.params)
    console.log('destroy user called with req.params.auth0_id:', req.params.auth0_id);
    try {
      db.User.destroy({
        where: { auth0_id: req.params.auth0_id },
        returning: true
      })
        .then(res => {
          console.log('deleted user from local db: ', res)
        })
      deleteAuthUser(req.params.auth0_id)
        .then(res => {
          console.log('deleted user from auth0 db: ', res)
        })

      res.method = 'GET'
      res.redirect('/')
      // TODO: redirect to created record
    }
    catch(err) { console.warn('delete user error: ', err) }
  });

router
  // CREATE USER
  // only accessed during the auth0 process...
  // pinged from callAPI on /profile after redirect from auth0
  .route("/")
  .post((req, res, next) => {
    console.log('create user called with req.body:', req.body);
    db.User.create({ ...req.body })
      .then(res => updateAuthUser(res))
    res.send(res);
  });

module.exports = router;
