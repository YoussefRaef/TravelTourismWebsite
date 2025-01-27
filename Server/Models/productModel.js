import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js'; 
import Seller from './sellerModel.js'; // Import Seller here if not already

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
    sellerId: { // Define the foreign key
      type: DataTypes.INTEGER,
      references: {
        model: 'Sellers', // Must match tableName in Seller model
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

export default Product;
