'use strict';

const db = require('./index')
// const Household = require('./household')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    auth0_id: DataTypes.STRING,
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Address, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Contract, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
