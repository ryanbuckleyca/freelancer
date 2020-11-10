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
    contract_id: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false, unique: false },
    type: { type: DataTypes.STRING, defaultValue: false, allowNull: false, unique: false },
    frequency: { type: DataTypes.INTEGER, defaultValue: 28, allowNull: false, unique: false },
    tone: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false },
    text: { type: DataTypes.STRING, defaultValue: 'Gentle reminder...', allowNull: false, unique: false },
  }, {
    sequelize,
    modelName: 'Reminder',
  });
  return Reminder;
};
