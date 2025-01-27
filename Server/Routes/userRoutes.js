import express from 'express';
import jwt from 'jsonwebtoken';
import { upload, asyncWrapper } from '../middleware/upload.js';
import bcrypt from 'bcrypt';
import User from '../Models/userModel.js';
import Seller from '../Models/sellerModel.js';
import Advertiser from '../Models/advertiserModel.js';
import Tourist from '../Models/touristModel.js';
import Sequelize from 'sequelize';
const router = express.Router();

const maxAge = 3 * 24 * 60 * 60; // Token expiration time (3 days)

// Create JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, 'supersecret', {
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
                role,
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
                role,
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
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        // Send success response
        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));


export default router;
