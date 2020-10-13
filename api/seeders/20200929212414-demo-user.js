'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      auth0_id: 'auth0|5f6ec6f68ee071006fb063b4',
      name: "Ryan Buckley",
      number: "+1-438-408-6340",
      email: "ryanbuckley@gmail.com",
      street1: "4107 Blvd. St. Laurent",
      street2: "Apt 2",
      city: "Montréal",
      state: "Quebec",
      post_zip: "H2L 1Y7",
      country: "Canada",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
