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
        foreignKey: 'user_id'
      });
      Contract.belongsTo(models.Client, {
        foreignKey: 'client_id'
      });
      Contract.hasMany(models.Reminder, {
        foreignKey: 'contract_id',
        onDelete: 'CASCADE'
      });
    }
  };
  Contract.init({
    client_id: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    due_date: { type: DataTypes.DATE, defaultValue: '', allowNull: false, unique: false },
    invoice: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: true },
    identifier: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: true },
    paid: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false, unique: false },
    amount: { type: DataTypes.INTEGER, defaultValue: '', allowNull: false, unique: false }
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};
