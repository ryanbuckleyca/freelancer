'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contracts', [{
      client_id: 1, // Julie
      user_id: 1, // Ryan
      reminder_id: 1,
      due_date: new Date('2019-12-18'),
      paid: false,
      invoice: 'https://res.cloudinary.com/ryanbuckleyca/raw/upload/v1603583588/cheque-mate/invoices/rkcqlys2plflsgepupfy.pdf',
      identifier: 'Invoice # RTB20191208',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contracts', null, {});
  }
};
