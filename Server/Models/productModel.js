import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Seller from './sellerModel.js'; // Ensure Seller model is correctly imported
import Review from './reviewModel.js'; // Import Review model

class Product extends Model {}

Product.init(
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    averageRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 1,
        max: 5,
      },
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Stores image URLs as an array
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sales: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Seller,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true,
  }
);

// Define relationships
Product.belongsTo(Seller, { foreignKey: 'sellerId' }); // One Seller has many Products
Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' }); // One Product has many Reviews

export default Product;
