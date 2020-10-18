'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addConstraint('Users', {
      fields: ['auth0_id'],
      type: 'unique',
      name: 'unique_auth0_id'
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Users', 'unique_auth0_id')
  }
};
