import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Tourist from './touristModel.js';
import Product from './productModel.js';

class BookedProduct extends Model {}

BookedProduct.init(
  {
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
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }, images: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Stores image URLs as an array
        allowNull: true,
      },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending', // Could be 'confirmed', 'shipped', 'delivered', etc.
    },
  },
  {
    sequelize,
    modelName: 'BookedProduct',
    tableName: 'booked_products',
    timestamps: true,
  }
);

export default BookedProduct;
