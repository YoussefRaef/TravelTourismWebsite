import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Product from './productModel.js'; // Ensure Product model is correctly imported
import User from './userModel.js'; // Ensure User model is correctly imported

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'username',
      },
      allowNull: false,
      unique: true, // Ensure each username can only leave one review per product
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'Reviews',
    timestamps: true,
  }
);

// Define relationships
Review.belongsTo(Product, { foreignKey: 'productId' }); // One Product has many Reviews
Review.belongsTo(User, { foreignKey: 'username', targetKey: 'username' }); // One User can leave many Reviews

export default Review;
