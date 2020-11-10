const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Contract, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Client, {
        foreignKey: 'user_id'
      });
    }
  };

  User.init({
    auth0_id: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    email: DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    post_zip: DataTypes.STRING,
    country: DataTypes.STRING,
    picture: DataTypes.STRING,
    address: { type: DataTypes.VIRTUAL, get() {
        // function also exists in User model
        const fields = ['name', 'street1', 'street2', 'city', 'state', 'post_zip', 'country']
        const x = fields.map(field => this.getDataValue(field))
        return x[0]+' | '+x[1] +', '+(x[2]?x[2]+', ':'')+x[3]+', '+x[4]+' '+x[5]+' '+x[6]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
