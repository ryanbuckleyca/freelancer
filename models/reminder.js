const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reminder.belongsTo(models.Contract, {
        foreignKey: 'contract_id',
      });
    };
  };
  Reminder.init({
    contract_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    frequency: DataTypes.INTEGER,
    tone: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Reminder',
  });
  return Reminder;
};