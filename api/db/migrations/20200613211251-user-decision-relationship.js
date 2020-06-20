module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Decisions', 'userId', {
    type: Sequelize.UUID,
    references: {
      model: 'Users',
      key: 'id',
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Decisions', 'userId'),
};
