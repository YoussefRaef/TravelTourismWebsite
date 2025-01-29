import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Tourist from './touristModel.js';
import Activity from './activityModel.js';

class BookedActivity extends Model {}

BookedActivity.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  touristId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tourist,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  activityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Activity,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Store the time of booking
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'confirmed', // Could be 'pending', 'canceled', etc.
  },
}, {
  sequelize,
  modelName: 'BookedActivity',
  tableName: 'booked_activities',
  timestamps: true,
});

// Define Many-to-Many relationship
Tourist.belongsToMany(Activity, { through: BookedActivity, foreignKey: 'touristId', as: 'bookedActivities' });
Activity.belongsToMany(Tourist, { through: BookedActivity, foreignKey: 'activityId', as: 'buyers' });

export default BookedActivity;
