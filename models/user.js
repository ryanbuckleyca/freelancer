const db = require('./index')
// const Household = require('./household')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    auth0_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
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
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Contract, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Client, {
      foreignKey: 'user_id'
    });  };
  return User;
};
