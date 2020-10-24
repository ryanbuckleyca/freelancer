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
      Contract.belongsTo(models.User, {
        foreignKey: 'client_id'
      });
      Contract.belongsTo(models.Client, {
        foreignKey: 'client_id'
      });
    }
  };
  Contract.init({
    client_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    due_date: DataTypes.DATE,
    invoice: DataTypes.STRING,
    paid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};
