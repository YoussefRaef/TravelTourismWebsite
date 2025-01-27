import express from 'express';
import sequelize from './database.js'; // Import the Sequelize instance
import userRoutes from './Routes/userRoutes.js'; // Import the user routes
import cors from 'cors'; // Import the CORS middleware

const app = express();
const port = 3000;
app.use(cors());


// Middleware to parse JSON & form data
app.use(express.json()); // For JSON requests
app.use(express.urlencoded({ extended: true })); // For form data
app.use('/user', userRoutes)

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
