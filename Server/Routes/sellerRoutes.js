import express from 'express';
import User from '../Models/userModel.js';
import Seller from '../Models/sellerModel.js';
import Advertiser from '../Models/advertiserModel.js';
import Tourist from '../Models/touristModel.js';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import Activity from '../Models/activityModel.js';
import Product from '../Models/productModel.js';
import BookedActivity from '../Models/bookedActivityModel.js';
import BookedProduct from '../Models/bookedProductModel.js';
import { upload, asyncWrapper } from '../middleware/upload.js';
import authenticateToken from '../middleware/authenticateToken.js'; 
import multer from 'multer';
const router = express.Router();

//http://localhost:3000/seller/products

router.post(
    '/products',
    authenticateToken,
    upload.fields([{ name: 'images', maxCount: 5 }]),
    async (req, res) => {
      try {
        // Debug log: Check what's coming in the body and files
        console.log('Request body:', req.body);
        console.log('Uploaded files:', req.files);
        
        const sellerId = req.user.id;
        console.log("Seller ID from token:", sellerId);
        
        const seller = await Seller.findOne({ where: { userId: sellerId } });
        if (!seller) {
          return res.status(401).json({ message: 'Unauthorized: Seller does not exist' });
        }
        console.log("Seller record:", seller);
        
        if (!sellerId) {
            return res.status(403).json({ message: 'Invalid token: No user ID found' });
        }
        
        // Process the files (if any)
        const images = req.files?.images?.map(file => file.path) || [];
        const { name, price, quantity, description, category } = req.body;
  
        // Validate required fields
        if (!name || !price || !quantity || !description || !category) {
            return res.status(400).json({ message: 'Name, price, quantity, description, and category are required' });
        }
        if (isNaN(price) || isNaN(quantity)) {
            return res.status(400).json({ message: 'Price and quantity must be numbers' });
        }
  
        const product = await Product.create({ name, price, images, quantity, description, category, sellerId: seller.id });
        res.json(product);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );
  
//http://localhost:3000/seller/products
router.get(
    '/products',
    authenticateToken,
    async (req, res) => {
      try {
        const sellerId = req.user.id;
        console.log("Seller ID from token:", sellerId);
        
        const seller = await Seller.findOne({ where: { userId: sellerId } });
        if (!seller) {
          return res.status(401).json({ message: 'Unauthorized: Seller does not exist' });
        }
        console.log("Seller record:", seller);
        
        if (!sellerId) {
            return res.status(403).json({ message: 'Invalid token: No user ID found' });
        }
        
        const products = await Product.findAll({ where: { sellerId: seller.id } });
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );



export default router;
