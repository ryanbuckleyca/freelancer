const express = require('express');
let router = express.Router();
const db = require('../models');

// TODO: these routes should require authentication

const upsertReminders = (reminders, contract_id) => {
  return reminders.forEach(reminder => {
    db.Reminder.upsert(reminder, {
      where: { contract_id: contract_id },
      returning: true
    })
  })
}

router.route("/")
  // GET ALL CONTACTS
  .get(async (req, res) => {
    const allContracts = await db.Contract.findAll({
      where: { user_id: 1 },
      include: [
        { model: db.Client },
        { model: db.Reminder }
      ]
    });
    res.send(allContracts)
  })
  // CREATE NEW CONTRACT
  .post((req, res) => {
    console.log('api/contracts/ POST called')
    try {
      console.log('{...req.body} is: ', {...req.body})
      db.Contract
        .create({
          client_id: req.body.client_id,
          user_id: req.body.user_id,
          due_date: req.body.due_date,
          invoice: req.body.invoice,
          identifier: req.body.identifier,
          paid: req.body.paid,
          amount: req.body.amount
        })
        .then(record => {
          upsertReminders(req.body.Reminders, record.id)
          res.send(record);
        })
    }
    catch(err) {
      console.log('add new contract error: ', err)
    }
  });

router.route("/new")
  // NEW contract
  .get(async (req, res, next) => {
    const newContract = await db.Contract.build()
    newContract.dataValues.Reminders = []
    res.send(newContract)
  })

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
      })
      .then(upsertReminders(req.body.reminders, red.body.id))

      const dbContract = updateResult[1][0];
      res.send(dbContract)
    }
    catch(err) { console.log('update contract error: ', err) }
  });


module.exports = router;
