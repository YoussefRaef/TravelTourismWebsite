import express from 'express';
import jwt from 'jsonwebtoken';
import { upload, asyncWrapper } from '../middleware/upload.js';
import bcrypt from 'bcrypt';
import User from '../Models/userModel.js';
import Seller from '../Models/sellerModel.js';
import Advertiser from '../Models/advertiserModel.js';
import Tourist from '../Models/touristModel.js';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import authenticateToken from '../middleware/authenticateToken.js'; 
const router = express.Router();
const maxAge = 3 * 24 * 60 * 60; // Token expiration time (3 days)

// Create JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

// http://localhost:3000/user/registerUser
router.post('/registerUser', upload.fields([
    { name: 'idFile', maxCount: 1 },
    { name: 'certificatesFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 }
]), asyncWrapper(async (req, res) => {
    console.log('Request Body:', req.body); // Log the entire request body to debug
    console.log('Uploaded Files:', req.files); // Log the uploaded files to debug

    const { username, email, password, role } = req.body; // Common fields

    // Extract uploaded files (if any)
    const idFile = req.files?.idFile?.[0]?.path || null;
    const certificatesFile = req.files?.certificatesFile?.[0]?.path || null;
    const imageFile = req.files?.imageFile?.[0]?.path || null;

    try {
        // Check if the username or email already exists in the database
        const existingUser = await User.findOne({
            where: { [Sequelize.Op.or]: [{ username }, { email }] },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or Email already exists' });
        }

        // Hash the password for secure storage
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser;
        let newSubUser;

        // Create the user first
        newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
        });
        // **Role-based user creation**
        if (role === 'Tourist') {
            const { mobileNumber, nationality, job, dateOfBirth } = req.body;
            if (!mobileNumber || !nationality || !job || !dateOfBirth) {
                return res.status(400).json({ error: "Missing required fields for Tourist" });
            }

            newSubUser = await Tourist.create({
                userId: newUser.id,
                mobileNumber,
                nationality,
                dateOfBirth,
                job,
            });

        } else if (role === 'Seller') {
            if (!idFile || !certificatesFile || !imageFile) {
                return res.status(400).json({ error: "Missing required files for Seller" });
            }

            newSubUser = await Seller.create({
                userId: newUser.id,
                idFile,
                certificatesFile,
                imageFile,
            });

        } else if (role === 'Advertiser') {
            if (!idFile || !certificatesFile || !imageFile) {
                return res.status(400).json({ error: "Missing required files for Advertiser" });
            }

            newSubUser = await Advertiser.create({
                userId: newUser.id,
                idFile,
                certificatesFile,
                imageFile,
            });

        } else {
            return res.status(400).json({ error: 'Invalid role specified' });
        }

        // Generate a JWT token for authentication
        const token = createToken(newUser.id);

        // Set the token as a cookie in the response
        res.cookie('jwt', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None',
            domain: 'localhost',
            path : '/',
            maxAge: maxAge * 1000 
        });
        
        // Send success response
        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));

// http://localhost:3000/user/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {   
        console.log('Received login request for username:', username);

        // Check if the user exists in the database
        const user = await User.findOne({ where: { username } }); 
        if (!user) {
            console.log('User not found in the database');
            return res.status(400).json({ msg: 'Invalid username' });
        }

        console.log('User found:', user); // Log the entire user object (except password)

        // Check if the user is rejected (if status is rejected, they cannot login)
       // Check if the user is a Seller and their status
const seller = await Seller.findOne({ where: { userId: user.id } });
if (seller) { // Only check status if seller exists
    if (seller.status === 'Rejected') {
        console.log('User account is rejected');
        return res.status(400).json({ msg: 'Your account has been rejected. You cannot log in.' });
    }
    if (seller.status === 'Pending') {
        console.log('User account is pending approval');
        return res.status(400).json({ msg: 'Your account is currently under review. Please wait for approval before logging in.' });
    }
}

// Check if the user is an Advertiser and their status
const advertiser = await Advertiser.findOne({ where: { userId: user.id } });
if (advertiser) { // Only check status if advertiser exists
    if (advertiser.status === 'Rejected') {
        console.log('User account is rejected');
        return res.status(400).json({ msg: 'Your account has been rejected. You cannot log in.' });
    }
    if (advertiser.status === 'Pending') {
        console.log('User account is pending approval');
        return res.status(400).json({ msg: 'Your account is currently under review. Please wait for approval before logging in.' });
    }
}

        // Debugging password comparison
        console.log('Entered Password:', password);
        console.log('Stored Hashed Password:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match Result:', isMatch);

        if (!isMatch) {
            console.log('Password comparison failed');
            return res.status(400).json({ msg: 'Invalid password' });
        }

        console.log('User authenticated successfully');

        // If the user is authenticated, create a JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '100h' },
            (err, token) => {
                if (err) {
                    console.error('JWT Signing Error:', err);
                    throw err;
                }
                console.log('JWT Token:', token); // This logs the generated JWT token
                console.log('JWT Token generated successfully');
                res.cookie('jwt', token, { 
                    httpOnly: true, 
                    secure: process.env.NODE_ENV === 'production', 
                    sameSite: 'None', 
                    domain: 'localhost',
                    path : '/',
                    maxAge: 100 * 60 * 60 * 1000 // 100 hours in milliseconds
                });
                res.json({ role: user.role, userId: user.id });
                
            }
        );

    } catch (err) {
        console.error('Server Error:', err.message);
        res.status(500).send('Server error');
    }
});

