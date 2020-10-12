'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [{
      id: 1,
      name: "Julie Hecht",
      number: "+1-631-697-0961",
      email: "jzh195@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const clients = await queryInterface.sequelize.query(
      'SELECT id from "Clients";'
    );

    const clientRows = clients[0];

    await queryInterface.bulkInsert('Addresses', [
      {
        id: 3,
        client_id: clientRows[0].id,
        street1: '12 Georgica Rd',
        street2: null,
        city: 'East Hampton',
        state: 'NY',
        zip: '11937',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', null, {});
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};
