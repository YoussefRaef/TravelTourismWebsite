import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
});

// Sync models with the database
sequelize.sync({ force: false }) // Set to `false` in production, `true` to drop tables during development
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Export the Sequelize instance for use in other parts of the app
export default sequelize;
