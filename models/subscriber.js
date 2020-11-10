const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    static associate(models) {}
  };

  Subscriber.init({
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subscriber',
  });
  
  return Subscriber;
};
