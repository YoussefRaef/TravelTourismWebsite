import Product from './productModel.js';
import Review from './reviewModel.js';
import User from './userModel.js';
import Seller from './sellerModel.js';

// Define relationships
Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Review, { foreignKey: 'username', sourceKey: 'username' });
Review.belongsTo(User, { foreignKey: 'username', targetKey: 'username' });

// Seller - Product relationship
Seller.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(Seller, { foreignKey: 'sellerId', as: 'seller' });

export default function setupAssociations() {
  console.log("Associations have been set up.");
}
