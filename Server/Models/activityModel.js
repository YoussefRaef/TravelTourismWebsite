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
    advertiserId: {  // Define the foreign key here
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
