import express from 'express';
import User from '../Models/userModel.js';
import Seller from '../Models/sellerModel.js';
import Advertiser from '../Models/advertiserModel.js';
import Tourist from '../Models/touristModel.js';
import {Sequelize,Op} from 'sequelize';
import dotenv from 'dotenv';
import Activity from '../Models/activityModel.js';
import Product from '../Models/productModel.js';
import BookedActivity from '../Models/bookedActivityModel.js';
import BookedProduct from '../Models/bookedProductModel.js';
import Cart from '../Models/cartModel.js';
const router = express.Router();

//ActivityRoutes

//http://localhost:3000/tourist/activities
router.get('/activities', async (req, res) => {
try {
    const activities = await Activity.findAll();
    res.json(activities);}
catch (error) {
    res.status(500).json({ message: error.message });       
}
})

//http://localhost:3000/tourist/upcomingActivities
router.get('/upcomingActivities', async (req, res) => {
try{
    const activities = await Activity.findAll({
        where: {
            date: {
                [Sequelize.Op.gt]: new Date()
            }
        }
    });
    res.json(activities);
}
catch{
    res.status(500).json({ message: error.message });
}

})

//http://localhost:3000/tourist/filterActivities?name=activity1&category=category1&price=100&date=2022-12-31
router.get('/filterActivities', async (req, res) => {
    const { name, category, price, date } = req.query; // Use req.query for GET requests
    try {
        // Build the filter object dynamically
        let filters = {};
        if (name) filters.name = name;
        if (category) filters.category = category;
        if (price) filters.price = { [Op.lte]: price };

        if (date) {filters.date = { [Op.eq]: date };}
        else{filters.date = { [Op.gte]: new Date() };}
        const activities = await Activity.findAll({ where: filters });
        res.json(activities);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//ProductRoutes----------------------------------------------

//http://localhost:3000/tourist/products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);}
    catch (error) {
        res.status(500).json({ message: error.message });       
    }
    })
//http://localhost:3000/tourist/filterProducts?name=product1&category=category1&price=100
 router.get('/filterProducts', async (req, res) => {
        const { name, category, price } = req.query; // Use req.query for GET requests
        try {
            // Build the filter object dynamically
            let filters = {};
            if (name) filters.name = name;
            if (category) filters.category = category;
            if (price) filters.price = { [Op.lte]: price };
    
            const products = await Product.findAll({ where: filters });
            res.json(products);
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

//http://localhost:3000/tourist/bookProduct
router.post('/bookProductWallet', async (req, res) => {
    const { productId, touristId, quantity, name,price,images } = req.query;
    try {
        const product = await Product.findByPk(productId);
        const tourist = await Tourist.findByPk(touristId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Not enough stock' });
        }
        if(touristId == null){
            return res.status(400).json({ message: 'login to book' });
        }
        if (product.price*quantity > tourist.wallet){
            return res.status(400).json({ message: 'Not enough balance' });
        }
        const bookedProduct = await BookedProduct.create({
            productId: productId,
            touristId: touristId,
            quantity: quantity,
            name: name,
            price: price,
            images: images,
        });
        await tourist.update({ wallet: tourist.wallet - product.price*quantity });
        await product.update({ quantity: product.quantity - quantity });
        res.json(bookedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//http://localhost:3000/tourist/addToCart


export default router;
