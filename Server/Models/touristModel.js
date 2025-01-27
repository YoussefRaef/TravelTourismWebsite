import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import User from './userModel.js'; 
// Define the Tourist model
class Tourist extends Model {}


Tourist.init({
  userId: {
      type: DataTypes.INTEGER,
      references: {
          model: User,
          key: 'id'
      },
      allowNull: false,
      unique: true
  },
  mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  nationality: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
  },
  job: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  wallet: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
  },
  loyaltyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Tourist',
  timestamps: true
});

// Define Associations (bookmarksActivity and bookmarksItinerary)
// Activities and Itineraries would be separate models.

import Product from './productModel.js'; // Import the Product model
import Activity from './activityModel.js'; // Import the Activity model

Tourist.belongsToMany(Activity, {
  through: 'TouristActivityBookmarks', // Join table
  as: 'bookmarkedActivities',
  foreignKey: 'touristId',
});

Tourist.belongsToMany(Product, {
  through: 'TouristProductBookmarks', // Join table
  as: 'bookmarkedProducts',
  foreignKey: 'touristId',
});
Tourist.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Tourist, { foreignKey: 'userId', onDelete: 'CASCADE' });


// Export the model
export default Tourist;