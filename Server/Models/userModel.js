const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@localhost:5432/database_name'); // Replace with your database connection

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        immutable: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Tourist', 'Seller', 'Advertiser', 'Admin'),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'users',
});

module.exports = User;
