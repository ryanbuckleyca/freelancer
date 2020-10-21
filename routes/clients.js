const express = require('express');
let router = express.Router();
const db = require('../models');

// TODO: should require authentication

router
  .route("/user/:id")
  // GET user's clients - api/clients/user/:id
  .get(async (req, res, next) => {
    console.log('GET clients from user/:id: ', req.params.id)
    try {
      const clients = await db.Client.findAll({
        where: { user_id: req.params.id }
      })
      console.log("SUCCESS: found clients by user/:id where req.params.id = ", clients)
      clients && res.send(clients);
    }
    catch(err) {
      console.log("ERROR: find clients by user/:id where req.params.id = ", err);
    }
  })
  // UPDATE client
  .put(async (req, res) => {
    console.log('update client called with req.body:', req.body);
    try {
      const updateResult = await db.Client.update(req.body, {
        where: { id: req.body.id },
        returning: true
      });
      const dbclient = updateResult[1][0];
      res.send(dbclient)
    }
    catch(err) { console.log('update client error: ', err) }
  });

router
  .route("/:id")
  // GET client - api/clients/:id
  .get(async (req, res, next) => {
    console.log('GET client by id: ', req.params.id)
    try {
      const client = await db.Client.findOne({
        where: { id: req.params.id }
      })
      console.log("SUCCESS: found client by id: req.params.id = ", client)
      client && res.send(client);
    }
    catch(err) {
      console.log("ERROR: find client by id: req.params.id = ", err);
    }
  })
  // UPDATE client
  .put(async (req, res) => {
    console.log('update client called with req.body:', req.body);
    try {
      const updateResult = await db.Client.update(req.body, {
        where: { id: req.body.id },
        returning: true
      });
      const dbclient = updateResult[1][0];
      res.send(dbclient)
    }
    catch(err) { console.log('update client error: ', err) }
  });

router
  // GET ALL clients
  .route("/")
  .get(async (req, res, next) => {
    const allClients = await db.Client.findAll();
    res.send(allClients)
  })
  // CREATE client
  .post(async (req, res, next) => {
    console.log('create client called with req.body:', req.body);
    const newclient = await db.Client.build({...req.body})
    console.log("built new unsaved client: ", newclient);
    const save = await newclient.save();
    console.log("inserted built client into database with save(): ", save);
    res.send(save);
  });



module.exports = router;
