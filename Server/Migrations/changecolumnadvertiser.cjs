module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('advertisers', 'taxFile', {
        type: Sequelize.STRING,
        allowNull: true, // This allows the taxFile to be nullable
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('advertisers', 'taxFile', {
        type: Sequelize.STRING,
        allowNull: false, // Revert to non-nullable if rolling back
      });
    },
  };
  