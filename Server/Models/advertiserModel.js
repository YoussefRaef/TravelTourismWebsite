import sequelize from '../database.js'; // Ensure this points to your Sequelize instance
import { Model, DataTypes } from 'sequelize';
import Activity from './activityModel.js'; // Import the Activity model
import User from './userModel.js';

class Advertiser extends Model {}

// Define the Advertiser model
Advertiser.init(
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
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional
    },
    isAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
      allowNull: false, // Path to the image/logo
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'), // Define possible statuses
      defaultValue: 'Pending', // Default to 'Pending'
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'Advertiser', // Name of the model
    tableName: 'advertisers', // Table name in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Define the relationship with the Activity model
Advertiser.hasMany(Activity, { 
  foreignKey: 'advertiserId', 
  as: 'activities', 
  onDelete: 'CASCADE',
});
Activity.belongsTo(Advertiser, { 
  foreignKey: 'advertiserId', 
  as: 'advertiser',
});

export default Advertiser;