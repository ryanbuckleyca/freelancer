'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [{
      id: 1,
      name: "Julie Hecht",
      number: "631-697-0961",
      email: "jzh195@gmail.com",
      street1: "12 Georgica Rd",
      street2: null,
      city: "East Hampton",
      state: "New York",
      post_zip: "11937",
      country: "USA",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
