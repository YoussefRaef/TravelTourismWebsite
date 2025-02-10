import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Ensure this points to your Sequelize instance
import User from './userModel.js';

class Seller extends Model {}

// Define the Seller model
Seller.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      },
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT, // Text field for seller description
      allowNull: true,
      trim: true,
    },
    isAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to false
    },
    idFile: {
      type: DataTypes.STRING,
      allowNull: false, // Path to the ID file
    },
    taxFile: {
      type: DataTypes.STRING,
      allowNull: true, // Path to the tax file
    },
    imageFile: {
      type: DataTypes.STRING,
      allowNull: false, // Path to the seller's logo
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'), // Define possible statuses
      defaultValue: 'Accepted', // Default to 'Pending'
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'Seller', // Name of the model
    tableName: 'Sellers', // Table name in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export default Seller;
