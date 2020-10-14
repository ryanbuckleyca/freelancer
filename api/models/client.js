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
      Client.hasMany(models.Contract, {
        foreignKey: 'client_id',
        onDelete: 'CASCADE'
      });
    }
  };
  Client.init({
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    email: DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    post_zip: DataTypes.STRING,
    country: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
