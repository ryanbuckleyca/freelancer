'use strict';
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
      Reminder.hasMany(models.Contract, {
        foreignKey: 'reminder_id',
      });
    };
  };
  Reminder.init({
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