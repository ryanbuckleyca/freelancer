'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const clients = require('./clients.json')
    let clientsArray = []
    clients.forEach((client, i) => {
      clientsArray.push({
        name: client['name'],
        number: client['number'],
        email: client['email'],
        street1: client['street1'],
        city: client['city'],
        state: client['state'],
        post_zip: client['post_zip'],
        country: client['country'],
        picture: client['picture'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });
    await queryInterface.bulkInsert('Clients', clientsArray, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
