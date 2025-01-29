import express from 'express';
import User from '../Models/userModel.js';
import Seller from '../Models/sellerModel.js';
import Advertiser from '../Models/advertiserModel.js';
import Tourist from '../Models/touristModel.js';
import {Sequelize,Op} from 'sequelize';
import Activity from '../Models/activityModel.js';
import dotenv from 'dotenv';
const router = express.Router();

router.post('/createActivity', async (req, res) => {
    const { name, category, price, date, advertiserId } = req.body;
    try {
        const activity = await Activity.create({
            name,
            category,
            picture,
            price,
            date,
            time,
            location,
            advertiserId
        });
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/editActivity/:id', async (req, res) => {
    const { name, category, price, date, advertiserId } = req.body;
    try {
        const activity = await Activity.update({
            name,
            category,
            picture,
            price,
            date,
            time,
            location,
            advertiserId
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/deleteActivity/:id', async (req, res) => {
    try {
        const activity = await Activity.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




export default router;
