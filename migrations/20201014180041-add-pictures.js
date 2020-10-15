'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'picture',
        {
          type: Sequelize.STRING,
          defaultValue: "https://res.cloudinary.com/ryanbuckleyca/image/upload/c_scale,h_150,w_150/v1600109993/user_bgu0at.jpg"
        }
      ),
      queryInterface.addColumn(
        'Clients',
        'picture',
        {
          type: Sequelize.STRING,
          defaultValue: "https://res.cloudinary.com/ryanbuckleyca/image/upload/c_scale,h_150,w_150/v1600109993/user_bgu0at.jpg"
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'picture'),
      queryInterface.removeColumn('Clients', 'picture')
    ]);
  }
};
