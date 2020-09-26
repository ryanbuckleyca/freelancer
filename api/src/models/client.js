const client = (sequelize, DataTypes) => {
  const Client = sequelize.define('client', {
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    address_city: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    address_line_1: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    address_line_2: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    address_state: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    address_country: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    address_post_zip: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
  });

  Client.associate = models => {
    Client.hasMany(models.Contracts);
  };

  return Client;
};
