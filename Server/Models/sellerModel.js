const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this points to your Sequelize instance
const Product = require('./Product'); // Import the Product model

class Seller extends Model {}

// Define the Seller model
Seller.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
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
      allowNull: false, // Path to the tax file
    },
    imageFile: {
      type: DataTypes.STRING,
      allowNull: false, // Path to the seller's logo
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'), // Define possible statuses
      defaultValue: 'Pending', // Default to 'Pending'
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'Seller', // Name of the model
    tableName: 'Sellers', // Table name in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Define the relationship with the Product model
Seller.hasMany(Product, { 
  foreignKey: 'sellerId', 
  as: 'products', // Alias for the relationship
});
Product.belongsTo(Seller, { 
  foreignKey: 'sellerId', 
  as: 'seller', // Alias for the reverse relationship
});

module.exports = Seller;
