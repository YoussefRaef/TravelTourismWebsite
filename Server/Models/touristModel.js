const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Ensure the correct path to your Sequelize instance

// Define the Tourist model
class Tourist extends Model {}

Tourist.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobileNumber: {
      type: DataTypes.STRING, // Allows for international formats
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY, // Only stores the date (not time)
      allowNull: false,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wallet: {
      type: DataTypes.DECIMAL(10, 2), // For monetary values
      defaultValue: 0.0, // Optional: Initialize wallet with a default value
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize, // Sequelize instance
    modelName: 'Tourist', // Model name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Define Associations (bookmarksActivity and bookmarksItinerary)
// Activities and Itineraries would be separate models.

const Activity = require('./Activity'); // Ensure the correct path

Tourist.belongsToMany(Activity, {
  through: 'TouristActivityBookmarks', // Join table
  as: 'bookmarkedActivities',
  foreignKey: 'touristId',
});


// Export the model
module.exports = Tourist;
