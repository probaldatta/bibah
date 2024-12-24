const mongoose = require('mongoose');
const Role = require('./role.model'); // Import the Role model

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    countryCode: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: process.env.UNIQUE_MOBILE === 'true'
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', 
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
