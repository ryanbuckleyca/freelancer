'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contract.init({
    client_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    id: DataTypes.INTEGER,
    due_date: DataTypes.DATE,
    paid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};