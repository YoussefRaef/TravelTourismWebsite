import express from 'express';
import sequelize from './database.js'; // Import the Sequelize instance
import userRoutes from './Routes/userRoutes.js'; // Import the user routes
import adminRoutes from './Routes/adminRoutes.js'; // Import the user routes
import sellerRoutes from './Routes/sellerRoutes.js'; // Import the user routes
import advertiserRoutes from './Routes/advertiserRoutes.js'; // Import the user routes
import touristRoutes from './Routes/touristRoutes.js'; // Import the user routes
import cors from 'cors'; // Import the CORS middleware
import setupAssociations from './Models/associations.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;
app.use(cookieParser()); // Middleware to parse cookies

app.use('/uploads', express.static('uploads'));
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
app.use('/admin', adminRoutes)
app.use('/seller', sellerRoutes)
app.use('/advertiser', advertiserRoutes)
app.use('/tourist', touristRoutes)
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
