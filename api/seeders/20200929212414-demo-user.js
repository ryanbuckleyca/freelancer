'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      auth0_id: 'auth0|5f6ec6f68ee071006fb063b4',
      name: "Ryan Buckley",
      number: "+1-438-408-6340",
      email: "ryanbuckley@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const users = await queryInterface.sequelize.query(
      'SELECT id from "Users";'
    );

    const userRows = users[0];

    await queryInterface.bulkInsert('Addresses', [
      {
        id: 1,
        user_id: userRows[0].id,
        street1: '4107 Blvd. St. Laurent',
        street2: 'Apt 2',
        city: 'Montreal',
        state: 'QC',
        zip: 'H2W 1Y7',
        country: 'Canada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id: userRows[0].id,
        street1: '228 Covert St.',
        street2: 'Apt 1',
        city: 'Brooklyn',
        state: 'NY',
        zip: '11207',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};
