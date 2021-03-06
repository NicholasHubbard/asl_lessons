module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: { args: true, msg: 'Username is already in use' },
      allowNull: { args: false, msg: 'Username is required' },
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Name is required' },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('slack', 'regular'),
      validate: {
        isIn: {
          args: [['slack', 'regular']],
          msg: 'User type must be slack or regular',
        },
      },
    },
  }, {});

  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Decisions, { foreignKey: 'userId' });
  };

  return Users;
};
