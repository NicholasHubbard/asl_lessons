module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Options', {
    id: {
      allowNull: false,
      primaryKey: true,
      type:Sequelize.UUID,
      defaultValue: Sequelize.UUID4,
    },
    value: {
      type: Sequelize.STRING
    },

    decisionId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Decisions',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Options');
};
