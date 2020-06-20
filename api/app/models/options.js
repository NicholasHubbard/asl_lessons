module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define('Options', {
    id: {
      defaultValue: DataTypes.UUID4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'ID not valid, please try again' },
      },
    },
    value: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'Option value is required' },
      },
    },
  }, {});

  Options.associate = function (models) {
    // associations can be defined here
    Options.belongsTo(models.Decisions, { foreignKey: 'decisionId' });
  };
  return Options;
};
