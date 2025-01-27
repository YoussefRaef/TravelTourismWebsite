module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Sellers', 'email');
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Sellers', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }
  };
  