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


Tourist.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Tourist, { foreignKey: 'userId', onDelete: 'CASCADE' });


// Export the model
export default Tourist;