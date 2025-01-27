import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js'; 

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        immutable: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Tourist', 'Seller', 'Advertiser', 'Admin'),
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'users',
});

export default User;
