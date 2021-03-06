const express = require('express');
let router = express.Router();
const db = require('../models');

// TODO: should require authentication

router.route("/user/:user_id")
  // GET user's clients - api/clients/user/:user_id
  .get(async (req, res, next) => {
    console.log('GET clients from /api/clients/user/:user_id: ', req.params.user_id)
    try {
      const clients = await db.Client.findAll({
        where: { user_id: req.params.user_id }
      })
      console.log("SUCCESS: found clients by /api/clients/user/:user_id where req.params.user_id = ", clients)
      clients && res.send(clients);
    }
    catch(err) {
      console.log("ERROR: find clients by /api/clients/user/:user_id where req.params.id = ", err);
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

router.route("/new")
  // NEW client
  .get(async (req, res, next) => {
    const newClient = db.Client.build()
    res.send(newClient)
  })

router.route("/:id")
  // GET client - api/clients/:id
  .get(async (req, res, next) => {
    console.log('GET client by id: ', req.params.id)
    try {
      const client = await db.Client.findOne({
        where: { id: req.params.id }
      })
      console.log("SUCCESS: found client by id: req.params.id = ", client)
      if (!client)
        res.send(null)
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
  })
  // DELETE client
  .delete(async (req, res) => {
    console.log('destroy client called with req.params.id:', req.params.id);
    try {
      const destroyResult = await db.Client.destroy({
        where: { id: req.params.id }
      })
      .then(res => {
        console.log('deleted record: ', res)
        return { success: `${res} records deleted` }
      })
    }
    catch(err) {
      console.log('delete client error: ', err)
      return { error: err }
    }
  });

router.route("/")
  // GET ALL clients
  .get(async (req, res, next) => {
    const allClients = await db.Client.findAll();
    if (!allClients)
      res.send({error: 'no clients found'})
    else
      res.send(allClients)
  })
  // CREATE client
  .post(async (req, res, next) => {
    console.log('create client called with req.body:', req.body);
    delete req.body.id
    const newclient = await db.Client.build({...req.body})
    console.log("built new unsaved client: ", newclient);
    const save = await newclient.save();
    console.log("inserted built client into database with save(): ", save);
    res.send(save);
  });



module.exports = router;
