'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Client.hasMany(models.Address, {
        foreignKey: 'client_id',
        onDelete: 'CASCADE'
      });
      Client.hasMany(models.Contract, {
        foreignKey: 'client_id',
        onDelete: 'CASCADE'
      });
    }
  };
  Client.init({
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
