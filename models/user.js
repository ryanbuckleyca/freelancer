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
    name: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: false },
    number: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: false },
    email: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: true },
    street1: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: false },
    street2: { type: DataTypes.STRING, defaultValue: '', allowNull: true, unique: false },
    city: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: false },
    state: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: false },
    post_zip: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: false },
    country: { type: DataTypes.STRING, defaultValue: '', allowNull: false, unique: false },
    picture: { type: DataTypes.STRING, defaultValue: 'https://res.cloudinary.com/ryanbuckleyca/image/upload/c_scale,h_150,w_150/v1600109993/user_bgu0at.jpg', allowNull: false, unique: false },
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
