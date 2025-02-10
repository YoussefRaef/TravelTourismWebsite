import Product from './productModel.js';
import Review from './reviewModel.js';
import User from './userModel.js';
import Seller from './sellerModel.js';
import BookedActivity from './bookedActivityModel.js';
import BookedProduct from './bookedProductModel.js';
import Tourist from './touristModel.js';
import Activity from './activityModel.js';

// Define Tourist - Activity relationships (Many-to-Many)
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

// Define Tourist - Product relationships (Many-to-Many)
Tourist.belongsToMany(Product, { 
  through: BookedProduct, 
  foreignKey: 'touristId', 
  as: 'purchasedProducts'  // Changed from 'bookedProducts'
});

Product.belongsToMany(Tourist, { 
  through: BookedProduct, 
  foreignKey: 'productId', 
  as: 'buyers' 
});


// Define Tourist - User relationship (One-to-One)
Tourist.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Tourist, { foreignKey: 'userId', onDelete: 'CASCADE' });

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
