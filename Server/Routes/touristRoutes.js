import express from 'express';
import User from '../Models/userModel.js';
import Seller from '../Models/sellerModel.js';
import Advertiser from '../Models/advertiserModel.js';
import Tourist from '../Models/touristModel.js';
import {Sequelize,Op} from 'sequelize';
import dotenv from 'dotenv';
import Activity from '../Models/activityModel.js';
const router = express.Router();

router.get('/activities', async (req, res) => {
try {
    const activities = await Activity.findAll();
    res.json(activities);}
catch (error) {
    res.status(500).json({ message: error.message });       
}
})

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



export default router;
