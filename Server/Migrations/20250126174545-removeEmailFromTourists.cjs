module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tourists', 'email');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tourists', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
