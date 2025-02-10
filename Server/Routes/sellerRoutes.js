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
const router = express.Router();

//http://localhost:3000/seller/products

router.post('/products', authenticateToken, upload.fields([{ name: 'images', maxCount: 5 }]), async (req, res) => {
    try {
        const sellerId = req.user.id; // ✅ Ensure this is defined
        if (!sellerId) {
            return res.status(403).json({ message: 'Invalid token: No user ID found' });
        }

        const seller = await Seller.findByPk(sellerId);
        if (!seller) {
            return res.status(401).json({ message: 'Unauthorized: Seller does not exist' });
        }

        const images = req.files?.images?.map(file => file.path) || [];
        const { name, price, quantity } = req.body;

        if (!name || !price || !quantity) {
            return res.status(400).json({ message: 'Name, price, and quantity are required' });
        }
        if (isNaN(price) || isNaN(quantity)) {
            return res.status(400).json({ message: 'Price and quantity must be numbers' });
        }

        const product = await Product.create({ name, price, images, quantity, sellerId });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




export default router;
