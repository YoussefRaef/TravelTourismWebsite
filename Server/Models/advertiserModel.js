const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User'); // Import the base User model

const Advertiser = User.extend('Advertiser', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hotline: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profile: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional
    },
    isAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    idFile: {
        type: DataTypes.STRING,
        allowNull: false, // Path to the ID file
    },
    taxFile: {
        type: DataTypes.STRING,
        allowNull: false, // Path to the tax file
    },
    imageFile: {
        type: DataTypes.STRING,
        allowNull: false, // Path to the image/logo
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending', // Default status
    },
}, {
    timestamps: true,
    tableName: 'advertisers',
});

// Define relationship: One Advertiser can have many Activities
Advertiser.hasMany(Activity, {
    foreignKey: 'advertiserId', // The foreign key in the Activity model
    onDelete: 'CASCADE', // If an advertiser is deleted, their activities are also deleted
});

module.exports = Advertiser;
