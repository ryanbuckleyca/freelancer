'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contracts', [{
      id: 1,
      client_id: 1, // Julie
      user_id: 1, // Ryan
      due_date: new Date('2019-12-18'),
      paid: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contracts', null, {});
  }
};
