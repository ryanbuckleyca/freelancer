module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reminders', [{
      contract_id: 1,
      active: true,
      type: 'email',
      frequency: 1,
      tone: 'stern',
      text: 'PAY YOUR DAMN BILL!',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reminders', null, {});
  }
};