// http://localhost:3000/user/logout
router.get('/logout', (req, res) => {
    console.log("Logout route hit"); // For debugging

    res.clearCookie('jwt', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'None' 
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

// http://localhost:3000/user/getUser
router.get('/getUser/:id', authenticateToken, async (req, res) => {
    const { id } = req.params; // Get user ID from route parameter

    try {
        // Find the user by primary key (id)
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Look for the sub-user (Tourist, Seller, Advertiser) based on the user ID
        const subUser = await Promise.any([
            Tourist.findOne({ where: { userId: id } }),
            Seller.findOne({ where: { userId: id } }),
            Advertiser.findOne({ where: { userId: id } })
        ]).catch(() => null); // If none exist, return null

        if (!subUser) {
            return res.status(404).json({ error: 'No sub-user found' });
        }

        // Return user and sub-user details
        res.status(200).json({ user, subUser });
    } catch (err) {
        console.error('Error during getUser:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// http://localhost:3000/user/updateUser/:id
router.put('/updateUser/:id', upload.fields([
    { name: 'idFile', maxCount: 1 },
    { name: 'certificatesFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 }
]), async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash password before updating
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update User
        const updatedUser = await user.update({ 
            username, 
            email, 
            password: hashedPassword, 
            role 
        });

        let updatedSubUser = null;

        if (role === 'Tourist') {
            const { mobileNumber, country, job, dateOfBirth } = req.body;

            // Update the Tourist entry
            await Tourist.update({
                mobileNumber,
                country,
                job,
                dateOfBirth
            }, { where: { userId: id } });

            // Fetch the updated Tourist
            updatedSubUser = await Tourist.findOne({ where: { userId: id } });
        } else if (role === 'Seller' || role === 'Advertiser') {
            const idFile = req.files?.idFile ? req.files.idFile[0].path : null;
            const certificatesFile = req.files?.certificatesFile ? req.files.certificatesFile[0].path : null;
            const imageFile = req.files?.imageFile ? req.files.imageFile[0].path : null;

            const Model = role === 'Seller' ? Seller : Advertiser;

            // Update the Seller/Advertiser entry
            await Model.update({
                idFile,
                certificatesFile,
                imageFile
            }, { where: { userId: id } });

            // Fetch the updated Seller/Advertiser
            updatedSubUser = await Model.findOne({ where: { userId: id } });
        }

        return res.json({ 
            message: "User updated successfully", 
            user: updatedUser, 
            subUser: updatedSubUser 
        });

    } catch (err) {
        console.error('Error during updateUser:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



export default router;
