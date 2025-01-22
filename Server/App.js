import express from 'express';
import sequelize from './database.js'; // Import the Sequelize instance

const app = express();
const port = 3000;

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL using Sequelize');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
