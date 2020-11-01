const express = require('express');
let router = express.Router();
const db = require('../models');

// TODO: should require authentication

router.route("/")
  // CREATE NEW CONTRACT
  .post(async (req, res) => {
    console.log('api/contracts/ POST called')
    try {
      console.log('{...req.body} is: ', {...req.body})
      const newContract = await db.Contract.create({
        client_id: req.body.client_id,
        user_id: req.body.user_id,
        due_date: req.body.due_date,
        paid: req.body.paid,
        invoice: req.body.invoice,
        identifier: req.body.idenfitier
      });
      const save = await newContract.save();
      res.send(save);
    }
    catch(err) {
      console.log('add new contract error: ', err)
    }
  });

router.route("/:id")
  // GET CONTRACT
  .get(async (req, res) => {
    console.log('GET contract by id: ', req.params.id)
    try {
      const contract = await db.Contract.findOne({
        where: { id: req.params.id },
        include: [{ model: db.Reminder }]
      })
      console.log("SUCCESS: found contract by id: req.params.id = ", contract)
      contract && res.send(contract);
    }
    catch(err) {
      console.log("ERROR: find contract by id: req.params.id = ", err);
    }
  })
  // UPDATE CONTRACT
  .put(async (req, res) => {
    console.log('update contract called with req.body:', req.body);
    try {
      const updateResult = await db.Contract.update(req.body, {
        where: { id: req.body.id },
        returning: true
      });
      const dbContract = updateResult[1][0];
      res.send(dbContract)
    }
    catch(err) { console.log('update contract error: ', err) }
  });


module.exports = router;
