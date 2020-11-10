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
      Client.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  };
  Client.init({
    user_id: { type: DataTypes.INTEGER, defaultValue: '', allowNull: false, unique: false },
    name: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: true },
    number: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: true },
    email: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: true },
    street1: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false },
    street2: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false },
    city: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false },
    state: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false },
    post_zip: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false },
    country: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false },
    picture: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false }
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
