const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
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
    picture: { type: DataTypes.STRING, defaultValue: 'https://res.cloudinary.com/ryanbuckleyca/image/upload/c_scale,h_150,w_150/v1600109993/user_bgu0at.jpg', allowNull: true, unique: false },
    address: { type: DataTypes.VIRTUAL, get() {
        // function also exists in User model
        const fields = ['name', 'street1', 'street2', 'city', 'state', 'post_zip', 'country']
        const x = fields.map(field => this.getDataValue(field))
        return x[0]+' | '+x[1] +', '+(x[2]?x[2]+', ':'')+x[3]+', '+x[4]+' '+x[5]+' '+x[6]
      }
    }
  }, {
    sequelize,
    modelName: 'Client',
  });

  return Client;
};
