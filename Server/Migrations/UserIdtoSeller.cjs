module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Sellers', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Make sure this is the correct table name
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE', // Ensures that if the user is deleted, the tourist is also deleted
      });
      
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Sellers', 'userId');
    }
  };
  