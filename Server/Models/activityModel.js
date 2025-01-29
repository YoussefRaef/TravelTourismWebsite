import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Advertiser from './advertiserModel.js'; // Ensure Advertiser is imported

class Activity extends Model {}

Activity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {  // An array of image file paths (for example, PNG or JPEG)
      type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings (file paths/URLs)
      allowNull: false, // Ensure there is at least one image
    },
    price: {
      type: DataTypes.FLOAT, // You can change to DataTypes.DECIMAL if you prefer more precision
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING, // Using STRING for time representation
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING, // Store Google Maps location as a string (e.g., coordinates or a formatted address)
      allowNull: false,
    },
    flagged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to false (not flagged)
    },
    advertiserId: {  // Foreign key to the Advertiser table
      type: DataTypes.INTEGER,
      references: {
        model: 'advertisers', // Make sure this matches Advertiser's tableName
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },

  {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities',
    timestamps: true,
  }
);

export default Activity;
