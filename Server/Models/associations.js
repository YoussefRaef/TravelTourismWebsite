// associations.js

import Product from './productModel.js';
import Review from './reviewModel.js';
import User from './userModel.js';
import Seller from './sellerModel.js';
import BookedActivity from './bookedActivityModel.js';
import BookedProduct from './bookedProductModel.js';
import Tourist from './touristModel.js';
import Activity from './activityModel.js';
import Cart from './cartModel.js';

// --- Tourist and Activity (Many-to-Many) ---
Tourist.belongsToMany(Activity, { 
  through: BookedActivity, 
  foreignKey: 'touristId', 
  as: 'activitiesBooked' 
});
Activity.belongsToMany(Tourist, { 
  through: BookedActivity, 
  foreignKey: 'activityId', 
  as: 'touristBookings' 
});

// --- Tourist and Product (Many-to-Many) ---
Tourist.belongsToMany(Product, { 
  through: BookedProduct, 
  foreignKey: 'touristId', 
  as: 'purchasedProducts' 
});
Product.belongsToMany(Tourist, { 
  through: BookedProduct, 
  foreignKey: 'productId', 
  as: 'buyers' 
});

// --- Tourist and User (One-to-One) ---
Tourist.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Tourist, { foreignKey: 'userId', onDelete: 'CASCADE' });

// --- Product and Review (One-to-Many) ---
Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });

// --- User and Review (One-to-Many) ---
User.hasMany(Review, { foreignKey: 'username', sourceKey: 'username' });
Review.belongsTo(User, { foreignKey: 'username', targetKey: 'username' });

// --- Seller and Product (One-to-Many) ---
Seller.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(Seller, { foreignKey: 'sellerId', as: 'seller' });

// --- Tourist and Cart (One-to-One) ---
// Assuming one active cart per tourist.
Tourist.hasOne(Cart, { foreignKey: 'touristId', onDelete: 'CASCADE' });
Cart.belongsTo(Tourist, { foreignKey: 'touristId', onDelete: 'CASCADE' });

export default function setupAssociations() {
  console.log("Associations have been set up.");
}
