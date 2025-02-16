import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Tourist from './touristModel.js';

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Stores an array of product items with quantitySelected for each
    products: {
      type: DataTypes.JSONB, // Use JSONB if you are on PostgreSQL; otherwise, use DataTypes.JSON
      allowNull: false,
      defaultValue: [], // Expected format: [{ productId: 1, quantitySelected: 2 }, ...]
    },
    // Overall price for all items in the cart.
    overallPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    timestamps: true, // Includes createdAt and updatedAt fields
  }
);

export default Cart;
