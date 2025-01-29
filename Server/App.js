import express from 'express';
import sequelize from './database.js'; // Import the Sequelize instance
import userRoutes from './Routes/userRoutes.js'; // Import the user routes
import cors from 'cors'; // Import the CORS middleware
import setupAssociations from './Models/associations.js';

const app = express();
const port = 3000;

// Allow your frontend's domain (localhost:5173) during development
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // If you're using cookies or sessions
}));


// Middleware to parse JSON & form data
app.use(express.json()); // For JSON requests
app.use(express.urlencoded({ extended: true })); // For form data
app.use('/user', userRoutes)

setupAssociations();
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
