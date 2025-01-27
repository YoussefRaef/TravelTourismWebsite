module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('advertisers', 'email');
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('advertisers', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }
  };
  