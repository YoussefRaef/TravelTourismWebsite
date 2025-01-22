const User = require('./User');

const Admin = User.extend('Admin', {
    // Additional Admin-specific fields can be defined here, if any.
});

module.exports = Admin;
